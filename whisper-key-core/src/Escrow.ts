import { SmartContract, method, UInt64, AccountUpdate, PublicKey } from 'o1js';

export class Escrow extends SmartContract {
    init(): void {

    }

    @method async deposit(user: PublicKey) {
        // add your deposit logic circuit here
        // that will adjust the amount

        const payerUpdate = AccountUpdate.createSigned(user);
        console.log('Sender account balance before:', payerUpdate.balance);

        payerUpdate.send({ to: this.address, amount: UInt64.from(1000000) });
    }
}