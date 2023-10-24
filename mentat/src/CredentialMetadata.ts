export class CredentialMetadata {
    id: string;
    name: string;
    description: string;
    version: string;
    created: Date;
    createdBy: string;
    jsonDefinition: string;

    constructor(
        id: string,
        name: string,
        description: string,
        version: string,
        created: Date,
        createdBy: string,
        jsonDefinition: string,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.version = version;
        this.created = created;
        this.createdBy = createdBy;
        this.jsonDefinition = jsonDefinition;
    }
}
