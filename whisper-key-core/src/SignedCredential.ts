import { PrivateKey, Signature } from "o1js";
import { CredentialMetadata } from "./CredentialMetadata";
import { IEntity } from "./IEntity";

export class SignedCredential {
    metadata: CredentialMetadata;
    oracleKey: PrivateKey;
    constructor(metadata: CredentialMetadata, oracleKey: PrivateKey) {
        this.metadata = metadata;
        this.oracleKey = oracleKey;
    }

    sign(entity: IEntity) {
        const credentialData = new SignedCredentialData();
        credentialData.data = entity.toPlainObject();

        const dataCollection = this.getFieldDataCollection(entity);
        const signature = Signature.create(this.oracleKey, dataCollection);

        credentialData.signature = signature.toBase58();
        credentialData.publicKey = this.oracleKey.toPublicKey().toBase58();
        return credentialData;
    }

    getFieldDataCollection(entity: any) {
        const fieldCollection: any[] = [];
        for (let index = 0; index < this.metadata.fields.length; index++) {
            const element = this.metadata.fields[index];

            if (element.type == "Field") {
                console.log("element.name:", element.name);
                fieldCollection.concat(entity[element.name].toField());
            } else if (element.type == "PublicKey") {
                fieldCollection.concat(entity[element.name].toFields());

            } else if (element.type == "CircuitString") {
                fieldCollection.concat(entity[element.name].toFields());

            } else if (element.type == "Bool") {
                fieldCollection.concat(entity[element.name].toField());

            }
        }
        return fieldCollection;
    }
}
export class SignedCredentialData {
    data: any;
    signature: string;
    publicKey: string;
}