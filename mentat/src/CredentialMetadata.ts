export class CredentialMetadata {
    name: string;
    description: string;
    version: string;
    created: Date;
    createdBy: string;
    fileName: string;
    fileHash: string;
  
    constructor(
      name: string,
      description: string,
      version: string,
      created: Date,
      createdBy: string,
      fileName: string,
      fileHash: string
    ) {
      this.name = name;
      this.description = description;
      this.version = version;
      this.created = created;
      this.createdBy = createdBy;
      this.fileName = fileName;
      this.fileHash = fileHash;
    }
  }
  