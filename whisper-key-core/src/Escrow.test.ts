import { EscrowContract } from './EscrowContract';
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
        senderAccount2: PublicKey,
        senderKey: PrivateKey,
        senderKey2: PrivateKey,
        receiverKey: PrivateKey,
        receiverAccount: PublicKey,
        zkAppAddress: PublicKey,
        zkAppPrivateKey: PrivateKey,
        zkApp: EscrowContract;

    beforeAll(async () => {
        if (proofsEnabled) await EscrowContract.compile();
        if (proofsEnabled) console.log('Escrow Contract compiled....');
        console.log('Proofs Enabled', proofsEnabled);
    });

    beforeEach(() => {
        const Local = Mina.LocalBlockchain({ proofsEnabled });
        Mina.setActiveInstance(Local);
        ({ privateKey: deployerKey, publicKey: deployerAccount } =
            Local.testAccounts[0]);
        ({ privateKey: senderKey, publicKey: senderAccount } =
            Local.testAccounts[1]);
        ({ privateKey: receiverKey, publicKey: receiverAccount } =
            Local.testAccounts[2]);
        ({ privateKey: senderKey2, publicKey: senderAccount2 } =
            Local.testAccounts[1]);
        zkAppPrivateKey = PrivateKey.random();
        zkAppAddress = zkAppPrivateKey.toPublicKey();
        let senderPubKey = PublicKey.toBase58(senderAccount);
        let receiverPubKey = PublicKey.toBase58(receiverAccount);
        zkApp = new EscrowContract(zkAppAddress);
    });

    async function localDeploy() {
        const txn = await Mina.transaction(deployerAccount, () => {
            AccountUpdate.fundNewAccount(deployerAccount);
            zkApp.deploy();
            zkApp.setSender(senderAccount);
            zkApp.setReceiver(receiverAccount);
        });
        await txn.prove();
        // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
        await txn.sign([deployerKey, zkAppPrivateKey]).send();
    }

    // it('generates and deploys the `Escrow` smart contract', async () => {
    //     await localDeploy();
    // });

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

    it('can deposit to the receiver account', async () => {
        await localDeploy();
        const mina = 1e9;
        const txn1 = await Mina.transaction(senderAccount, () => {
            zkApp.deposit(UInt64.from(2 * mina));
        });
        await txn1.prove();
        await txn1.sign([senderKey]).send();
        console.log(txn1.toPretty());
        let balanceBefore = Mina.getBalance(zkAppAddress).div(1e9);
        console.log(`zkApp balance before withdrawing:  ${balanceBefore} MINA`);
        // update transaction
        const txn = await Mina.transaction(senderAccount, () => {
            zkApp.withdraw();
        });
        await txn.prove();
        await txn.sign([senderKey]).send();
        let balance = Mina.getBalance(zkAppAddress).div(1e9);
        console.log(`zkApp balance after withdrawing:  ${balance} MINA`);
        expect(balance).toEqual(UInt64.from(0));
    });

});
