// import { CredentialProxy, DiscordBadgeContract, DiscordBadgeEntity } from '../../public/credentials/DiscordBadgeContract';
import { CredentialProxy, DiscordBadgeContract, DiscordBadgeEntity } from './DiscordBadgeContract.js';

import { Field, Mina, PrivateKey, PublicKey, AccountUpdate, MerkleMap, CircuitString } from 'o1js';

/*
 * This file specifies how to test the `Add` example smart contract. It is safe to delete this file and replace
 * with your own tests.
 *
 * See https://docs.minaprotocol.com/zkapps for more info.
 */

let proofsEnabled = true;

describe('CredentialProxyTemplateOnBerkeley', () => {
  let deployerAccount: PublicKey,
    deployerKey: PrivateKey,
    senderAccount: PublicKey,
    senderKey: PrivateKey,
    zkAppAddress: PublicKey,
    zkAppPrivateKey: PrivateKey,
    zkApp: DiscordBadgeContract,
    local: any;

  beforeAll(async () => {
    if (proofsEnabled) await DiscordBadgeContract.compile();
  });

  beforeEach(() => {
    const Berkeley = Mina.Network(
      'https://proxy.berkeley.minaexplorer.com/graphql'
    );
    console.log('Berkeley Instance Created');
    Mina.setActiveInstance(Berkeley);
    senderKey = PrivateKey.fromBase58("EKEjzZdcsuaThenLan7UkQRxKXwZGTC2L6ufbCg4X5M9WF6UJx2j");
    senderAccount = senderKey.toPublicKey();
    zkAppAddress = PublicKey.fromBase58("B62qpsNhMkUqtpdsdUyNURPa7Z9p4YB7mSaxFWk4bi5NobfBhttk8u2");
    zkApp = new DiscordBadgeContract(zkAppAddress);
  });

  it('issues `DiscordBadge` credential smart contract', async () => {
    console.log("senderAccount:", senderAccount.toBase58());
    const proxy = new CredentialProxy(zkAppAddress, "DiscordBadge", senderAccount, proofsEnabled);
    const map = new MerkleMap();
    const entity = new DiscordBadgeEntity({
      id: Field(1),
      credentialType: CircuitString.fromString('Test'),
      owner: PublicKey.fromBase58("B62qqzMHkbogU9gnQ3LjrKomimsXYt4qHcXc8Cw4aX7tok8DjuDsAzx"),
      issuer: senderAccount,
      BadgeName: CircuitString.fromString('Test'),
      DiscordID: CircuitString.fromString('Test'),
    });
    
    
    const merkleStore = {
      nextID: 2,
      map: map,
    };
    const currentRoot = (await proxy.getStorageRoot()).toString();

    // update transaction
    const txn = await proxy.issueCredential(senderAccount, entity.toPlainObject(), merkleStore);
    await txn.transaction.prove();
    await txn.transaction.sign([senderKey]).send();

    const updatedRoot = (await proxy.getStorageRoot()).toString();

    expect(currentRoot).not.toEqual(updatedRoot);
    entity.owner = senderAccount;
    entity.id = Field(merkleStore.nextID);
    console.log("hash:", entity.hash().toString());
    const updatedWitness = map.getWitness(entity.id);
    const [newRoot, _] = updatedWitness.computeRootAndKey(entity.hash());

    expect(newRoot.toString()).toEqual(updatedRoot);
  });

});
