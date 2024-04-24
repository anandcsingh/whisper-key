// controllers/credentialsController.ts
import { Request, Response } from "express";
import path from "path";
import { CircuitString, Field, MerkleMap, Mina, PrivateKey, PublicKey, Signature, fetchAccount } from "o1js";
import { CredentialProxy, FreeCredentialContract, FreeCredentialEntity } from '../../public/credentials/FreeCredentialContract.js';
import crypto from 'crypto';
import { CredentialGenerationPipeline, CredentialRepository, CredentialMetadata } from 'contract-is-key';
import Client from 'mina-signer';
import { EventNotification } from "../models/EventNotification.js";
import { NotificationData } from "../models/NotificationsRepository.js";
import { EscrowPaymentRepository } from "../models/EscrowPaymentRepository.js";
import { Payment } from "../models/Payment.js";
import dotenv from 'dotenv';
import cron from 'node-cron';
import { EscrowBerkeleyDeployer } from "../deployer/EscrowBerkeleyDeployer.js";
import { EscrowContract } from "../deployer/EscrowContract.js";

dotenv.config();

export const escrowNotify = async (req: Request, res: Response) => {
    let data = req.body;

    let notifier = new EventNotification();
    notifier.push(new NotificationData(data.credType, data.issuer, data.owner, "escrow"));
}

export const getIssuedPendingCredentials = async (req: Request, res: Response) => {
    const address = req.params.address;
    var paymentRepo: EscrowPaymentRepository = new EscrowPaymentRepository();
    const payments = await paymentRepo.getPaymentsByIssuer(address);
    res.status(200).send(payments);
}
export const getPendingCredential = async (req: Request, res: Response) => {
    console.log("payment address from pending");

    const address = req.params.address;
    const credential = req.params.credentialName;
    const id = `${credential}${address}`;
    var paymentRepo: EscrowPaymentRepository = new EscrowPaymentRepository();
    const payment = await paymentRepo.getPayment(id);
    console.log("payment", payment);
    res.status(200).send(payment);
}

export const getCredential = async (req: Request, res: Response) => {
    const name = req.params.name;

    const repo = new CredentialRepository();
    const credMetadata = await repo.GetCredential(name);
    res.status(200).send(credMetadata);
}


export const getCredentialByNameAndAddress = async (req: Request, res: Response) => {
    console.log("Getting credential by name and address");
    const address = req.params.address;
    const credential = req.params.credentialName;
    console.log("Address:", address);
    console.log("Credential:", credential);
    const repo = new CredentialRepository();
    const store = repo.GetCredentialStore(credential);
    const cred = await store.get(address);
    console.log("Cred:", cred);
    res.status(200).send(cred);
}
export const getIssuedCredential = async (req: Request, res: Response) => {
    const address = req.params.address;

    const repo = new CredentialRepository();
    const issued = await repo.getIssuedCredentialsByIssuer(address);
    console.log("Issued:", issued);
    res.status(200).send(issued);
}

