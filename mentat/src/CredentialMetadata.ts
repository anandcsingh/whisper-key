export class CredentialMetadata {
    id: string;
    name: string;
    description: string;
    version: string;
    created: Date;
    createdBy: string;
    fileName: string;
    fileHash: string;

    constructor(
        id: string,
        name: string,
        description: string,
        version: string,
        created: Date,
        createdBy: string,
        fileName: string,
        fileHash: string
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.version = version;
        this.created = created;
        this.createdBy = createdBy;
        this.fileName = fileName;
        this.fileHash = fileHash;
    }
}
