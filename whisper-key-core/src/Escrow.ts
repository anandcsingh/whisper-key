import { Mina, SmartContract, method, UInt64, AccountUpdate, PublicKey } from 'o1js';

export class Escrow extends SmartContract {
    init(): void {

    }

    // deposit to sender account from smart contract
    @method async deposit(user: PublicKey) {
        // add your deposit logic circuit here
        // that will adjust the amount

        const payerUpdate = AccountUpdate.createSigned(user);
        console.log('Sender account balance before:', payerUpdate.balance);

        payerUpdate.send({ to: this.address, amount: UInt64.from(1000000) });
    }

    // deposit to smart contract from sender account
    @method depositToSmartContract(amount: UInt64) {
        let senderUpdate = AccountUpdate.create(this.sender);
        senderUpdate.requireSignature();
        console.log('Smart contract balance before:')
        printBalances(this.address);
        senderUpdate.send({ to: this, amount });
        console.log('Smart contract balance after:');
        printBalances(this.address);
    }
}

function printBalances(addr: PublicKey) {
    console.log(
        `zkApp balance:  ${Mina.getBalance(addr).div(1e9)} MINA`
    );
}