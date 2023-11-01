// controllers/credentialsController.ts
import { Request, Response } from "express";
import { CredentialMetadata } from "../models/CredentialMetadata.js";
import CredentialGenerator from "../services/CredentialGenerator.js";
import path from "path";
import fs from 'fs';

import { fileURLToPath } from 'url';
import { dirname } from 'path';




export const generateCredentials = (req: Request, res: Response) => {
    const creds: CredentialMetadata = req.body as CredentialMetadata;
    console.log("Started generating credential");

    GenerateCredentialFile(creds);

    DeployCredential("");
    console.log("Storing credential");
    // new CredentialRepository().AddCredential(creds);
    console.log("Storedcredential");

    creds.created = new Date();
    res.status(200)
        .send(creds);
};

function GenerateCredentialFile(json: CredentialMetadata): string {
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
    const templatePath = path.resolve('dist', 'services', `CredentialTemplate.mustache`);
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