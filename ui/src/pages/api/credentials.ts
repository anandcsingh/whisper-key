// pages/api/credentials.ts

import { NextApiRequest, NextApiResponse } from 'next';
// import { CredentialGenerator, CredentialRepository, CredentialMetadata } from '../../../../mentat/dist/index'
import * as fs from 'fs';
//import { CredentialMetadata } from '@/modules/credentials/CredentialMetadata.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";
// import CredentialGenerator from '@/modules/credentials/CredentialGenerator.js';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            
    //const creds: CredentialMetadata = CredentialMetadata.fromJson(req.body);
    console.log("Started generating credential");
    //GenerateCredentialFile(creds);

            
        } catch (error: any) {
            res.status(500).json({ error: 'Internal server error', details: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
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
    // const generator = new CredentialGenerator();
    // // ToDo: Make generate and save accept a CredentialMetadata type and not json
    // generator.generateAndSave(json, templateContent);

    console.log("Credential generated");

    return "Credential generated"
}
