import {
    Field,
    state,
    State,
    method,
    UInt64,
    PrivateKey,
    SmartContract,
    Mina,
    AccountUpdate,
    Bool,
    PublicKey,
    fetchAccount,
} from 'o1js';
import { EscrowContract } from './EscrowContract.js';
import Client from 'mina-signer';

export class EscrowBerkeleyDeployer {
    network: any;
    client: Client;
    senderAccount: string;
    receiverAccount: string;

    constructor(senderAccount: string, receiverAccount: string) {
        this.network = 'testnet';
        this.client = new Client({ network: this.network });
        this.senderAccount = senderAccount;
        this.receiverAccount = receiverAccount;
    }

    async deploy(): Promise<string> {
        let zkAppPublicAddress: string = "";
        console.log('Entered deployment...');
        let berkeleyUrl = "https://proxy.berkeley.minaexplorer.com/graphql";
        // you can use this with any spec-compliant graphql endpoint
        let Berkeley = Mina.Network(berkeleyUrl);
        Mina.setActiveInstance(Berkeley);

        // to use this test, change this private key to an account which has enough MINA to pay fees
        let feePayerKey = PrivateKey.fromBase58(
            'EKFASd3TTJzvqpUM3pXpLkCs9F8XcxpHuWLsv3fBj2k4LGBjPPkN'
        );
        let feePayerAddress = feePayerKey.toPublicKey();
        console.log('Fee payer public key:', feePayerAddress.toBase58());
        let response = await fetchAccount({ publicKey: feePayerAddress });
        if (response.error) throw Error(response.error.statusText);
        let { nonce, balance } = response.account;
        console.log(`Using fee payer account with nonce ${nonce}, balance ${balance}`);

        // this used to be an actual zkapp that was deployed and updated with this script:
        // https://berkeley.minaexplorer.com/wallet/B62qpRzFVjd56FiHnNfxokVbcHMQLT119My1FEdSq8ss7KomLiSZcan
        // replace this with a new zkapp key if you want to deploy another zkapp
        // and please never expose actual private keys in public code repositories like this!
        // let zkappKey = PrivateKey.fromBase58(
        //     'EKFQZG2RuLMYyDsC9RGE5Y8gQGefkbUUUyEhFbgRRMHGgoF9eKpY'
        // );
        console.log('About to generate keys for smart contract....');
        let keyPair = this.client.genKeys();
        let zkappKey = PrivateKey.fromBase58(keyPair.privateKey);
        let zkappAddress = zkappKey.toPublicKey();
        zkAppPublicAddress = zkappAddress.toBase58();
        console.log('Smart contract public key:', zkAppPublicAddress);

        try {
            const fee = Number('0.01') * 1e9;

            // compile the SmartContract to get the verification key (if deploying) or cache the provers (if updating)
            // this can take a while...
            console.log('Compiling smart contract... this can take a while....');
            let { verificationKey } = await EscrowContract.compile();

            // check if the zkapp is already deployed, based on whether the account exists and its first zkapp state is !== 0
            let zkapp = new EscrowContract(zkappAddress);
            console.log('zkApp:', zkapp);

            // Deploy ...
            console.log(`Deploying zkapp for public key ${zkappAddress.toBase58()}.`);
            // the `transaction()` interface is the same as when testing with a local blockchain
            let transaction = await Mina.transaction(
                { sender: feePayerAddress, fee },
                async () => {
                    AccountUpdate.fundNewAccount(feePayerAddress);
                    await zkapp.deploy({ verificationKey });
                }
            );

            console.log('Inspecting deploy transaction:', transaction.toGraphqlQuery());

            // send the transaction to the graphql endpoint
            console.log('Sending the transaction...');
            let sentTx = await transaction.sign([feePayerKey, zkappKey]).send();
            console.log('Deploy Transaction after signing', transaction);
            if (sentTx?.hash !== undefined) {
                console.log(`
                Success! Deploy transaction sent.
                
                Your smart contract state will be updated
                as soon as the transaction is included in a block:
                ${getTxnUrl(berkeleyUrl, sentTx.hash)}
                `);
            }

        } catch (error) {
            console.log('Error occurred while trying to deploy smart contract:', error);
        } finally {
            return zkAppPublicAddress;
        }
    }
}

function getTxnUrl(graphQlUrl: string, txnHash: string | undefined) {
    const txnBroadcastServiceName = new URL(graphQlUrl).hostname
        .split('.')
        .filter((item) => item === 'minascan' || item === 'minaexplorer')?.[0];
    const networkName = new URL(graphQlUrl).hostname
        .split('.')
        .filter((item) => item === 'berkeley' || item === 'testworld')?.[0];
    if (txnBroadcastServiceName && networkName) {
        return `https://minascan.io/${networkName}/tx/${txnHash}?type=zk-tx`;
    }
    return `Transaction hash: ${txnHash}`;
}

// Example usage:
// const deployer = new BerkeleyDeployer(/* Add constructor arguments here if needed */);
// const result = deployer.deploy(/* Add method arguments here if needed */);
// console.log(result);