export const issueCredentialViaProxy = async (req: Request, res: Response) => {
    const name = req.params.name;
    const cred = req.body.data;
    const signedResult = req.body.signResult;
    let smartContractPublicKey = "";

    if (signedResult != null) {
        const enableSignature = false;
        if (enableSignature) {

            const receivedHash = signedResult.data;
            const jsonString = JSON.stringify(cred);
            const serverHash = crypto.createHash('sha256').update(jsonString).digest('hex');
            console.log("cred:", cred);
            console.log("serverHash:", serverHash);
            console.log("receivedHash:", receivedHash);

            if (serverHash != receivedHash) {
                res.status(500).send("Data hashes does not match");
                return;
            } else {

                let client = new Client({ network: 'testnet' });
                const verify = client.verifyMessage(signedResult);
                if (!verify) {
                    res.status(500).send("Signature does not match");
                    return;
                } else {
                    console.log("Signature matches");
                }
            }
        }
    }
    console.log('Cred:', cred);

    // Deploy
    try {
        let escrowBerkeleyDeployer = new EscrowBerkeleyDeployer(cred.owner, cred.issuer);
        smartContractPublicKey = await escrowBerkeleyDeployer.deploy();
        updatePendingPayment(smartContractPublicKey, cred.credentialType, cred.owner);
        console.log(smartContractPublicKey);
        checkEscrowContractDeployStats(smartContractPublicKey, cred.credentialType, cred.owner, cred.issuer);
    } catch (error) {
        console.log(`An error occurred while trying to deploy smart contract: ${name} for ${cred.owner}`);
    }

    // Store Pending Data
    try {
        var paymentRepo: EscrowPaymentRepository = new EscrowPaymentRepository();
        let paymentData = { paymentAmount: 1200, paymentStatus: "processing" } as Payment;
        let walletAddress: string = cred.owner as string;
        paymentRepo.addOrUpdatePayment(paymentData, cred, walletAddress, smartContractPublicKey);
        res.status(200).send({ smartContractPublicKey });
    } catch (error: any) {
        console.log('Error occurred while trying to store escrow payment request', error);
        res.status(500).send(error.message);
    }
}

const checkEscrowContractDeployStats = async (contractPublicAddress: string, credType: string, owner: string, issuer: string) => {
    const scheduledJob = cron.schedule('0 0 * * * *', async () => {
        try {
            let berkeleyUrl = "https://proxy.berkeley.minaexplorer.com/graphql";
            // you can use this with any spec-compliant graphql endpoint
            let Berkeley = Mina.Network(berkeleyUrl);
            Mina.setActiveInstance(Berkeley);

            console.log('Compiling smart contract..... this can take a while...');
            let { verificationKey } = await EscrowContract.compile();

            let pubKey = PublicKey.fromBase58(contractPublicAddress);
            let zkApp = new EscrowContract(pubKey);

            let payment = await zkApp.escrowAmount.fetch();
            let isDeployed = payment?.equals(1).not().toBoolean() ?? false;

            // Check if stopping condition is met
            if (isDeployed) {
                console.log('Smart contract is deployed...');
                // Api request to make a Notification event
                let data = {
                    contractPublicAddress: contractPublicAddress,
                    credType: credType,
                    owner: owner,
                    issuer: issuer
                }
                console.log('About to send notification to API about smart contract');
                deployNotification(data);
                scheduledJob.stop();
            }
            else {
                console.log('Not deployed yet...');
            }
        } catch (error) {
            console.log('Error occurred while trying to check smart contract deploy status to notify user', error);
        }
    }, {
        scheduled: false
    });
    scheduledJob.start();
}

function deployNotification(data: any) {
    let notifier = new EventNotification();
    notifier.push(new NotificationData(data.credType, data.issuer, data.owner, "escrow"));
}

function updatePendingPayment(smartContractPublicKey: string, credentialType: any, senderAccount: any) {
    let repo = new EscrowPaymentRepository();
    try {
        repo.updatePaymentPublicKey(`${credentialType}${senderAccount}`, smartContractPublicKey);
    } catch (error) {
        console.log(`Error while updating payment public key: ${error}`);
    }
}

