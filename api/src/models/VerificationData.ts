
import { randomUUID } from 'crypto';

export class VerificationData {
    id: string;
    owner: string;
    issuer: string;
    verificationDate: Date;
    credentialType: string;
    status: string;

    constructor(
        owner: string,
        issuer: string,
        verificationDate: Date,
        credentialType: string,
        status: string,
    ) {
        this.id = randomUUID();;
        this.owner = owner;
        this.issuer = issuer;
        this.verificationDate = verificationDate;
        this.credentialType = credentialType;
        this.status = status;
    }
}