var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Mina, SmartContract, method, UInt64, AccountUpdate, PublicKey, State, state, Field } from 'o1js';
export class EscrowContract extends SmartContract {
    /**
     * Initializes a new instance of the Escrow Contract.
     * @param senderAddress The public key of the sender initiating the escrow.
     * @param receiverAddress The public key of the receiver participating in the escrow.
     * @param zkAppAddress The public key of the zero-knowledge application associated with this escrow.
     */
    constructor(senderAddress, receiverAddress, zkAppAddress) {
        super(zkAppAddress);
        this.senderPublicKey = State();
        this.receiverPublicKey = State();
        this.escrowAmount = State();
        this.events = {
            'escrow-funds-received': UInt64
        };
        let senderPubKey = PublicKey.fromBase58(senderAddress);
        let receiverPubKey = PublicKey.fromBase58(receiverAddress);
        this.senderPublicKey.set(senderPubKey);
        this.receiverPublicKey.set(receiverPubKey);
    }
    init() {
        this.escrowAmount.set(Field(0));
    }
    // withdraw from smart contract and send to receiver
    async withdraw(user) {
        // add your deposit logic circuit here
        // that will adjust the amount
        let receiverPubKey = this.receiverPublicKey.get();
        const payerUpdate = AccountUpdate.createSigned(receiverPubKey);
        payerUpdate.send({ to: this.address, amount: UInt64.from(2 * 1e9) });
    }
    setReceiver(receiver) {
        this.receiverPublicKey.set(receiver);
    }
    setSender(sender) {
        this.senderPublicKey.set(sender);
    }
    // deposit to smart contract from sender account
    deposit(amount) {
        let senderUpdate = AccountUpdate.create(this.sender);
        senderUpdate.requireSignature();
        senderUpdate.send({ to: this, amount });
        this.emitEvent("escrow-funds-received", amount);
    }
    // deposit to smart contract from sender account
    depositFromUser(sender, amount) {
        this.senderPublicKey.set(sender);
        let senderUpdate = AccountUpdate.create(this.sender);
        senderUpdate.requireSignature();
        senderUpdate.send({ to: this, amount });
    }
}
__decorate([
    state(PublicKey),
    __metadata("design:type", Object)
], EscrowContract.prototype, "senderPublicKey", void 0);
__decorate([
    state(PublicKey),
    __metadata("design:type", Object)
], EscrowContract.prototype, "receiverPublicKey", void 0);
__decorate([
    state(Field),
    __metadata("design:type", Object)
], EscrowContract.prototype, "escrowAmount", void 0);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PublicKey]),
    __metadata("design:returntype", Promise)
], EscrowContract.prototype, "withdraw", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PublicKey]),
    __metadata("design:returntype", void 0)
], EscrowContract.prototype, "setReceiver", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PublicKey]),
    __metadata("design:returntype", void 0)
], EscrowContract.prototype, "setSender", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UInt64]),
    __metadata("design:returntype", void 0)
], EscrowContract.prototype, "deposit", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PublicKey, UInt64]),
    __metadata("design:returntype", void 0)
], EscrowContract.prototype, "depositFromUser", null);
function printBalances(addr) {
    console.log(`zkApp balance:  ${Mina.getBalance(addr).div(1e9)} MINA`);
}
//# sourceMappingURL=EscrowContract.js.map