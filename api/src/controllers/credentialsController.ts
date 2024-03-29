// controllers/credentialsController.ts
import { Request, Response } from "express";
import path from "path";
import { CircuitString, Field, MerkleMap, Mina, PrivateKey, PublicKey, Signature, fetchAccount } from "o1js";
import { CredentialProxy, FreeCredentialContract, FreeCredentialEntity } from '../../public/credentials/FreeCredentialContract.js';
import crypto from 'crypto';
import { CredentialGenerationPipeline, CredentialRepository, CredentialMetadata, EscrowContract } from 'contract-is-key';
import Client from 'mina-signer';
import { EventNotification } from "../models/EventNotification.js";
import { NotificationData } from "../models/NotificationsRepository.js";
import { EscrowPaymentRepository } from "../models/EscrowPaymentRepository.js";
import { Payment } from "../models/Payment.js";
import dotenv from 'dotenv';
import cron from 'node-cron';

dotenv.config();

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
        const raw = JSON.stringify({
            "senderAccount": `${cred.owner}`,
            "receiverAccount": `${cred.issuer}`
        });

        const requestOptions: RequestInit = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                // You can add other headers here if needed
            },
            body: raw,
            redirect: "follow"
        };

        let smartContractDeployerUrl = process.env.SMART_CONTRACT_DEPLOYER_URL;
        console.log('Smart contract deployer url:', smartContractDeployerUrl);
        fetch(`${smartContractDeployerUrl}/api/deploy`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    console.log('Responsse from deploy url:', response.statusText);
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((result) => {
                console.log('Result:', result);
                smartContractPublicKey = result.smartContractPublicKey;
                console.log('Smart contract public key:', result.smartContractPublicKey);
            })
            .catch((error) => {
                console.error('Error occurred while attempting to make smart contract deploy request', error);
                res.status(500).send(error.message);
            });
    } catch (error) {
        console.log(`An error occurred while trying to deploy smart contract: ${name} for ${cred.owner}. 
                '\n' ${error} `);
        res.status(500).send(error.message);
    }

    // Store Pending Data
    try {
        var paymentRepo: EscrowPaymentRepository = new EscrowPaymentRepository();
        let paymentData = { paymentAmount: 1200, paymentStatus: "processing" } as Payment;
        let walletAddress: string = cred.owner as string;
        paymentRepo.addOrUpdatePayment(paymentData, cred, walletAddress, smartContractPublicKey);
        checkEscrowContractDeployStats(new EventNotification(), smartContractPublicKey, cred.credentialType, cred.owner);
        res.status(200).send({ smartContractPublicKey });
    } catch (error) {
        console.log('Error occurred while trying to store escrow payment request', error);
        res.status(500).send(error.message);
    }
}

const checkEscrowContractDeployStats = async (notifier: EventNotification, contractPublicAddress: string, credName: string, owner: string) => {
    const scheduledJob = cron.schedule('*/15 * * * * *', async () => {
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
                notifier.push(new NotificationData(credName, "", owner, "created"));
                console.log('Stopping cron job...');
                scheduledJob.stop(); // Stop the cron job
            }
            else {
                console.log('Not deployed yet...');
            }
        } catch (error) {
            console.log('Error occurred while trying to check smart contract deploy status to notify user', error);
        }
    });
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

    console.log(`https://berkeley.minaexplorer.com/transaction/${result.hash()}`);
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

    const creds: CredentialMetadata = CredentialMetadata.fromJson(req.body);
    creds.created = new Date();

    const pipeline = new CredentialGenerationPipeline();
    pipeline.initDefault();
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


async function issueCredentialAfterPayment(name: string, req, cred: any, res: Response<any, Record<string, any>>) {
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
        zkAppAddress = PublicKey.fromBase58(credMetadata.contractPublicKey);

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
    catch (e) {
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