export const issueCredential = async (req: Request, res: Response) => {
    const cred = req.body.data;
    const receivedHash = req.body.hash;
    const signedResult = req.body.signResult;

    const jsonString = JSON.stringify(cred);
    const serverHash = crypto.createHash('sha256').update(jsonString).digest('hex');
    console.log("serverHash:", serverHash);
    console.log("receivedHash:", receivedHash);


    const templatePath = path.resolve(`public/credentials/${req.params.name}Contract.js`);

    // Get data from client 
    // can we sign this data and verify the authenticity of the data?
    // sign with private key on the browser, send message to api public verfify
    let proofsEnabled = true;
    let deployerAccount: PublicKey,
        deployerKey: PrivateKey,
        senderAccount: PublicKey,
        senderKey: PrivateKey,
        zkAppAddress: PublicKey,
        zkAppPrivateKey: PrivateKey,
        zkApp: FreeCredentialContract,
        local: any;
    if (proofsEnabled) await FreeCredentialContract.compile();


    const Berkeley = Mina.Network(
        'https://proxy.berkeley.minaexplorer.com/graphql'
    );
    console.log('Berkeley Instance Created');
    Mina.setActiveInstance(Berkeley);
    senderKey = PrivateKey.fromBase58("EKEjzZdcsuaThenLan7UkQRxKXwZGTC2L6ufbCg4X5M9WF6UJx2j");
    senderAccount = senderKey.toPublicKey();

    zkAppAddress = PublicKey.fromBase58("B62qmVJRKong9PuMagoWGDmPjSdmSkjPhW2R3ZyB8nZswiSAxcua5H8");
    await fetchAccount({ publicKey: zkAppAddress });

    zkApp = new FreeCredentialContract(zkAppAddress);

    console.log("senderAccount:", senderAccount.toBase58());
    const map = new MerkleMap();
    const entity = new FreeCredentialEntity({
        id: Field(1),
        credentialType: CircuitString.fromString('Test'),
        owner: PublicKey.fromBase58("B62qqzMHkbogU9gnQ3LjrKomimsXYt4qHcXc8Cw4aX7tok8DjuDsAzx"),
        issuer: senderAccount,
        Username: CircuitString.fromString('Test'),
        Password: CircuitString.fromString('Test'),
    });


    const merkleStore = {
        nextID: 2,
        map: map,
    };
    const currentRoot = zkApp.mapRoot.get();

    await fetchAccount({ publicKey: zkAppAddress });
    entity.id = Field(merkleStore.nextID);
    let hash = entity.hash();

    merkleStore.map.set(entity.id, hash);
    const transactionFee = 100_000_000;
    console.log("fee:", transactionFee);
    const witness = merkleStore.map.getWitness(entity.id);
    const transaction = await Mina.transaction({ sender: entity.issuer, fee: transactionFee }, () => {
        zkApp.issueCredential(senderAccount, entity, witness, currentRoot);
    });

    console.log("proving transaction");
    await transaction.prove();
    console.log("signing transaction");
    let result = await transaction.sign([senderKey]).send();

    console.log(`https://berkeley.minaexplorer.com/transaction/${result.hash}`);
    res.send("ok");
}

export const getCreatedCredentials = async (req: Request, res: Response) => {
    const createdBy = req.params.address;
    console.log("Getting credentials for", createdBy);
    const creds = await new CredentialRepository().GetCredentials(createdBy);
    res.status(200)
        .send(creds);
}

export const getOwnedCredentials = async (req: Request, res: Response) => {
    const owner = req.params.address;
    const creds = await new CredentialRepository().GetOwnedCredentials(owner);
    console.log("Back from creds");
    res.status(200)
        .send(creds);
}



export const generateCredentials = async (req: Request, res: Response) => {
    console.log(req.body);
    const senderKey = process.env.FEE_PAYER ? PrivateKey.fromBase58(process.env.FEE_PAYER) : PrivateKey.fromBase58("EKEaxBppkxKjn7a9rRVCxFsuGur9Xqy6KKVYE9jA4qeRvYA5fzix");

    const creds: CredentialMetadata = CredentialMetadata.fromJson(req.body);
    creds.created = new Date();

    const pipeline = new CredentialGenerationPipeline();
    pipeline.initDefault();
    pipeline.context.feePayer = 'EKEnaPrfADEKKPAV5AT57sjD22qRQ7cuxEPGW9LafMwd638R2EUH';
    await pipeline.run(creds);

    contractsDeploying[creds.name] = { creds };

    res.status(200)
        .send(creds);
    return;
};

let tasks: string[] = [];
export const addTask = async (req: Request, res: Response) => {
    // random string
    const random = Math.random().toString(36).substring(7);
    tasks.push(random)
    res.status(200)
        .send(random);
}

