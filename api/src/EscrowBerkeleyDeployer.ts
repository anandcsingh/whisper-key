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
import { EscrowContract } from 'contract-is-key';
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

    async deploy() {
        console.log('Entered deployment...');
        // you can use this with any spec-compliant graphql endpoint
        let Berkeley = Mina.Network('https://api.minascan.io/node/berkeley/v1/graphql');
        Mina.setActiveInstance(Berkeley);

        // to use this test, change this private key to an account which has enough MINA to pay fees
        let feePayerKey = PrivateKey.fromBase58(
            'EKFASd3TTJzvqpUM3pXpLkCs9F8XcxpHuWLsv3fBj2k4LGBjPPkN'
        );
        let feePayerAddress = feePayerKey.toPublicKey();
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
        let keyPair = this.client.genKeys();
        let zkappKey = PrivateKey.fromBase58(keyPair.privateKey);
        let zkappAddress = zkappKey.toPublicKey();

        let transactionFee = 100;
        let initialState = Field(1);

        // compile the SmartContract to get the verification key (if deploying) or cache the provers (if updating)
        // this can take a while...
        console.log('Compiling smart contract...');
        let { verificationKey } = await EscrowContract.compile();

        // check if the zkapp is already deployed, based on whether the account exists and its first zkapp state is !== 0
        let zkapp = new EscrowContract(zkappAddress);
        let escrowAmt = await zkapp.escrowAmount.fetch();
        let isDeployed = escrowAmt?.equals(0).not().toBoolean() ?? false;

        // if the zkapp is not deployed yet, create a deploy transaction
        if (!isDeployed) {
            console.log(`Deploying zkapp for public key ${zkappAddress.toBase58()}.`);
            // the `transaction()` interface is the same as when testing with a local blockchain
            let transaction = await Mina.transaction(
                { sender: feePayerAddress, fee: transactionFee },
                async () => {
                    AccountUpdate.fundNewAccount(feePayerAddress);
                    await zkapp.deploy({ verificationKey });
                }
            );
            // if you want to inspect the transaction, you can print it out:
            console.log('Inspecting deploy transaction:', transaction.toGraphqlQuery());

            // send the transaction to the graphql endpoint
            console.log('Sending the transaction...');
            await transaction.sign([feePayerKey, zkappKey]).send();
            console.log('Deploy Transaction after signing', transaction);
        }

        // if the zkapp is deployed, create an update transaction
        if (isDeployed) {
            let senderPublicKey = PublicKey.fromBase58(this.senderAccount);
            let receiverPublicKey = PublicKey.fromBase58(this.receiverAccount);
            let x = zkapp.escrowAmount.get();
            console.log(`Found deployed zkapp, updating state for sender and receiver public keys in Escrow Contract.`);
            let transaction = await Mina.transaction(
                { sender: feePayerAddress, fee: transactionFee },
                () => {
                    zkapp.setReceiver(receiverPublicKey);
                    zkapp.setSender(senderPublicKey);
                }
            );
            // fill in the proof - this can take a while...
            console.log('Creating an execution proof...');
            await transaction.prove();

            console.log(transaction.toGraphqlQuery());

            // send the transaction to the graphql endpoint
            console.log('Sending the transaction...');
            await transaction.sign([feePayerKey]).send();
        }
    }
}

// Example usage:
// const deployer = new BerkeleyDeployer(/* Add constructor arguments here if needed */);
// const result = deployer.deploy(/* Add method arguments here if needed */);
// console.log(result);
