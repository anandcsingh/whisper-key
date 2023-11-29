import { CircuitString, Encoding, Encryption, PrivateKey, PublicKey } from "o1js";
import { IEntity } from "../IEntity";

export interface IEncryptionStrategy {
    encrypt(plainCredentialString: string, publicKey: PublicKey) : any;
    decrypt(encryptedCredential: any, privateKey: PrivateKey) : any;
}

export class EncryptedCredential {

    credential: IEntity;
    encryptionStrategy: IEncryptionStrategy;

    constructor(credential: IEntity, encryptionStrategy: IEncryptionStrategy) {
        this.credential = credential;
        this.encryptionStrategy = encryptionStrategy;
    }

    public encryptCredential(credential: IEntity, publicKey: PublicKey) : any {
        const plainCredential = credential.toPlainObject();
        const plainCredentialString = JSON.stringify(plainCredential);
        return this.encryptionStrategy.encrypt(plainCredentialString, publicKey);
    }

    public decryptCredential(encryptedCredential: any, privateKey: PrivateKey) : any {
        const decryptedCredentialString = this.encryptionStrategy.decrypt(encryptedCredential, privateKey);
        const decryptedCredential = JSON.parse(decryptedCredentialString);
        return decryptedCredential;
    }
    
}