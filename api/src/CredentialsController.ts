// controllers/credentialsController.ts
import { Request, Response } from "express";
// import { CredentialGenerator, CredentialRepository } from "../../../mentat/src/index";
export class CredentialMetadata {
    id: string;
    name: string;
    description: string;
    version: string;
    created: Date;
    owner: string;
    fields: CredentialField[];

    constructor(
        id: string,
        name: string,
        description: string,
        version: string,
        created: Date,
        owner: string,
        fields: CredentialField[],
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.version = version;
        this.created = created;
        this.owner = owner;
        this.fields = fields;
    }

    static fromJson(json: any): CredentialMetadata {
        let fields: CredentialField[] = [];
        json.fields.forEach((field: any) => {
            fields.push(new CredentialField(field.name, field.description, field.type));
        });
        return new CredentialMetadata(json.id, json.name, json.description, json.version, json.created, json.owner, fields);
    }

    toPlainObject(): any {
        let fields: any[] = [];
        this.fields.forEach((field: CredentialField) => {
            fields.push({
                name: field.name,
                description: field.description,
                type: field.type,
            });
        });
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            version: this.version,
            created: this.created,
            owner: this.owner,
            fields: fields,
        };
    }
}
export class CredentialField {
    name: string;
    description: string;
    type: string;
    constructor(
        name: string,
        description: string,
        type: string,
    ) {
        this.name = name;
        this.description = description;
        this.type = type;
    }
}

export class CredentialGenerator {
    generateCredentials = (req: Request, res: Response) => {
    const creds: CredentialMetadata = req.body as CredentialMetadata;

    this.GenerateCredentialFile(creds);

    this.DeployCredential("");

    this.AddFirebaseMetadata("", "");
    res.send("Credential Generated " + new Date().getMilliseconds().toString());
};

GenerateCredentialFile(json: CredentialMetadata): string {
    // Implement this method to generate the credential file based on the JSON configuration.
    // You can use the fs module to write the file to a specific location.
    // Example: fs.writeFileSync('path/to/credential/file.ts', generatedContent);

    // Access the CredentialGenerator file in the contracts project
    // It exposes a `generateAndSave` method
    // Give it a json string and a file path as params to generate creds
    // The json string has the fields for the credentials, the file path is where the template for the Credential generation is located
    const template = "";
    // ToDo: Get CredentialsGen to work from api
    // const generator = new CredentialGenerator();
    // ToDo: Make generate and save accept a CredentialMetadata type and not json
    //generator.generateAndSave(json, template);


    return "Credential generated"
}

DeployCredential(filename: string) {
    // Implement this method to deploy the credential file.
    // You can use a deployment script or method specific to your needs.
}

AddFirebaseMetadata(credentialName: string, user: string) {
    // Implement this method to add Firebase metadata.
    // You can use Firebase Admin SDK or Firebase API to interact with Firebase.
}
}