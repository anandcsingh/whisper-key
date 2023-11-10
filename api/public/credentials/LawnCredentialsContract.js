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
export class LawnCredentialsEntity extends Struct({
    id: Field,
    credentialType: CircuitString,
    issuer: PublicKey,
    owner: PublicKey,
    Username: CircuitString,
    Password: CircuitString,
}) {
    toPlainObject() {
        return {
            id: Number(this.id.toBigInt()),
            credentialType: this.credentialType.toString(),
            issuer: this.issuer.toBase58(),
            owner: this.owner.toBase58(),
            Username: this.Username.toString(),
            Password: this.Password.toString(),
        };
    }
    static fromPlainObject(obj) {
        return new LawnCredentialsEntity({
            id: Field(obj.id),
            credentialType: CircuitString.fromString(obj.credentialType),
            issuer: PublicKey.fromBase58(obj.issuer),
            owner: PublicKey.fromBase58(obj.owner),
            Username: CircuitString.fromString(obj.Username),
            Password: CircuitString.fromString(obj.Password),
        });
    }
    hash() {
        return Poseidon.hash(this.id.toFields()
            .concat(this.credentialType.toFields())
            .concat(this.issuer.toFields())
            .concat(this.owner.toFields())
            .concat(this.Username.toFields())
            .concat(this.Password.toFields())
            );
    }
}
export class LawnCredentialsContract extends SmartContract {
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
        // disabled for now as whisper key is issuing the credential, use a signiture instead?
        // this.sender.assertEquals(credential.issuer);
        credential.owner = owner;
        const hash = credential.hash();
        const [newRoot, _] = witness.computeRootAndKey(hash);
        this.mapRoot.set(newRoot);
    }
}
__decorate([
    state(Field),
    __metadata("design:type", Object)
], LawnCredentialsContract.prototype, "mapRoot", void 0);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Field]),
    __metadata("design:returntype", void 0)
], LawnCredentialsContract.prototype, "setMapRoot", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PublicKey,
        LawnCredentialsEntity,
        MerkleMapWitness,
        Field]),
    __metadata("design:returntype", void 0)
], LawnCredentialsContract.prototype, "issueCredential", null);
export class CredentialProxy {
    constructor(contractAddress, credentialName, owner, proofsEnabled) {
        this.useLocal = false;
        this.fee = 100000000;
        this.credentialName = credentialName;
        this.owner = owner;
        this.proofsEnabled = proofsEnabled;
        this.contractAddress = contractAddress;
        this.contractType = LawnCredentialsContract;
        if (this.proofsEnabled) {
            console.log("compiling contract @", new Date().toISOString());
            this.contractType.compile();
            console.log("compiled contract @", new Date().toISOString());
        }
        this.zkApp = new LawnCredentialsContract(this.contractAddress);
    }
    async getStorageRoot() {
        if (!this.useLocal)
            await fetchAccount({ publicKey: this.contractAddress });
        return this.zkApp.mapRoot.get();
    }
    async setStorageRoot(storageRoot, sender) {
        if (!this.useLocal)
            await fetchAccount({ publicKey: this.contractAddress });
        const transaction = await Mina.transaction({ sender, fee: this.fee }, () => {
            this.zkApp.setMapRoot(storageRoot);
        });
        return transaction;
    }
    async issueCredential(sender, owner, credential, merkleStore) {
        console.log("issueCredential");
        if (!this.useLocal)
            await fetchAccount({ publicKey: this.contractAddress });
        console.log("fetched");
        const entity = LawnCredentialsEntity.fromPlainObject(credential);
        console.log("entity");
        entity.id = Field(merkleStore.nextID);
        console.log("id");
        let hash = entity.hash();
        console.log("hash");
        merkleStore.map.set(entity.id, hash);
        console.log("set");
        const witness = merkleStore.map.getWitness(entity.id);
        console.log("witness");
        const currentRoot = await this.getStorageRoot();
        console.log("currentRoot");
        const transaction = await Mina.transaction({ sender: sender, fee: this.fee }, () => {
            this.zkApp.issueCredential(owner, entity, witness, currentRoot);
        });
        return {
            transaction: transaction,
            pendingEntity: entity,
        };
    }
    async deployLocal(minaLocal, deployer, zkAppPrivateKey, useLocal) {
        this.useLocal = useLocal;
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