export const checkTasks = async () => {

    console.log("Checking tasks");
    console.log("tasks:", tasks);

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        console.log("Checking task", task);
        // remove task
        tasks = tasks.filter(t => t != task);
    }
}


//let contractsDeploying: any = {"DriversPermit": { creds: ({ name: "DriversPermit", contractPublicKey: "B62qmY247XU9mYFj9emWdKATGGBLH7tRu5BZjDd8Qhy26emBkdLwk8B" } as CredentialMetadata)}};
let contractsDeploying: any = { "Director": { creds: ({ name: "Director", contractPublicKey: "B62qrwAF6n1ox1BW3qbdb4SzTDR344ZwirkygvfgskFBD42quZYxWHW", owner: "B62qrwAF6n1ox1BW3qbdb4SzTDR344ZwirkygvfgskFBD42quZYxWHW" } as CredentialMetadata) } };

export const checkDeploymentStatus = async (notifier: EventNotification) => {
    try {
        const Berkeley = Mina.Network({
            mina: 'https://proxy.berkeley.minaexplorer.com/graphql',
            archive: 'https://archive.berkeley.minaexplorer.com/',
        });
        Mina.setActiveInstance(Berkeley);
        console.log("Checking deployment status");
        console.log("contractsDeploying:", contractsDeploying);
        const senderKey = process.env.FEE_PAYER ? PrivateKey.fromBase58(process.env.FEE_PAYER) : PrivateKey.fromBase58("EKEjzZdcsuaThenLan7UkQRxKXwZGTC2L6ufbCg4X5M9WF6UJx2j");
        const senderAccount = senderKey.toPublicKey();
        const clonedContracts = { ...contractsDeploying };

        // iterate over contractsDeploying object properties
        for (const key of Object.keys(contractsDeploying)) {
            const cred = contractsDeploying[key].creds;
            console.log("Checking deployment status for", cred.name);
            await setProxy(cred, senderAccount);
            const proxy = contractsDeploying[key].proxy;
            try {
                const contractRoot = await proxy.getStorageRoot();
                console.log(`${cred.name} Contract found`);
                notifier.push(new NotificationData(cred.name, "", cred.owner, "created"));
                delete clonedContracts[key];
            } catch (e) {
                console.log("Error:", e);
                console.log(`${cred.name} Contract NOT found`);
            }

        }
        contractsDeploying = clonedContracts;
    }
    catch (e) {
        console.log("Error:", e);
    }
}

let escrowContractsDeploying: any = { "Director": { creds: ({ name: "Director", contractPublicKey: "", owner: "" } as CredentialMetadata) } };

export const checkEscrowDeploymentStatus = async (notifier: EventNotification) => {
    try {
        const Berkeley = Mina.Network({
            mina: 'https://proxy.berkeley.minaexplorer.com/graphql',
            archive: 'https://archive.berkeley.minaexplorer.com/',
        });
        Mina.setActiveInstance(Berkeley);
        console.log("Checking deployment status");
        console.log("escrowContractsDeploying:", escrowContractsDeploying);
        const senderKey = process.env.FEE_PAYER ? PrivateKey.fromBase58(process.env.FEE_PAYER) : PrivateKey.fromBase58("EKEjzZdcsuaThenLan7UkQRxKXwZGTC2L6ufbCg4X5M9WF6UJx2j");
        const senderAccount = senderKey.toPublicKey();
        const clonedContracts = { ...escrowContractsDeploying };

        // iterate over escrowContractsDeploying object properties
        for (const key of Object.keys(escrowContractsDeploying)) {
            const cred = escrowContractsDeploying[key].creds;
            console.log("Checking deployment status for", cred.name);
            await setProxy(cred, senderAccount);
            const proxy = escrowContractsDeploying[key].proxy;
            try {
                const contractRoot = await proxy.getStorageRoot();
                console.log(`${cred.name} Contract found`);
                notifier.push(new NotificationData(cred.name, "", cred.owner, "created"));
                delete clonedContracts[key];
            } catch (e) {
                console.log("Error:", e);
                console.log(`${cred.name} Contract NOT found`);
            }

        }
        escrowContractsDeploying = clonedContracts;
    }
    catch (e) {
        console.log("Error:", e);
    }
}


