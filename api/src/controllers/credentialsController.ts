// controllers/credentialsController.ts
import { Request, Response } from "express";
import { CredentialMetadata } from "../models/CredentialMetadata.js";
import CredentialGenerator from "../services/CredentialGenerator.js";
import path from "path";
import fs from 'fs';
import { ContractDeployer } from '../services/ContractDeployer.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { CredentialRepository } from "../services/CredentialRepository.js";
import { DeployResult } from "../models/DeployResult.js";
import { CredentialsPipeline } from "../services/CredentialsPipeline.js";
import { CircuitString, Field, MerkleMap, Mina, PrivateKey, PublicKey, fetchAccount } from "o1js";
import { CredentialProxy, FreeCredentialContract, FreeCredentialEntity } from '../../public/credentials/FreeCredentialContract.js';

export const issueCredentialViaProxy = async (req: Request, res: Response) => {
    const cred = req.body;

    try {
    //const templatePath = path.resolve(`public/credentials/${req.params.name}Contract.js`);

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
  local: any;


const Berkeley = Mina.Network(
  'https://proxy.berkeley.minaexplorer.com/graphql'
);
console.log('Berkeley Instance Created');
Mina.setActiveInstance(Berkeley);
senderKey = PrivateKey.fromBase58("EKEjzZdcsuaThenLan7UkQRxKXwZGTC2L6ufbCg4X5M9WF6UJx2j");
senderAccount = senderKey.toPublicKey();
const repo = new CredentialRepository();
const credMetadata = await repo.GetCredential(req.params.name);
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

console.log("senderAccount:", senderAccount.toBase58());
const map = new MerkleMap();
const entity = {
  id: 1,
  credentialType: 'Test',
  owner: "B62qqzMHkbogU9gnQ3LjrKomimsXYt4qHcXc8Cw4aX7tok8DjuDsAzx",
  issuer: senderAccount.toBase58(),
  Username: 'Test',
  Password: 'Test',
};


const merkleStore = {
  nextID: 2,
  map: map,
};
const currentRoot = proxy.getStorageRoot();

await fetchAccount({ publicKey: zkAppAddress });
console.log("Issuing via proxy for", req.params.name, "contract");
console.log("entity:", cred);
const txn = await proxy.issueCredential(senderAccount, cred, merkleStore);
await txn.transaction.prove();
let result = await txn.transaction.sign([senderKey]).send();
console.log("Issued via proxy");


console.log(`https://berkeley.minaexplorer.com/transaction/${result.hash()}`);
res.send("ok");
    }
    catch (e) {
        res.status(500).send(e.message);
    }

}

export const issueCredential = async (req: Request, res: Response) => {
    const cred = req.body;
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

export const getCredentials = async (req: Request, res: Response) => {

    const creds = await new CredentialRepository().GetCredentials();
    res.status(200)
        .send(creds);
}

export const generateCredentials = async (req: Request, res: Response) => {
    console.log(req.body);

    const creds: CredentialMetadata = CredentialMetadata.fromJson(req.body);
    creds.created = new Date();
    await new CredentialsPipeline().run(creds);

    res.status(200)
        .send(creds);
    return;
    console.log("Started generating credential");
    GenerateCredentialFile(creds);

    const deployer = new ContractDeployer();
    const result = await deployer.deployCredential(creds.name);

    creds.contractPrivateKey = result.privateKey;
    creds.contractPublicKey = result.publicKey;
    creds.transactionUrl = result.transactionUrl;
    console.log("Storing credential");
    new CredentialRepository().AddCredential(creds);
    console.log("Storedcredential");

    creds.created = new Date();
    res.status(200)
        .send(creds);
};

function GenerateCredentialFile(json: any): string {
    // Implement this method to generate the credential file based on the JSON configuration.
    // You can use the fs module to write the file to a specific location.
    // Example: fs.writeFileSync('path/to/credential/file.ts', generatedContent);

    // Access the CredentialGenerator file in the contracts project
    // It exposes a `generateAndSave` method
    // Give it a json string and a file path as params to generate creds
    // The json string has the fields for the credentials, the file path is where the template for the Credential generation is located

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    //const templatePath = path.resolve(__dirname, 'services', `CredentialTemplate.mustache`);
    //const templatePath = path.resolve('dist', 'services', `CredentialTemplate.mustache`);
    const templatePath = path.resolve(`public/CredentialTemplate.mustache`);
    const templateContent = fs.readFileSync(templatePath, 'utf-8');

    const template = "";
    const generator = new CredentialGenerator();
    // ToDo: Make generate and save accept a CredentialMetadata type and not json
    generator.generateAndSave(json, templateContent);

    console.log("Credential generated");

    return "Credential generated"
}

function DeployCredential(filename: string) {
    // Implement this method to deploy the credential file.
    // You can use a deployment script or method specific to your needs.
}

function AddFirebaseMetadata(credentialName: string, user: string) {
    // Implement this method to add Firebase metadata.
    // You can use Firebase Admin SDK or Firebase API to interact with Firebase.
}