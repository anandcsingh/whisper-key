import { PublicKey, PrivateKey, Encoding, Encryption } from "o1js";
import { IEntity } from "../IEntity";
import { IEncryptionStrategy } from "./EncryptedCredential";

export class DefaultEncryptionStrategy implements IEncryptionStrategy {
    encrypt(plainCredentialString: string, publicKey: PublicKey) {
        const credentialFields = Encoding.stringToFields(plainCredentialString);
        const fields = Encryption.encrypt(credentialFields, publicKey);
        return fields.cipherText.toString();
    }
    decrypt(encryptedCredential: string, privateKey: PrivateKey) {
        const cipherText = JSON.parse(encryptedCredential);
        const fields = { publicKey: privateKey.toPublicKey().toGroup(), cipherText };
        const decryptedFields = Encryption.decrypt(fields, privateKey);
        const decryptedCredentialString = Encoding.stringFromFields(decryptedFields);
        return decryptedCredentialString;
    }
}