import { PassportContract, PassportEntity } from '../CredentialProxy';
import { Field, Mina, PrivateKey, PublicKey, AccountUpdate, MerkleMap, CircuitString } from 'o1js';

/*
 * This file specifies how to test the `Add` example smart contract. It is safe to delete this file and replace
 * with your own tests.
 *
 * See https://docs.minaprotocol.com/zkapps for more info.
 */

let proofsEnabled = false;

describe('TemplateContract', () => {
  let deployerAccount: PublicKey,
    deployerKey: PrivateKey,
    senderAccount: PublicKey,
    senderKey: PrivateKey,
    zkAppAddress: PublicKey,
    zkAppPrivateKey: PrivateKey,
    zkApp: PassportContract;

  beforeAll(async () => {
    if (proofsEnabled) await PassportContract.compile();
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

  it('generates and deploys the `PassportContract` smart contract', async () => {
    await localDeploy();
    const num = zkApp.mapRoot.get();
    expect(num).toEqual(Field(new MerkleMap().getRoot()));
  });

  it('correctly updates the mapRoot state on the `PassportContract` smart contract', async () => {
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

  it('issues `PassportContract` credential smart contract', async () => {
    await localDeploy();
    const map = new MerkleMap();
    const entity = new PassportEntity({
      id: Field(1),
      credentialType: CircuitString.fromString('Test'),
      owner: PublicKey.empty(),
      issuer: senderAccount,
      firstName: CircuitString.fromString('Test'),
      lastName: CircuitString.fromString('Test'),
      dateOfBirth: CircuitString.fromString('Test'),
      expiryDate: CircuitString.fromString('Test'),
      passportNumber: CircuitString.fromString('Test'),
      nationality: CircuitString.fromString('Test'),
    });
    
    map.set(entity.id, entity.hash());
    const witness = map.getWitness(entity.id);
    // update transaction
    const txn = await Mina.transaction(senderAccount, () => {
      zkApp.issueCredential(senderAccount, entity, witness, zkApp.mapRoot.get());
    });
    await txn.prove();
    await txn.sign([senderKey]).send();

    const updatedRoot = zkApp.mapRoot.get().toString();
    entity.owner = senderAccount;
    const updatedWitness = map.getWitness(entity.id);
    const [newRoot, _] = witness.computeRootAndKey(entity.hash());

    expect(newRoot.toString()).toEqual(updatedRoot);
  });

  it('verifies `PassportContract` credential smart contract', async () => {
    await localDeploy();
    const map = new MerkleMap();
    const entity = new PassportEntity({
      id: Field(1),
      credentialType: CircuitString.fromString('Test'),
      owner: PublicKey.empty(),
      issuer: senderAccount,
      firstName: CircuitString.fromString('Test'),
      lastName: CircuitString.fromString('Test'),
      dateOfBirth: CircuitString.fromString('Test'),
      expiryDate: CircuitString.fromString('Test'),
      passportNumber: CircuitString.fromString('Test'),
      nationality: CircuitString.fromString('Test'),
    });
    
    map.set(entity.id, entity.hash());
    const witness = map.getWitness(entity.id);
    // update transaction
    const txn = await Mina.transaction(senderAccount, () => {
      zkApp.issueCredential(senderAccount, entity, witness, zkApp.mapRoot.get());
    });
    await txn.prove();
    await txn.sign([senderKey]).send();

    const updatedRoot = zkApp.mapRoot.get().toString();
    entity.owner = senderAccount;
    const updatedWitness = map.getWitness(entity.id);
    const [newRoot, _] = witness.computeRootAndKey(entity.hash());

    expect(newRoot.toString()).toEqual(updatedRoot);

    
  });
});
