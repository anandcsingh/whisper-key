var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CircuitString, Field, MerkleMap, MerkleMapWitness, Poseidon, PublicKey, SmartContract, State, Struct, method, state, } from 'o1js';
export class License extends Struct({
    id: Field,
    issuer: PublicKey,
    owner: PublicKey,
    number: CircuitString,
    name: CircuitString,
}) {
    toPlainObject() {
        return {
            id: Number(this.id.toBigInt()),
            issuer: this.issuer.toBase58(),
            owner: this.owner.toBase58(),
            firstName: this.firstName.toString(),
            lastName: this.lastName.toString(),
            licenceNumber: this.licenceNumber.toString(),
            createdDate: this.createdDate.toString(),
            expiryDate: this.expiryDate.toString(),
            class: this.class.toString(),
        };
    }
    hash() {
        return Poseidon.hash(this.issuer
            .toFields());
        }
}
export class LicenseContract extends SmartContract {
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
        const [newRoot, _] = witness.computeRootAndKey(credential.hash());
        this.mapRoot.set(newRoot);
    }
}
__decorate([
    state(Field),
    __metadata("design:type", Object)
], LicenseContract.prototype, "mapRoot", void 0);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Field]),
    __metadata("design:returntype", void 0)
], License.prototype, "setMapRoot", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PublicKey,
        License,
        MerkleMapWitness,
        Field]),
    __metadata("design:returntype", void 0)
], License.prototype, "issueCredential", null);
//# sourceMappingURL=License.js.map