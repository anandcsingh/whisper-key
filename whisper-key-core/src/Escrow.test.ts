import { Escrow } from './Escrow';
import { Field, Mina, PrivateKey, PublicKey, AccountUpdate, UInt64 } from 'o1js';

/*
 * This file specifies how to test the `Escrow` example smart contract. It is safe to delete this file and replace
 * with your own tests.
 *
 * See https://docs.minaprotocol.com/zkapps for more info.
 */

let proofsEnabled = false;

describe('Escrow', () => {
    let deployerAccount: PublicKey,
        deployerKey: PrivateKey,
        senderAccount: PublicKey,
        senderKey: PrivateKey,
        zkAppAddress: PublicKey,
        zkAppPrivateKey: PrivateKey,
        zkApp: Escrow;

    beforeAll(async () => {
        if (proofsEnabled) await Escrow.compile();
    });

    beforeEach(() => {
        const Local = Mina.LocalBlockchain({ proofsEnabled });
        Mina.setActiveInstance(Local);
        ({ privateKey: deployerKey, publicKey: deployerAccount } =
            Local.testAccounts[0]);
        ({ privateKey: senderKey, publicKey: senderAccount } =
            Local.testAccounts[1]);
        zkAppPrivateKey = PrivateKey.random();
        zkAppAddress = zkAppPrivateKey.toPublicKey();
        zkApp = new Escrow(zkAppAddress);
    });

    async function localDeploy() {
        const txn = await Mina.transaction(deployerAccount, () => {
            AccountUpdate.fundNewAccount(deployerAccount);
            zkApp.deploy();
        });
        await txn.prove();
        // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
        await txn.sign([deployerKey, zkAppPrivateKey]).send();
    }

    it('generates and deploys the `Escrow` smart contract', async () => {
        await localDeploy();
    });

    it('can deposit to the sender account', async () => {
        await localDeploy();
        // update transaction
        const txn = await Mina.transaction(senderAccount, () => {
            zkApp.withdraw(senderAccount);
        });
        await txn.prove();
        await txn.sign([senderKey]).send();
    });

    it('can deposit to smart contract to hold in escrow', async () => {
        await localDeploy();

        const mina = 1e9;
        const txn = await Mina.transaction(senderAccount, () => {
            zkApp.deposit(UInt64.from(2 * mina));
        });
        await txn.prove();
        await txn.sign([senderKey]).send();
        console.log(txn.toPretty());
        let balance = Mina.getBalance(zkAppAddress).div(1e9);
        console.log(`zkApp balance after deposit:  ${balance} MINA`);
        expect(balance).toEqual(UInt64.from(2));
    });

});
