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
export class rishatest2Entity extends Struct({
    id: Field,
    credentialType: CircuitString,
    issuer: PublicKey,
    owner: PublicKey,
            Height: Field,
}) {
    toPlainObject() {
        return {
            id: Number(this.id.toBigInt()),
            credentialType: this.credentialType.toString(),
            issuer: this.issuer.toBase58(),
            owner: this.owner.toBase58(),
            Height: Number(this.Height.toBigInt()),
        };
    }
    static fromPlainObject(obj) {
        return new rishatest2Entity({
            id: Field(obj.id),
            credentialType: CircuitString.fromString(obj.credentialType),
            issuer: PublicKey.fromBase58(obj.issuer),
            owner: PublicKey.fromBase58(obj.owner),
            Height: Field(obj.Height),
        });
    }
    hash() {
        return Poseidon.hash(this.id.toFields()
            .concat(this.credentialType.toFields())
            .concat(this.issuer.toFields())
            .concat(this.owner.toFields())
            .concat(this.Height.toFields())
            );
    }
}
export class rishatest2Contract extends SmartContract {
    constructor() {
        super(...arguments);
        this.mapRoot = State();
        this.events = {
            issued: PublicKey,
        };
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
        // disable the assert for now
        //this.sender.assertEquals(credential.issuer);
        credential.owner = owner;
        const hash = credential.hash();
        const [newRoot, _] = witness.computeRootAndKey(hash);
        this.mapRoot.set(newRoot);
        this.emitEvent('issued', owner);
    }
}
__decorate([
    state(Field),
    __metadata("design:type", Object)
], rishatest2Contract.prototype, "mapRoot", void 0);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Field]),
    __metadata("design:returntype", void 0)
], rishatest2Contract.prototype, "setMapRoot", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PublicKey,
        rishatest2Entity,
        MerkleMapWitness,
        Field]),
    __metadata("design:returntype", void 0)
], rishatest2Contract.prototype, "issueCredential", null);
export class CredentialProxy {
    constructor(contractAddress, credentialName, owner, proofsEnabled) {
        this.useLocal = false;
        this.fee = 100000000;
        this.credentialName = credentialName;
        this.owner = owner;
        this.proofsEnabled = proofsEnabled;
        this.contractAddress = contractAddress;
        this.contractType = rishatest2Contract;
        if (this.proofsEnabled) {
            console.log("compiling contract @", new Date().toISOString());
            this.contractType.compile();
            console.log("compiled contract @", new Date().toISOString());
        }
        this.zkApp = new rishatest2Contract(this.contractAddress);
    }
    async fetchEvents(start, end) {
        let events = await this.zkApp.fetchEvents(start, end);
        let content = events.map((e) => {
            return { type: e.type, data: JSON.stringify(e.event), blockHeight: Number(e.blockHeight.toBigint()) };
        });
        return content;
    }
    async getEntityFromObject(obj) {
        return rishatest2Entity.fromPlainObject(obj);
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
    async issueCredential(payer, credential, merkleStore) {
        if (!this.useLocal)
            await fetchAccount({ publicKey: this.contractAddress });
        credential.id = merkleStore.nextID;
        const entity = rishatest2Entity.fromPlainObject(credential);
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