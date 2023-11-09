var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Field, MerkleMap, MerkleMapWitness, PublicKey, SmartContract, State, method, state, CircuitString, Struct, Poseidon, Mina, fetchAccount, AccountUpdate, } from 'o1js';
export class PassportEntity extends Struct({
    id: Field,
    credentialType: CircuitString,
    issuer: PublicKey,
    owner: PublicKey,
    number: CircuitString,
    expiryDate: CircuitString,
    unique: Field,
    address: PublicKey,
    name: CircuitString,
}) {
    toPlainObject() {
        return {
            id: Number(this.id.toBigInt()),
            credentialType: this.credentialType.toString(),
            issuer: this.issuer.toBase58(),
            owner: this.owner.toBase58(),
            number: this.number.toString(),
            expiryDate: this.expiryDate.toString(),
            unique: Number(this.unique.toBigInt()),
            address: this.address.toBase58(),
            name: this.name.toString(),
        };
    }
    static fromPlainObject(obj) {
        return new PassportEntity({
            id: Field(obj.id),
            credentialType: CircuitString.fromString(obj.credentialType),
            issuer: PublicKey.fromBase58(obj.issuer),
            owner: PublicKey.fromBase58(obj.owner),
            number: CircuitString.fromString(obj.number),
            expiryDate: CircuitString.fromString(obj.expiryDate),
            unique: Field(obj.unique),
            address: PublicKey.fromBase58(obj.address),
            name: CircuitString.fromString(obj.name),
        });
    }
    hash() {
        return Poseidon.hash(this.id.toFields()
            .concat(this.credentialType.toFields())
            .concat(this.issuer.toFields())
            .concat(this.owner.toFields())
            .concat(this.number.toFields())
            .concat(this.expiryDate.toFields())
            .concat(this.unique.toFields())
            .concat(this.address.toFields())
            .concat(this.name.toFields())
            );
    }
}
export class PassportContract extends SmartContract {
    constructor() {
        super(...arguments);
        this.mapRoot = State();
    }
    init() {
        super.init();
        this.mapRoot.set(Field(new MerkleMap().getRoot()));
    }
    setMapRoot(newRoot) {
        // only owners should do this
        this.mapRoot.getAndAssertEquals();
        this.mapRoot.set(newRoot);
    }
    issueCredential(owner, credential, witness, currentRoot) {
        this.mapRoot.getAndAssertEquals();
        this.mapRoot.assertEquals(currentRoot);
        this.sender.assertEquals(credential.issuer);
        credential.owner = owner;
        const hash = credential.hash();
        const [newRoot, _] = witness.computeRootAndKey(hash);
        this.mapRoot.set(newRoot);
    }
}
__decorate([
    state(Field),
    __metadata("design:type", Object)
], PassportContract.prototype, "mapRoot", void 0);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Field]),
    __metadata("design:returntype", void 0)
], PassportContract.prototype, "setMapRoot", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PublicKey,
        PassportEntity,
        MerkleMapWitness,
        Field]),
    __metadata("design:returntype", void 0)
], PassportContract.prototype, "issueCredential", null);
export class CredentialProxy {
    constructor(contractAddress, credentialName, owner, proofsEnabled) {
        this.useLocal = false;
        this.credentialName = credentialName;
        this.owner = owner;
        this.proofsEnabled = proofsEnabled;
        this.contractAddress = contractAddress;
        this.contractType = PassportContract;
        //console.log("compiling contract @", new Date().toISOString());
        if (this.proofsEnabled)
            this.contractType.compile();
        //console.log("compiled contract @", new Date().toISOString());
        this.zkApp = new PassportContract(this.contractAddress);
    }
    async getStorageRoot() {
        if (!this.useLocal)
            await fetchAccount({ publicKey: this.contractAddress });
        return this.zkApp.mapRoot.get();
    }
    async setStorageRoot(storageRoot, sender) {
        if (!this.useLocal)
            await fetchAccount({ publicKey: this.contractAddress });
        const transaction = await Mina.transaction({ sender }, () => {
            this.zkApp.setMapRoot(storageRoot);
        });
        return transaction;
    }
    async issueCredential(owner, credential, merkleStore) {
        if (!this.useLocal)
            await fetchAccount({ publicKey: this.contractAddress });
        //this.zkApp = new PassportContract(this.contractAddress);
        const entity = PassportEntity.fromPlainObject(credential);
        entity.id = Field(merkleStore.nextID);
        let hash = entity.hash();
        console.log("hash:", hash.toString());
        merkleStore.map.set(entity.id, hash);
        const witness = merkleStore.map.getWitness(entity.id);
        const transaction = await Mina.transaction({ sender: entity.issuer }, () => {
            this.zkApp.issueCredential(owner, entity, witness, this.zkApp.mapRoot.get());
        });
        return {
            transaction: transaction,
            pendingEntity: entity,
        };
    }
    async deployLocal(minaLocal, deployer, zkAppPrivateKey, useLocal) {
        this.useLocal = useLocal;
        let zkAppAddress = zkAppPrivateKey.toPublicKey();
        let deployerPublic = deployer.toPublicKey();
        const txn = await minaLocal.transaction(deployerPublic, () => {
            AccountUpdate.fundNewAccount(deployerPublic);
            this.zkApp.deploy();
        });
        await txn.prove();
        // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
        await txn.sign([deployer, zkAppPrivateKey]).send();
    }
}
//# sourceMappingURL=CredentialProxy.js.map