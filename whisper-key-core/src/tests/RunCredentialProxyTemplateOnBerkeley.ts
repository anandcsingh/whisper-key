import { CredentialProxy, DiscordBadgeContract, DiscordBadgeEntity } from './DiscordBadgeContract.js';
import { Field, Mina, PrivateKey, PublicKey, AccountUpdate, MerkleMap, CircuitString, fetchAccount } from 'o1js';



let proofsEnabled = true;
let deployerAccount: PublicKey,
  deployerKey: PrivateKey,
  senderAccount: PublicKey,
  senderKey: PrivateKey,
  zkAppAddress: PublicKey,
  zkAppPrivateKey: PrivateKey,
  zkApp: DiscordBadgeContract,
  local: any;
if (proofsEnabled) await DiscordBadgeContract.compile();


const Berkeley = Mina.Network(
  'https://proxy.berkeley.minaexplorer.com/graphql'
);
console.log('Berkeley Instance Created');
Mina.setActiveInstance(Berkeley);
senderKey = PrivateKey.fromBase58("EKEjzZdcsuaThenLan7UkQRxKXwZGTC2L6ufbCg4X5M9WF6UJx2j");
senderAccount = senderKey.toPublicKey();

zkAppAddress = PublicKey.fromBase58("B62qmVJRKong9PuMagoWGDmPjSdmSkjPhW2R3ZyB8nZswiSAxcua5H8");
await fetchAccount({ publicKey: zkAppAddress });

zkApp = new DiscordBadgeContract(zkAppAddress);

console.log("senderAccount:", senderAccount.toBase58());
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
const currentRoot = zkApp.mapRoot.get();

await fetchAccount({ publicKey: zkAppAddress });
entity.id = Field(merkleStore.nextID);
let hash = entity.hash();

merkleStore.map.set(entity.id, hash);
const transactionFee = 100_000_000;
console.log("fee:", transactionFee);
const witness = merkleStore.map.getWitness(entity.id);
const transaction = await Mina.transaction({ sender: entity.issuer, fee: transactionFee }, () => {
  zkApp.issueCredential(senderAccount, entity, witness, currentRoot);
});

console.log("proving transaction");
await transaction.prove();
console.log("signing transaction");
let result = await transaction.sign([senderKey]).send();

console.log(`https://berkeley.minaexplorer.com/transaction/${result.hash()}`);