import {
    Field,
    MerkleMap,
    MerkleMapWitness,
    PublicKey,
    SmartContract,
    State,
    method,
    state,
    Permissions,
    VerificationKey,
    CircuitString,
    provablePure,
    Bool,
    Struct,
    Poseidon,
    Circuit,
    Mina,
    fetchAccount,
    PrivateKey,
    AccountUpdate,
    Provable,
    UInt32,
} from 'o1js';

export class PassportEntity extends Struct({
    id: Field,
    credentialType: CircuitString,
    issuer: PublicKey,
    owner: PublicKey,
    firstName: CircuitString,
    lastName: CircuitString,
    dateOfBirth: CircuitString,
    expiryDate: CircuitString,
    passportNumber: CircuitString,
    nationality: CircuitString,
}) {
    toPlainObject() {
        return {
            id: Number(this.id.toBigInt()),
            credentialType: this.credentialType.toString(),
            issuer: this.issuer.toBase58(),
            owner: this.owner.toBase58(),
            firstName: this.firstName.toString(),
            lastName: this.lastName.toString(),
            dateOfBirth: this.dateOfBirth.toString(),
            expiryDate: this.expiryDate.toString(),
            passportNumber: this.passportNumber.toString(),
            nationality: this.nationality.toString(),
        };
    }

    static fromPlainObject(obj: any) {
        return new PassportEntity({
            id: Field(obj.id),
            credentialType: CircuitString.fromString(obj.credentialType),
            issuer: PublicKey.fromBase58(obj.issuer),
            owner: PublicKey.fromBase58(obj.owner),
            firstName: CircuitString.fromString(obj.firstName),
            lastName: CircuitString.fromString(obj.lastName),
            dateOfBirth: CircuitString.fromString(obj.dateOfBirth),
            expiryDate: CircuitString.fromString(obj.expiryDate),
            passportNumber: CircuitString.fromString(obj.passportNumber),
            nationality: CircuitString.fromString(obj.nationality),
        });
    }

    hash(): Field {
        return Poseidon.hash(
            this.id.toFields()
                .concat(this.credentialType.toFields())
                .concat(this.issuer.toFields())
                .concat(this.owner.toFields())
                .concat(this.firstName.toFields())
                .concat(this.lastName.toFields())
                .concat(this.dateOfBirth.toFields())
                .concat(this.expiryDate.toFields())
                .concat(this.dateOfBirth.toFields())
                .concat(this.passportNumber.toFields())
                .concat(this.nationality.toFields())
        );
    }
}
export class PassportContract extends SmartContract {
    @state(Field) mapRoot = State<Field>();

    events = {
        issued: PublicKey,
    }

    init() {
        super.init();
        this.mapRoot.set(Field(new MerkleMap().getRoot()));
    }

    @method setMapRoot(newRoot: Field) {
        // only owners should do this
        this.mapRoot.getAndAssertEquals();
        this.mapRoot.set(newRoot);
    }

    @method issueCredential(
        owner: PublicKey,
        credential: PassportEntity,
        witness: MerkleMapWitness,
        currentRoot: Field
    ) {
        this.mapRoot.getAndAssertEquals();
        this.mapRoot.assertEquals(currentRoot);
        // disable the assert for now
        //this.sender.assertEquals(credential.issuer);
        credential.owner = owner;
        const hash = credential.hash();
        const [newRoot, _] = witness.computeRootAndKey(hash);
        this.mapRoot.set(newRoot);
        this.emitEvent('issued', owner);
    }
}

export class CredentialProxy {
    credentialName: string;
    owner: PublicKey;
    proofsEnabled: boolean;
    contractType: typeof PassportContract;
    zkApp: PassportContract;
    contractAddress: PublicKey;
    useLocal: boolean = false;
    fee = 100_000_000;


    constructor(contractAddress: PublicKey, credentialName: string, owner: PublicKey, proofsEnabled: boolean) {
        this.credentialName = credentialName;
        this.owner = owner;
        this.proofsEnabled = proofsEnabled;
        this.contractAddress = contractAddress;
        this.contractType = PassportContract;
        if (this.proofsEnabled) {
            console.log("compiling contract @", new Date().toISOString());
            this.contractType.compile();
            console.log("compiled contract @", new Date().toISOString());
        }
        this.zkApp = new PassportContract(this.contractAddress);
    }

    async fetchEvents(start: UInt32, end?: UInt32) {
        let events = await this.zkApp.fetchEvents(start, end)
        let content = events.map((e) => {
            return { type: e.type, data: JSON.stringify(e.event), blockHeight: Number(e.blockHeight.toBigint()) };
        });
        return content;
    }

    async getEntityFromObject(obj: any) {
        return PassportEntity.fromPlainObject(obj);
    }

    async getStorageRoot(): Promise<Field> {

        if (!this.useLocal) await fetchAccount({ publicKey: this.contractAddress });

        return this.zkApp.mapRoot.get();
    }
    async setStorageRoot(storageRoot: Field, sender: PublicKey): Promise<any> {

        if (!this.useLocal) await fetchAccount({ publicKey: this.contractAddress });

        const transaction = await Mina.transaction({ sender, fee: this.fee }, () => {

            this.zkApp.setMapRoot(storageRoot);
        });

        return transaction;
    }

    async issueCredential(payer: PublicKey, credential: any, merkleStore: any): Promise<any> {

        if (!this.useLocal) await fetchAccount({ publicKey: this.contractAddress });

        credential.id = merkleStore.nextID;
        const entity: PassportEntity = PassportEntity.fromPlainObject(credential);

        let hash = entity.hash();
        merkleStore.map.set(entity.id, hash);
        const witness = merkleStore.map.getWitness(entity.id);
        const currentRoot = await this.getStorageRoot();

        const transaction = await Mina.transaction({ sender: payer, fee: this.fee }, () => {
            this.zkApp.issueCredential(entity.owner, entity, witness, currentRoot);
        });

        return {
            transaction: transaction,
            pendingEntity: entity,
        };
    }

    async deployLocal(minaLocal: any, deployer: PrivateKey, zkAppPrivateKey: PrivateKey, useLocal: boolean): Promise<void> {

        this.useLocal = useLocal;
        let deployerPublic = deployer.toPublicKey();
        const txn = await minaLocal.transaction(deployerPublic, () => {
            AccountUpdate.fundNewAccount(deployerPublic);
            this.zkApp!.deploy();
        });
        await txn.prove();
        // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
        await txn.sign([deployer, zkAppPrivateKey]).send();
    }

}