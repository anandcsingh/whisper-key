import { Mina, SmartContract, method, UInt64, AccountUpdate, PublicKey, State, state, Field } from 'o1js';

export class EscrowContract extends SmartContract {
    @state(PublicKey) senderPublicKey = State<PublicKey>();
    @state(PublicKey) receiverPublicKey = State<PublicKey>();
    @state(Field) escrowAmount = State<Field>();

    events = {
        'escrow-funds-received': UInt64
    };

    init(): void {
        super.init();
        this.escrowAmount.set(Field(0));
    }

    @method async initState(owner: PublicKey, issuer: PublicKey) {
        this.senderPublicKey.set(owner);
        this.receiverPublicKey.set(issuer);
    }

    // withdraw from smart contract and send to receiver
    @method withdraw() {
        this.receiverPublicKey.requireEquals(this.receiverPublicKey.get());
        this.send({ to: this.receiverPublicKey.get(), amount: UInt64.from(2 * 1e9) });
    }

    @method setReceiver(receiver: PublicKey) {
        this.receiverPublicKey.getAndRequireEquals();
        this.receiverPublicKey.set(receiver);
    }

    @method setSender(sender: PublicKey) {
        this.senderPublicKey.getAndRequireEquals();
        this.senderPublicKey.set(sender);
    }

    // deposit to smart contract from sender account
    @method deposit(amount: UInt64) {
        let senderUpdate = AccountUpdate.create(this.sender);
        senderUpdate.requireSignature();
        senderUpdate.send({ to: this, amount });
        this.emitEvent("escrow-funds-received", amount);
    }

    // deposit to smart contract from sender account
    @method depositFromUser(sender: PublicKey, amount: UInt64) {
        this.senderPublicKey.set(sender);
        let senderUpdate = AccountUpdate.create(this.sender);
        senderUpdate.requireSignature();
        senderUpdate.send({ to: this, amount });
    }

}

function printBalances(addr: PublicKey) {
    console.log(
        `zkApp balance:  ${Mina.getBalance(addr).div(1e9)} MINA`
    );
}