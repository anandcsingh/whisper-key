import { CredentialMetadata } from "../CredentialMetadata";

export class CredentialGenerationContext {
    credential: CredentialMetadata;
    generatedFile: string;
    saveFilesPath: string;
    templatePath: any;
    //cloudStorage: ContractCloudStorage;
  bundledFile: any;
}