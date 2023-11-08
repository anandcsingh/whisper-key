import { Field, MerkleMapWitness, PublicKey, SmartContract, State } from 'o1js';
declare const PassportEntity_base: (new (value: {
    id: import("o1js/dist/node/lib/field").Field;
    credentialType: any;
    issuer: PublicKey;
    owner: PublicKey;
    firstName: any;
    lastName: any;
    dateOfBirth: any;
    expiryDate: any;
    passportNumber: any;
    nationality: any;
}) => {
    id: import("o1js/dist/node/lib/field").Field;
    credentialType: any;
    issuer: PublicKey;
    owner: PublicKey;
    firstName: any;
    lastName: any;
    dateOfBirth: any;
    expiryDate: any;
    passportNumber: any;
    nationality: any;
}) & {
    _isStruct: true;
} & import("o1js/dist/node/snarky").ProvablePure<{
    id: import("o1js/dist/node/lib/field").Field;
    credentialType: any;
    issuer: PublicKey;
    owner: PublicKey;
    firstName: any;
    lastName: any;
    dateOfBirth: any;
    expiryDate: any;
    passportNumber: any;
    nationality: any;
}> & {
    toInput: (x: {
        id: import("o1js/dist/node/lib/field").Field;
        credentialType: any;
        issuer: PublicKey;
        owner: PublicKey;
        firstName: any;
        lastName: any;
        dateOfBirth: any;
        expiryDate: any;
        passportNumber: any;
        nationality: any;
    }) => {
        fields?: import("o1js/dist/node/lib/field").Field[] | undefined;
        packed?: [import("o1js/dist/node/lib/field").Field, number][] | undefined;
    };
    toJSON: (x: {
        id: import("o1js/dist/node/lib/field").Field;
        credentialType: any;
        issuer: PublicKey;
        owner: PublicKey;
        firstName: any;
        lastName: any;
        dateOfBirth: any;
        expiryDate: any;
        passportNumber: any;
        nationality: any;
    }) => {
        id: string;
        credentialType: any;
        issuer: string;
        owner: string;
        firstName: any;
        lastName: any;
        dateOfBirth: any;
        expiryDate: any;
        passportNumber: any;
        nationality: any;
    };
    fromJSON: (x: {
        id: string;
        credentialType: any;
        issuer: string;
        owner: string;
        firstName: any;
        lastName: any;
        dateOfBirth: any;
        expiryDate: any;
        passportNumber: any;
        nationality: any;
    }) => {
        id: import("o1js/dist/node/lib/field").Field;
        credentialType: any;
        issuer: PublicKey;
        owner: PublicKey;
        firstName: any;
        lastName: any;
        dateOfBirth: any;
        expiryDate: any;
        passportNumber: any;
        nationality: any;
    };
};
export declare class PassportEntity extends PassportEntity_base {
    toPlainObject(): {
        id: number;
        credentialType: any;
        issuer: string;
        owner: string;
        firstName: any;
        lastName: any;
        dateOfBirth: any;
        expiryDate: any;
        passportNumber: any;
        nationality: any;
    };
    static fromPlainObject(obj: any): PassportEntity;
    hash(): Field;
}
export declare class PassportContract extends SmartContract {
    mapRoot: State<import("o1js/dist/node/lib/field").Field>;
    init(): void;
    setMapRoot(newRoot: Field): void;
    issueCredential(owner: PublicKey, credential: PassportEntity, witness: MerkleMapWitness, currentRoot: Field): void;
}
export declare class CredentialProxy {
    credentialName: string;
    owner: PublicKey;
    proofsEnabled: boolean;
    contractType: typeof PassportContract;
    zkApp: PassportContract;
    contractAddress: PublicKey;
    constructor(contractAddress: PublicKey, credentialName: string, owner: PublicKey, proofsEnabled: boolean);
    getStorageRoot(): Promise<Field>;
    setStorageRoot(storageRoot: Field): Promise<any>;
    issueCredential(credential: any, merkleStore: any): Promise<any>;
    deployLocal(localBlockchainSetup: any): Promise<void>;
}
export {};
