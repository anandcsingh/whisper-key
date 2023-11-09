export class CredentialMetadata {
    id: string;
    name: string;
    description: string;
    version: string;
    created: Date;
    owner: string;
    issuer: string;
    fields: CredentialField[];
    contractPrivateKey: string;
    contractPublicKey: string;
    transactionUrl: string;

    constructor(
        id: string,
        name: string,
        description: string,
        version: string,
        created: Date,
        owner: string,
        issuer: string,
        fields: CredentialField[],
        contractPrivateKey: string,
        contractPublicKey: string,
        transactionUrl: string,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.version = version;
        this.created = created;
        this.owner = owner;
        this.issuer = issuer;
        this.fields = fields;
        this.contractPrivateKey = contractPrivateKey;
        this.contractPublicKey = contractPublicKey;
        this.transactionUrl = transactionUrl;
    }

    static fromJson(json: any): CredentialMetadata {
        let fields: CredentialField[] = [];
        json.fields.forEach((field: any) => {
            fields.push(new CredentialField(field.name, field.description, field.type));
        });
        return new CredentialMetadata(json.id, json.name, json.description, json.version, json.created, json.owner, json.issuer, fields, json.contractPrivateKey, json.contractPublicKey, json.transactionUrl);
    }

    toPlainObject(): any {
        let fields: any[] = [];
        this.fields.forEach((field: CredentialField) => {
            fields.push({
                name: field.name ?? "",
                description: field.description ?? "",
                type: field.type ?? "",
            });
        });
        return {
            id: this.id ?? "",
            name: this.name ?? "",
            description: this.description ?? "",
            version: this.version ?? "",
            created: this.created ?? "",
            owner: this.owner ?? "",
            fields: fields,
            contractPrivateKey: this.contractPrivateKey ?? "",
            contractPublicKey: this.contractPublicKey ?? "",
            transactionUrl: this.transactionUrl ?? "",
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