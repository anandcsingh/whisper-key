import { CredentialMetadata } from "../CredentialMetadata";

export class CredentialGenerationContext {
    credential: CredentialMetadata;
    generatedFile: string;
    saveFilesPath: string;
    templatePath: any;
    feePayer: string;
    //cloudStorage: ContractCloudStorage;
  bundledFile: any;
}