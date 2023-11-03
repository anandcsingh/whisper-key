
import { AddReal } from '../credentials/AddReal.js'
import Client from 'mina-signer';
import { AccountUpdate, Mina, PrivateKey, PublicKey } from 'o1js';
import findPrefix from 'find-npm-prefix';
import { get } from 'http';
import { DeployResult } from '../models/DeployResult.js';
export class ContractDeployer {

    network: any;
    client: Client;
    keyPair: any;
    feePayerPrivateKey: PrivateKey;
    feePayerPublicKey: PublicKey;
    zkAppPrivateKey: PrivateKey;
    zkAppAddress: PublicKey;
    graphQLUrl: string;

    constructor() {

        this.network = 'testnet';
        this.client = new Client({ network: this.network });
        this.feePayerPrivateKey = PrivateKey.fromBase58("EKFFiTZhE8p9hZ7ZapMcLymtqYDaWkum5oWN2VCrZi7iQd1fanDE");
        this.feePayerPublicKey = this.feePayerPrivateKey.toPublicKey();
        this.graphQLUrl = "https://proxy.berkeley.minaexplorer.com/graphql";
    }

    async deployCredential(name: string) {
        const result = new DeployResult();
        this.keyPair = this.client.genKeys();
        this.zkAppPrivateKey = PrivateKey.fromBase58(this.keyPair.privateKey);
        this.zkAppAddress = this.zkAppPrivateKey.toPublicKey();
        result.privateKey = this.zkAppPrivateKey.toBase58();
        result.publicKey = this.zkAppAddress.toBase58();

        const zkApp = await getContract(name);
        let isInitMethod = zkApp._methods?.some((intf) => intf.methodName === 'init');
        // compute a hash of the contract's circuit to determine if 'zkapp.compile' should re-run or cached verfification key can be used
        let currentDigest = await zkApp.digest(this.zkAppAddress);
        console.log('compiling');
        const { verificationKey } = await zkApp.compile(this.zkAppAddress);
        console.log('compiled');
        console.log('verificationKey', verificationKey);
        // let cache = {};
        // // update cache with new verification key and currrentDigest
        // cache[name].verificationKey = verificationKey;
        // cache[name].digest = currentDigest;
        console.log('getting transaction');
        let transaction = await this.getTransaction(zkApp, verificationKey);
        console.log('created transaction');
        if (isInitMethod) {
            console.log('proving');
            await transaction.tx.prove();
            console.log('proved');
            transaction = {
                tx: transaction.tx,
                json: transaction.tx
                    .sign([this.zkAppPrivateKey, this.feePayerPrivateKey])
                    .toJSON(),
            };
            console.log('signed');
        }
        let transactionJson = transaction.json;
        const zkAppMutation = this.sendZkAppQuery(transactionJson);
        let sentResult;
        try {
            console.log('sending transaction to GraphQL');
          sentResult = await this.sendGraphQL(this.graphQLUrl, zkAppMutation);
          console.log('sent transaction to GraphQL');
        }catch (error) {
            result.error = true;
            sentResult = error;
          }
          if (!sentResult || sentResult?.kind === 'error') {
            console.log('Error sending transaction to GraphQL', sentResult);
        } else {
            result.transactionUrl = this.getTxnUrl(this.graphQLUrl, sentResult);
            console.log(`Transaction sent to GraphQL ${this.getTxnUrl(this.graphQLUrl, sentResult)}`);
        }
        return result;
    }

    async getTransaction(zkApp: any, verificationKey: any) {
        let Network = Mina.Network(this.graphQLUrl);
        Mina.setActiveInstance(Network);
        const transactionFee = 100_000_000;

        let tx = await Mina.transaction({ sender: this.feePayerPublicKey, fee: transactionFee }, () => {
            AccountUpdate.fundNewAccount(this.feePayerPublicKey);
            let zkapp = new zkApp(this.zkAppAddress);
            zkapp.deploy({ verificationKey });
        });
        return {
            tx,
            json: tx.sign([this.zkAppPrivateKey, this.feePayerPrivateKey]).toJSON(),
        };
    }

    getTxnUrl(graphQLUrl, txn) {
        const MINASCAN_BASE_URL = `https://minascan.io/berkeley/zk-transaction/`;
        const MINA_EXPLORER_BASE_URL = `https://berkeley.minaexplorer.com/transaction/`;
        const explorers = [MINASCAN_BASE_URL, MINA_EXPLORER_BASE_URL];
        const randomExplorersIndex = Math.floor(Math.random() * explorers.length);
      
        const explorerName = new URL(graphQLUrl).hostname
          .split('.')
          .filter((item) => item === 'minascan' || item === 'minaexplorer')?.[0];
        let txnBaseUrl;
      
        switch (explorerName) {
          case 'minascan':
            txnBaseUrl = MINASCAN_BASE_URL;
            break;
          case 'minaexplorer':
            txnBaseUrl = MINA_EXPLORER_BASE_URL;
            break;
          default:
            // An explorer will be randomly selected from the available explorers if the developer doesn't specify
            txnBaseUrl = explorers[randomExplorersIndex];
            break;
        }
      
        return `${txnBaseUrl}${txn.data.sendZkapp.zkapp.hash}`;
      }

    sendZkAppQuery(accountUpdatesJson) {
        return `
        mutation {
          sendZkapp(input: {
            zkappCommand: ${this.removeJsonQuotes(accountUpdatesJson)}
          }) { zkapp
            {
              id
              hash
              failureReason {
                index
                failures
              }
            }
          }
        }`;
      }
      removeJsonQuotes(json) {
        // source: https://stackoverflow.com/a/65443215
        let cleaned = JSON.stringify(JSON.parse(json), null, 2);
        return cleaned.replace(/^[\t ]*"[^:\n\r]+(?<!\\)":/gm, (match) =>
          match.replace(/"/g, '')
        );
      }

    getAccountQuery(publicKey) {
        return `
        query {
          account(publicKey: "${publicKey}") {
            nonce
          }
        }`;
    }

    async sendGraphQL(graphQLUrl, query) {
        const controller = new AbortController();
        const timer = setTimeout(() => {
            controller.abort();
        }, 20000); // Default to use 20s as a timeout
        let response;
        try {
            let body = JSON.stringify({ operationName: null, query, variables: {} });
            response = await fetch(graphQLUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body,
                signal: controller.signal,
            });
            const responseJson = await response.json();
            if (!response.ok || responseJson?.errors) {
                return {
                    kind: 'error',
                    statusCode: response.status,
                    statusText: response.statusText,
                    message: responseJson.errors,
                };
            }
            return responseJson;
        } catch (error) {
            clearTimeout(timer);
            return {
                kind: 'error',
                message: error,
            };
        }
    }

}

async function getContract(name: string) {
    console.log('getContract', name);
    const DIR = await findPrefix(process.cwd());

    let contractName = `${name}Contract`;
    let smartContractFile = `${contractName}.js`;
    let smartContractImports;
    let smartContractImportPath = `${DIR}/public/credentials/${smartContractFile}`;
    console.log(smartContractImportPath);
    if (process.platform === 'win32') {
        smartContractImportPath = 'file://' + smartContractImportPath;
    }
    smartContractImports = await import(smartContractImportPath);
    console.log('smartContractImports', smartContractImports);
    const zkApp = smartContractImports[contractName]; //  The specified zkApp class to deploy
    console.log('zkApp found');
    return zkApp;
}
