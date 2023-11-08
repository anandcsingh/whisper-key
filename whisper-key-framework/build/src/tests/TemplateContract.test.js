import { PassportContract } from '../CredentialProxy';
import { Field, Mina, PrivateKey, AccountUpdate } from 'o1js';
/*
 * This file specifies how to test the `Add` example smart contract. It is safe to delete this file and replace
 * with your own tests.
 *
 * See https://docs.minaprotocol.com/zkapps for more info.
 */
let proofsEnabled = false;
describe('Template Contract', () => {
    let deployerAccount, deployerKey, senderAccount, senderKey, zkAppAddress, zkAppPrivateKey, zkApp;
    beforeAll(async () => {
        if (proofsEnabled)
            await PassportContract.compile();
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
        zkApp = new PassportContract(zkAppAddress);
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
    it('generates and deploys the `Add` smart contract', async () => {
        await localDeploy();
        const num = zkApp.mapRoot.get();
        console.log('num', num);
        expect(num).toEqual(Field(1));
    });
    it('correctly updates the num state on the `Add` smart contract', async () => {
        await localDeploy();
        // update transaction
        const txn = await Mina.transaction(senderAccount, () => {
            zkApp.setMapRoot(Field(3));
        });
        await txn.prove();
        await txn.sign([senderKey]).send();
        const updatedNum = zkApp.mapRoot.get();
        expect(updatedNum).toEqual(Field(3));
    });
});
//# sourceMappingURL=TemplateContract.test.js.map