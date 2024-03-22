import { CredentialMetadata } from "./CredentialMetadata";

export interface PaymentRequirements {
    credentialMeta: CredentialMetadata;
    credentialHash: string;
    signedResult: string;
}