async function issueCredentialAfterPayment(name: string, req: any, cred: any, res: Response<any, Record<string, any>>) {
    try {

        let proofsEnabled = true, senderAccount: PublicKey, senderKey: PrivateKey, zkAppAddress: PublicKey;


        const Berkeley = Mina.Network(
            'https://proxy.berkeley.minaexplorer.com/graphql'
        );
        console.log('Berkeley Instance Created');
        Mina.setActiveInstance(Berkeley);
        senderKey = process.env.FEE_PAYER ? PrivateKey.fromBase58(process.env.FEE_PAYER) : PrivateKey.fromBase58("EKEjzZdcsuaThenLan7UkQRxKXwZGTC2L6ufbCg4X5M9WF6UJx2j");
        senderAccount = senderKey.toPublicKey();
        console.log("senderAccount:", senderAccount.toBase58());
        const repo = new CredentialRepository();
        const credMetadata = await repo.GetCredential(name);

        console.log("credMetadata:", credMetadata);
        zkAppAddress = PublicKey.fromBase58(credMetadata!.contractPublicKey);

        //zkAppAddress = PublicKey.fromBase58("B62qmVJRKong9PuMagoWGDmPjSdmSkjPhW2R3ZyB8nZswiSAxcua5H8");
        await fetchAccount({ publicKey: zkAppAddress });
        const path = `../../../public/credentials/${req.params.name}Contract.js`;
        // const path = `../../public/credentials/FreeCredentialContract.js`
        const { CredentialProxy } = await import(/* webpackIgnore: true */ path);
        console.log("Dyanmic proxy loaded");
        console.log("path:", path);
        const proxy = new CredentialProxy(zkAppAddress, req.params.name, senderAccount, proofsEnabled);

        const backingStore = repo.GetCredentialStore(name);
        const merkleStore = await backingStore.getMerkleMap();
        const contractRoot = await proxy.getStorageRoot();
        const backingStoreRoot = merkleStore.map.getRoot();

        // verify roots match
        // if (backingStoreRoot.toString() != contractRoot.toString()) {
        //   res.status(500).send({
        //     success: false,
        //     message: "Roots do not match",
        //   });
        //   return;   
        // }
        console.log("senderAccount:", senderAccount.toBase58());


        await fetchAccount({ publicKey: zkAppAddress });
        console.log("Issuing via proxy for", req.params.name, "contract");
        console.log("entity:", cred);
        const txn = await proxy.issueCredential(senderAccount, cred, merkleStore);
        await txn.transaction.prove();
        let result = await txn.transaction.sign([senderKey]).send();
        console.log("Issued via proxy");
        //console.log("entity", txn.pendingEntity);
        backingStore.upsert(txn.pendingEntity!);

        console.log(`https://berkeley.minaexplorer.com/transaction/${result.hash()}`);
        res.send({
            success: true,
            message: "Credential issued",
            transactionHash: result.hash(),
            transactionUrl: `https://berkeley.minaexplorer.com/transaction/${result.hash()}`,
        });
    }
    catch (e: any) {
        console.log("Error:", e);
        res.status(500).send(e.message);
    }
}

async function setProxy(cred: any, senderAccount: PublicKey) {

    if (contractsDeploying[cred.name] != null && contractsDeploying[cred.name].proxy != null) {
        return;
    } else {
        const zkAppAddress = PublicKey.fromBase58(cred.contractPublicKey);
        await fetchAccount({ publicKey: zkAppAddress });
        const path = `../../../public/credentials/${cred.name}Contract.js`;
        const { CredentialProxy } = await import(/* webpackIgnore: true */ path);
        const proxy = new CredentialProxy(zkAppAddress, cred.name, senderAccount, true);
        contractsDeploying[cred.name].proxy = proxy;
        return;
    }
}

