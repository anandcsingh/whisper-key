import { CredentialProxy, PassportContract, PassportEntity } from '../CredentialProxy';
import { Field, Mina, PrivateKey, PublicKey, AccountUpdate, MerkleMap, CircuitString, UInt32 } from 'o1js';

/*
 * This file specifies how to test the `Add` example smart contract. It is safe to delete this file and replace
 * with your own tests.
 *
 * See https://docs.minaprotocol.com/zkapps for more info.
 */

let proofsEnabled = false;

describe('CredentialProxyTemplateLocal', () => {
  let deployerAccount: PublicKey,
    deployerKey: PrivateKey,
    senderAccount: PublicKey,
    senderKey: PrivateKey,
    zkAppAddress: PublicKey,
    zkAppPrivateKey: PrivateKey,
    zkApp: PassportContract,
    local: any;

  beforeAll(async () => {
    if (proofsEnabled) await PassportContract.compile();
  });

  beforeEach(() => {
    local = Mina.LocalBlockchain({ proofsEnabled });
    Mina.setActiveInstance(local);
    ({ privateKey: deployerKey, publicKey: deployerAccount } =
      local.testAccounts[0]);
    ({ privateKey: senderKey, publicKey: senderAccount } =
      local.testAccounts[1]);
    zkAppPrivateKey = PrivateKey.random();
    zkAppAddress = zkAppPrivateKey.toPublicKey();
    zkApp = new PassportContract(zkAppAddress);
  });

  // it('generates and deploys the `PassportContract` smart contract', async () => {
  //   const contractAddress = PrivateKey.random();
  //   const proxy = new CredentialProxy(contractAddress.toPublicKey(), "Passport",senderAccount, proofsEnabled);
  //   await proxy.deployLocal(deployerKey, contractAddress, true);

  //   const num = await proxy.getStorageRoot();
  //   expect(num).toEqual(Field(new MerkleMap().getRoot()));
  // });

  it('correctly updates the mapRoot state on the `PassportContract` smart contract', async () => {
    const contractAddress = PrivateKey.random();
    console.log(senderAccount.toBase58());
    const proxy = new CredentialProxy(contractAddress.toPublicKey(), "Passport",senderAccount, proofsEnabled);
    
    await proxy.deployLocal(local, deployerKey, contractAddress, true);

    let issuerPrivate = PrivateKey.fromBase58('EKFZWMtRmcQELaJvqcEyEEJqh874B3PndA8kpxSst6AiHtErn7Xw'); //B62qqzMHkbogU9gnQ3LjrKomimsXYt4qHcXc8Cw4aX7tok8DjuDsAzx
    let issuerPublic = issuerPrivate.toPublicKey();


    // update transaction
    const txn = await proxy.setStorageRoot(Field(3), senderAccount);
    await txn.prove();
    await txn.sign([senderKey]).send();

    const updatedNum = await proxy.getStorageRoot();
    expect(updatedNum).toEqual(Field(3));
  });

  it('generates the same hash for the same object', async () => {
    const entity = new PassportEntity({
      id: Field(1),
      credentialType: CircuitString.fromString('Test'),
      owner: PublicKey.fromBase58("B62qqzMHkbogU9gnQ3LjrKomimsXYt4qHcXc8Cw4aX7tok8DjuDsAzx"),
      issuer: senderAccount,
      firstName: CircuitString.fromString('Test'),
      lastName: CircuitString.fromString('Test'),
      dateOfBirth: CircuitString.fromString('Test'),
      expiryDate: CircuitString.fromString('Test'),
      passportNumber: CircuitString.fromString('Test'),
      nationality: CircuitString.fromString('Test'),
    });
    
    const hash1 = entity.hash();
    const hash2 = entity.hash();
    expect(hash1).toEqual(hash2);

    const hash3 =  PassportEntity.fromPlainObject(entity.toPlainObject()).hash();
    const hash4 =  PassportEntity.fromPlainObject(entity.toPlainObject()).hash();
    expect(hash3).toEqual(hash4);
  });

  it('issues `PassportContract` credential smart contract', async () => {
    const contractAddress = PrivateKey.random();
    const proxy = new CredentialProxy(contractAddress.toPublicKey(), "Passport",senderAccount, proofsEnabled);
    await proxy.deployLocal(local, deployerKey, contractAddress, true);
    const map = new MerkleMap();
    const entity = new PassportEntity({
      id: Field(1),
      credentialType: CircuitString.fromString('Test'),
      owner: PublicKey.fromBase58("B62qqzMHkbogU9gnQ3LjrKomimsXYt4qHcXc8Cw4aX7tok8DjuDsAzx"),
      issuer: senderAccount,
      firstName: CircuitString.fromString('Test'),
      lastName: CircuitString.fromString('Test'),
      dateOfBirth: CircuitString.fromString('Test'),
      expiryDate: CircuitString.fromString('Test'),
      passportNumber: CircuitString.fromString('Test'),
      nationality: CircuitString.fromString('Test'),
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
    entity.id = Field(merkleStore.nextID);
    console.log("hash:", entity.hash().toString());
    const updatedWitness = map.getWitness(entity.id);
    const [newRoot, _] = updatedWitness.computeRootAndKey(entity.hash());

    expect(newRoot.toString()).toEqual(updatedRoot);
  });

  it('get PassportEntity struct from plain object', async () => {
    const contractAddress = PrivateKey.random();
    const proxy = new CredentialProxy(contractAddress.toPublicKey(), "Passport",senderAccount, proofsEnabled);
    const obj = {
      id: 1,
      credentialType: 'Passport',
      owner: "B62qqzMHkbogU9gnQ3LjrKomimsXYt4qHcXc8Cw4aX7tok8DjuDsAzx",
      issuer: senderAccount.toBase58(),
      firstName: 'Alice',
      lastName: 'Bob',
      dateOfBirth: '2023-01-01',
      expiryDate: '2023-01-01',
      passportNumber: '123456789',
      nationality: 'Trinidadian',
    };
    const entity = await proxy.getEntityFromObject(obj);
    expect(entity).toBeDefined();

    expect(entity.id).toEqual(Field(1));
    expect(entity.credentialType).toEqual(CircuitString.fromString('Passport'));
    expect(entity.owner).toEqual(PublicKey.fromBase58("B62qqzMHkbogU9gnQ3LjrKomimsXYt4qHcXc8Cw4aX7tok8DjuDsAzx"));
    expect(entity.issuer).toEqual(senderAccount);
    expect(entity.firstName).toEqual(CircuitString.fromString('Alice'));
    expect(entity.lastName).toEqual(CircuitString.fromString('Bob'));
    expect(entity.dateOfBirth).toEqual(CircuitString.fromString('2023-01-01'));
    expect(entity.expiryDate).toEqual(CircuitString.fromString('2023-01-01'));
    expect(entity.passportNumber).toEqual(CircuitString.fromString('123456789'));
    expect(entity.nationality).toEqual(CircuitString.fromString('Trinidadian'));
  });

  it('issues `PassportContract` credential smart contract produces events', async () => {
    const contractAddress = PrivateKey.random();
    const proxy = new CredentialProxy(contractAddress.toPublicKey(), "Passport",senderAccount, proofsEnabled);
    await proxy.deployLocal(local, deployerKey, contractAddress, true);
    const map = new MerkleMap();
    const entity = new PassportEntity({
      id: Field(1),
      credentialType: CircuitString.fromString('Test'),
      owner: PublicKey.fromBase58("B62qqzMHkbogU9gnQ3LjrKomimsXYt4qHcXc8Cw4aX7tok8DjuDsAzx"),
      issuer: senderAccount,
      firstName: CircuitString.fromString('Test'),
      lastName: CircuitString.fromString('Test'),
      dateOfBirth: CircuitString.fromString('Test'),
      expiryDate: CircuitString.fromString('Test'),
      passportNumber: CircuitString.fromString('Test'),
      nationality: CircuitString.fromString('Test'),
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
    entity.id = Field(merkleStore.nextID);
    console.log("hash:", entity.hash().toString());
    const updatedWitness = map.getWitness(entity.id);
    const [newRoot, _] = updatedWitness.computeRootAndKey(entity.hash());

    expect(newRoot.toString()).toEqual(updatedRoot);

    const events = await proxy.fetchEvents(UInt32.from(0));
    console.log(events);
    expect(events.length).toEqual(1);
  });
});
