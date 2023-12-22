// controllers/credentialsController.ts
import { Request, Response } from "express";
import path from "path";
import { CircuitString, Field, MerkleMap, Mina, PrivateKey, PublicKey, Signature, fetchAccount } from "o1js";
import { CredentialProxy, FreeCredentialContract, FreeCredentialEntity } from '../../public/credentials/FreeCredentialContract.js';
import crypto from 'crypto';
import { CredentialGenerationPipeline, CredentialRepository, CredentialMetadata } from "contract-is-key";

export const issueCredentialViaProxy = async (req: Request, res: Response) => {
    const name = req.params.name;
    const cred = req.body.data;
    const receivedHash = req.body.hash;
    const signedResult = req.body.signResult;

    if (receivedHash != null && signedResult != null) {
        const enableSignature = true;
        if (enableSignature) {
            const jsonString = JSON.stringify(cred);
            const serverHash = crypto.createHash('sha256').update(jsonString).digest('hex');
            console.log("cred:", cred);
            console.log("serverHash:", serverHash);
            console.log("receivedHash:", receivedHash);
            const signature = Signature.fromBase58(signedResult);
            const verify = signature.verify(PublicKey.fromBase58(cred.issuer), CircuitString.fromString(serverHash).toFields());
            console.log("verify:", verify.toBoolean());
            if (!verify.toBoolean()) {
                res.status(500).send("Signature does not match");
                return;
            } else {
                console.log("Signature matches");
                res.send("ok");
                return;
            }
        }
    }


    try {

        let proofsEnabled = true,
            senderAccount: PublicKey,
            senderKey: PrivateKey,
            zkAppAddress: PublicKey;


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
        const path = `../../../public/credentials/${req.params.name}Contract.js`
        // const path = `../../public/credentials/FreeCredentialContract.js`
        const { CredentialProxy } = await import(/* webpackIgnore: true */path);
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

    res.status(200)
        .send(creds);
    return;

};
