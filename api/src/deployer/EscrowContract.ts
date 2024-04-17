import { Mina, SmartContract, method, UInt64, AccountUpdate, PublicKey, State, state, Field } from 'o1js';

export class EscrowContract extends SmartContract {
    @state(PublicKey) senderPublicKey = State<PublicKey>();
    @state(PublicKey) receiverPublicKey = State<PublicKey>();
    @state(Field) escrowAmount = State<Field>();

    /**
     * Initializes a new instance of the Escrow Contract.
     * @param senderAddress The public key of the sender initiating the escrow.
     * @param receiverAddress The public key of the receiver participating in the escrow.
     * @param zkAppAddress The public key of the zero-knowledge application associated with this escrow.
     */
    constructor(senderAddress: string, receiverAddress: string, zkAppAddress: PublicKey) {
        super(zkAppAddress);
        let senderPubKey = PublicKey.fromBase58(senderAddress);
        let receiverPubKey = PublicKey.fromBase58(receiverAddress);
        this.senderPublicKey.set(senderPubKey);
        this.receiverPublicKey.set(receiverPubKey);
    }

    events = {
        'escrow-funds-received': UInt64
    };

    init(): void {
        this.escrowAmount.set(Field(0));
    }

    // withdraw from smart contract and send to receiver
    @method async withdraw(user: PublicKey) {
        // add your deposit logic circuit here
        // that will adjust the amount
        let receiverPubKey = this.receiverPublicKey.get();
        const payerUpdate = AccountUpdate.createSigned(receiverPubKey);

        payerUpdate.send({ to: this.address, amount: UInt64.from(2 * 1e9) });
    }

    @method setReceiver(receiver: PublicKey) {
        this.receiverPublicKey.set(receiver);
    }

    @method setSender(sender: PublicKey) {
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