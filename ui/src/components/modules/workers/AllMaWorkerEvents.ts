import {
  Mina,
  isReady,
  PublicKey,
  PrivateKey,
  Field,
  fetchAccount,
  MerkleMapWitness,
  CircuitString,
  Bool,
  AccountUpdate,
} from 'snarkyjs'
import { BackingStore, MerkleMapDatabase } from '../../../../contracts/build/src/models/MartialArtistRepository.js';


type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// ---------------------------------------------------------------------------------------

import type { AllMartialArtsEvents } from '../../../../contracts/src/AllMartialArtsEvents.js';
import { MartialArtistRepository } from '../../../../contracts/src/models/MartialArtistRepository.js';
import { FirebaseBackingStore } from '../../../../contracts/build/src/models/firebase/FirebaseBackingStore.js';
import { MartialArtist } from '../../../../contracts/build/src/models/MartialArtist.js';
import { MinaLocalBlockchain } from '../../../../contracts/build/src/local/MinaLocalBlockchain.js';

export default class ActionResult {
  success: boolean;
  message: string;
  constructor(success: boolean, message: string) {
    this.success = success;
    this.message = message;
  }
}

const state = {
  zkapp: null as null | AllMartialArtsEvents,
  transaction: null as null | Transaction,
  AllMartialArtsEvents: null as null | typeof AllMartialArtsEvents,
  pendingMartialArtist: null as null | undefined | MartialArtist,
}

const localBlockchainSetup = {
  useLocal: true,
  localBlockchain: null as null | any,
}


// ---------------------------------------------------------------------------------------

const functions = {
  loadSnarkyJS: async (args: {}) => {
    await isReady;
  },
  setActiveInstanceToBerkeley: async (args: {}) => {
    if (!localBlockchainSetup.useLocal) {
      const Berkeley = Mina.Network(
        'https://proxy.berkeley.minaexplorer.com/graphql'
      );
      console.log('Berkeley Instance Created');
      Mina.setActiveInstance(Berkeley);
    } else {
      localBlockchainSetup.localBlockchain = Mina.LocalBlockchain({ proofsEnabled: false });
      Mina.setActiveInstance(localBlockchainSetup.localBlockchain);
      console.log("using local blockchain instead of Berkeley");
      console.log("attaching accounts to local blockchain");
      let senderPrivate = PrivateKey.fromBase58('EKFUES7YfgYm38njcBHzxyU6RPZQdZnfThcMzLrHL9LjyxJKfXzY');
      let senderPublic = senderPrivate.toPublicKey();

      let instructorPrivate = PrivateKey.fromBase58('EKFZWMtRmcQELaJvqcEyEEJqh874B3PndA8kpxSst6AiHtErn7Xw'); //B62qqzMHkbogU9gnQ3LjrKomimsXYt4qHcXc8Cw4aX7tok8DjuDsAzx
      let instructorPublic = instructorPrivate.toPublicKey();

      let newStudent = PrivateKey.fromBase58("EKDzuEofrhNa2iSHS7Zq19fy6p7cX3FYrQ2pQ99uab1JjM4zLwA4");// B62qk5mbK8NfRVXEw2ubyD2QbuU7WWhevE42yHz9rxgwjt21BtEa6Jg
      let newStudentPublic = newStudent.toPublicKey();
      localBlockchainSetup.localBlockchain.addAccount(senderPublic, '10_000_000_000');
      localBlockchainSetup.localBlockchain.addAccount(instructorPublic, '10_000_000_000');
      localBlockchainSetup.localBlockchain.addAccount(newStudentPublic, '10_000_000_000');
  
    }
  },
  loadContract: async (args: {}) => {

    const { AllMartialArtsEvents } = await import('../../../../contracts/build/src/AllMartialArtsEvents.js');
    state.AllMartialArtsEvents = AllMartialArtsEvents;
    console.log("contract AllMartialArtsEvents loaded");
  },
  compileContract: async (args: {}) => {
    if (!localBlockchainSetup.useLocal) {
      console.log("compiling AllMartialArtsEvents contract");
      state.AllMartialArtsEvents!.compile();
      console.log("contract AllMartialArtsEvents compiled");
    } else {
      console.log("no compiling using local blockchain");
    }

  },
  fetchAccount: async (args: { publicKey58: string }) => {
    console.log("fetching account AllMartialArtsEvents from worker:", args.publicKey58);

    if (!localBlockchainSetup.useLocal) {
      console.log("fetching account AllMartialArtsEvents:", args.publicKey58);
      console.log("fetch @ ", new Date().toLocaleTimeString());
      const publicKey = PublicKey.fromBase58(args.publicKey58);
      let fetch = await fetchAccount({ publicKey });
      console.log("fetched @ ", new Date().toLocaleTimeString());
      return fetch;
    } else {
      console.log("no fetching using local blockchain");
      return {error:null};
    }

  },
  initZkappInstance: async (args: { publicKey58: string }) => {

    if (localBlockchainSetup.useLocal) {
      let [deployerAccount, s, i] = new MinaLocalBlockchain(
        false
      ).accounts;
      let zkAppPrivateKey = PrivateKey.random();
      let zkAppAddress = zkAppPrivateKey.toPublicKey();
      state.zkapp = new state.AllMartialArtsEvents!(zkAppAddress);
      const txn = await Mina.transaction(deployerAccount.publicKey, () => {
        AccountUpdate.fundNewAccount(deployerAccount.publicKey);
        state.zkapp!.deploy();
      });
      await txn.prove();
      // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
      await txn.sign([deployerAccount.privateKey, zkAppPrivateKey]).send();
      console.log("zkapp AllMartialArtsEvents instance initialized locally");

      

      console.log("sync backing store roots with contract roots");
      let bbjBackingStore = new FirebaseBackingStore("BJJ");
      let judoBackingStore = new FirebaseBackingStore("Judo");
      let karateBackingStore = new FirebaseBackingStore("Karate");
      console.log("backing stores initialized");
      let bjjMerkleStore = await bbjBackingStore.getMerkleMap();
      console.log("BJJ merkle store initialized");
      // let judoMerkleStore = await judoBackingStore.getMerkleMap();
      // console.log("Judo merkle store initialized");
      // let karateMerkleStore = await karateBackingStore.getMerkleMap();
      // console.log("Karate merkle store initialized");
      let txn1 = await Mina.transaction({ sender: s.publicKey }, () => {
        state.zkapp!.setbBjjMapRoot(bjjMerkleStore.map.getRoot());
      });
      await txn1.prove();
      let result = await txn1.sign([s.privateKey]).send();
      // console.log("BJJ root synced ", bjjMerkleStore.map.getRoot().toString() + " == " + state.zkapp!.bjjMapRoot.get().toString());
      // txn1 = await Mina.transaction({ sender: s.publicKey }, () => {
      //   state.zkapp!.setJudoMapRoot(judoMerkleStore.map.getRoot());
      // });
      // await txn1.prove();
      // result = await txn1.sign([s.privateKey]).send();
      // console.log("Judo root synced ", judoMerkleStore.map.getRoot().toString() + " == " + state.zkapp!.judoMapRoot.get().toString());
      
      // txn1 = await Mina.transaction({ sender: s.publicKey }, () => {
      //   state.zkapp!.setKarateMapRoot(judoMerkleStore.map.getRoot());
      // });
      // await txn1.prove();
      // result = await txn1.sign([s.privateKey]).send();
      // console.log("Karate root synced ", karateMerkleStore.map.getRoot().toString() + " == " + state.zkapp!.karateMapRoot.get().toString());

    } else {

      const publicKey = PublicKey.fromBase58(args.publicKey58);
      state.zkapp = new state.AllMartialArtsEvents!(publicKey);
      console.log("zkapp AllMartialArtsEvents instance initialized");
      console.log("zkapp AllMartialArtsEvents address: ", args.publicKey58);
    }
  },
  getStorageRootField: async (args: { discipline: string }) => {
    console.log("getting storage root for discipline: ", args.discipline);
    let currentNum = Field(0);

    if (args.discipline == "BJJ") {
      currentNum = state.zkapp!.bjjMapRoot.get();
    console.log("storage from BJJ root: ", currentNum.toString());
      return currentNum;
    } else if (args.discipline == "Judo") {
      currentNum = state.zkapp!.judoMapRoot.get();
      console.log("storage from Judo root: ", currentNum.toString());
      return currentNum;
    } else if (args.discipline == "Karate") {
      currentNum = state.zkapp!.karateMapRoot.get();
      console.log("storage from Karate root: ", currentNum.toString());
      return currentNum;
    }
    console.log("storage root: ", currentNum.toString());
    return currentNum;
  },
  getStorageRoot: async (args: { discipline: string }) => {
    return JSON.stringify(await functions.getStorageRootField({ discipline: args.discipline }));
  },
  setStorageRoot: async (args: { root: string, discipline: string }) => {
    let storage = Field(args.root);

    // create storage root transaction for a discipline
    const transaction = await Mina.transaction(() => {

      if (args.discipline == "BJJ") {
        state.zkapp!.setbBjjMapRoot(storage);
      } else if (args.discipline == "Judo") {
        state.zkapp!.setJudoMapRoot(storage);
      } else if (args.discipline == "Karate") {
        state.zkapp!.setKarateMapRoot(storage);
      }
    });

    // set pending transaction to state
    state.transaction = transaction;
  },
  rootsVerified: async (args: { merkleStore: MerkleMapDatabase, contractRoot: Field, discipline: string }): Promise<ActionResult> => {
    const backingStoreRoot = args.merkleStore.map.getRoot();

    // verify roots match
    if (backingStoreRoot.toString() != args.contractRoot.toString()) {
      console.log("backing store root: ", backingStoreRoot.toString());
      console.log("contract root: ", args.contractRoot.toString());
      console.log("Roots do not match");

      return {
        success: false,
        message: "Roots do not match",
      };
    }

    return {
      success: true,
      message: "Roots match",
    };
  },
  add: async (args: { address: string, rank: string, discipline: string }): Promise<ActionResult> => {
    console.log("add worker", args.address, args.rank);
    let backingStore = new FirebaseBackingStore(args.discipline);
    const merkleStore = await backingStore.getMerkleMap();
    const backingStoreRoot = merkleStore.map.getRoot();
    const contractRoot = await functions.getStorageRootField({ discipline: args.discipline });
    console.log("contract root in worker add: ", contractRoot);
    // verify roots match
    const rootsVerified = await functions.rootsVerified({ merkleStore: merkleStore, contractRoot: contractRoot, discipline: args.discipline });
    if (!rootsVerified.success) return rootsVerified;

    // get student new martial artist from object in backing store
    state.pendingMartialArtist = backingStore.getMartialArtistFromDocSnap({
      id: 0,
      publicKey: args.address,
      firstName: '',
      lastName: '',
      rank: args.rank,
      verified: false,
      instructor: '',
      createdDate: '',
      modifiedDate: '',
      discipline: args.discipline,
    });

    // set student id to next id in merkle map
    state.pendingMartialArtist.id = Field(merkleStore.nextID);
    let hash = state.pendingMartialArtist.hash();

    // add student to merkle map and get witness
    merkleStore.map.set(state.pendingMartialArtist.id, hash);
    const witness = merkleStore.map.getWitness(state.pendingMartialArtist.id);
    // let contractFunction = state.addMap[args.discipline];
    // console.log("contract function: ", contractFunction);
    // create discipline specific transaction
    const transaction = await Mina.transaction(
      { sender: state.pendingMartialArtist.publicKey },
      () => {

        if (args.discipline == "BJJ") {
          state.zkapp!.addJuijiteiro(hash, state.pendingMartialArtist!.publicKey, witness, contractRoot);
        } else if (args.discipline == "Judo") {
          state.zkapp!.addJudoka(hash, state.pendingMartialArtist!.publicKey, witness, contractRoot);
        } else if (args.discipline == "Karate") {
          state.zkapp!.addKarateka(hash, state.pendingMartialArtist!.publicKey, witness, contractRoot);
        }

        //state.zkapp!.addJuijiteiro(hash, state.pendingMartialArtist!.publicKey, witness, contractRoot);
        //contractFunction(hash, state.pendingMartialArtist!.publicKey, witness, contractRoot);
      }
    );

    // add pending transaction to state
    state.transaction = transaction;
    return {
      success: true,
      message: "Transaction created",
    }
  },
  updateBackingStore: async (args: { discipline: string }): Promise<ActionResult> => {

    let backingStore = new FirebaseBackingStore(args.discipline);
    const merkleStore = await backingStore.getMerkleMap();
    const backingStoreRoot = merkleStore.map.getRoot();
    const contractRoot = await functions.getStorageRootField({ discipline: args.discipline });

    // verify roots match
    const rootsVerified = await functions.rootsVerified({ merkleStore: merkleStore, contractRoot: contractRoot, discipline: args.discipline });
    if (!rootsVerified.success) return rootsVerified;

    // update student in backing store
    backingStore.upsert(state.pendingMartialArtist!);

    return {
      success: true,
      message: "Backing store updated",
    };
  },
  promoteStudent: async (args: { studentPublicKey: string, rank: string, instructorPublicKey: string, discipline: string }) => {
    let backingStore = new FirebaseBackingStore(args.discipline);
    const merkleStore = await backingStore.getMerkleMap();
    const backingStoreRoot = merkleStore.map.getRoot();
    const contractRoot = await functions.getStorageRootField({ discipline: args.discipline });

    // verify roots match
    const rootsVerified = await functions.rootsVerified({ merkleStore: merkleStore, contractRoot: contractRoot, discipline: args.discipline });
    if (!rootsVerified.success) return rootsVerified;

    // find student and instructor in backing store
    let studentKey = PublicKey.fromBase58(args.studentPublicKey);
    let instructorKey = PublicKey.fromBase58(args.instructorPublicKey);
    state.pendingMartialArtist = await backingStore.get(studentKey);
    const instructor = await backingStore.get(instructorKey);
    const merkleMapDB = await backingStore.getMerkleMap();

    if (state.pendingMartialArtist != null && instructor != null) {

      // update student rank and instructor and verified status
      state.pendingMartialArtist.rank = CircuitString.fromString(args.rank);
      state.pendingMartialArtist.instructor = instructor.publicKey;
      state.pendingMartialArtist.verified = Bool(true);

      // update merkle map with new student hash
      merkleMapDB.map.set(state.pendingMartialArtist.id, state.pendingMartialArtist.hash());

      // get witness for student
      const witness = merkleMapDB.map.getWitness(state.pendingMartialArtist.id);

      // create discipline specific transaction
      const transaction = await Mina.transaction({ sender: instructorKey },
        () => {

          if (args.discipline == "BJJ") {
            state.zkapp!.promoteJuijiteiro(state.pendingMartialArtist!.hash(), studentKey, instructorKey, instructor.rank, witness, contractRoot);
          } else if (args.discipline == "Judo") {
            state.zkapp!.promoteJudoka(state.pendingMartialArtist!.hash(), studentKey, instructorKey, instructor.rank, witness, contractRoot);
          } else if (args.discipline == "Karate") {
            state.zkapp!.promoteKarateka(state.pendingMartialArtist!.hash(), studentKey, instructorKey, instructor.rank, witness, contractRoot);
          }
        });

      // add pending transaction to state
      state.transaction = transaction;

      return {
        success: true,
        message: "Transaction created",
      }
    } else {
      return {
        success: false,
      }
    }
  },
  proveYourRank: async (args: { studentPublicKey: string, rank: string, instructorPublicKey: string, discipline: string }) => {
    console.log("prove your rank worker", args.studentPublicKey, args.rank, args.instructorPublicKey, args.discipline);
    let backingStore = new FirebaseBackingStore(args.discipline);
    const merkleStore = await backingStore.getMerkleMap();
    const backingStoreRoot = merkleStore.map.getRoot();
    const contractRoot = await functions.getStorageRootField({ discipline: args.discipline });

    console.log("checking roots");
    // verify roots match
    const rootsVerified = await functions.rootsVerified({ merkleStore: merkleStore, contractRoot: contractRoot, discipline: args.discipline });
    if (!rootsVerified.success) return rootsVerified;
    console.log("roots verified");

    console.log("getting student and inquirer keys");
    console.log("student: ", args.instructorPublicKey);
    console.log("inquirer: ", args.studentPublicKey);
    let studentKey = PublicKey.fromBase58(args.instructorPublicKey);
    let inquirerKey = PublicKey.fromBase58(args.studentPublicKey);

    // get student existing martial artist in backing store
    console.log("getting student martial artist");
    state.pendingMartialArtist = await backingStore.get(PublicKey.fromBase58(args.instructorPublicKey));
    console.log("student martial artist: ", backingStore.getObjectFromStruct(state.pendingMartialArtist!));
    // ensure student exists
    if (state.pendingMartialArtist == null) {
      console.log("student does not exist");
      return {
        success: false,
        message: "Student does not exist",
      }
    }

    console.log("getting witness");
    // get hash and witness for student
    let hash = state.pendingMartialArtist.hash();
    const witness = merkleStore.map.getWitness(state.pendingMartialArtist.id);

    console.log("creating transaction");
    // create discipline specific transaction
    const transaction = await Mina.transaction(
      { sender: state.pendingMartialArtist!.publicKey },
      () => {

        if (args.discipline == "BJJ") {
          state.zkapp!.proveJuijiteiro(studentKey, hash, inquirerKey, witness);
        } else if (args.discipline == "Judo") {
          state.zkapp!.proveJudoka(studentKey, hash, inquirerKey, witness);
        } else if (args.discipline == "Karate") {
          state.zkapp!.proveKarateka(studentKey, hash, inquirerKey, witness);
        }
      }
    );
    console.log("transaction created");
    console.log("adding transaction to state");
    console.log("transaction: ", transaction);
    // add pending transaction to state
    state.transaction = transaction;
    return {
      success: true,
      message: "Transaction created",
    }
  },
  prove: async (args: { address: string, inquirer: string, discipline: string }): Promise<ActionResult> => {
    console.log("prove worker", args.address, args.inquirer, args.discipline);
    let backingStore = new FirebaseBackingStore(args.discipline);
    const merkleStore = await backingStore.getMerkleMap();
    const backingStoreRoot = merkleStore.map.getRoot();
    const contractRoot = await functions.getStorageRootField({ discipline: args.discipline });

    console.log("checking roots");
    // verify roots match
    const rootsVerified = await functions.rootsVerified({ merkleStore: merkleStore, contractRoot: contractRoot, discipline: args.discipline });
    if (!rootsVerified.success) return rootsVerified;
    console.log("roots verified");

    console.log("getting student and inquirer keys");
    console.log("student: ", args.address);
    console.log("inquirer: ", args.inquirer);
    let studentKey = PublicKey.fromBase58(args.address);
    let inquirerKey = PublicKey.fromBase58(args.inquirer);

    // get student existing martial artist in backing store
    console.log("getting student martial artist");
    state.pendingMartialArtist = await backingStore.get(PublicKey.fromBase58(args.address));
    console.log("student martial artist: ", backingStore.getObjectFromStruct(state.pendingMartialArtist!));
    // ensure student exists
    if (state.pendingMartialArtist == null) {
      console.log("student does not exist");
      return {
        success: false,
        message: "Student does not exist",
      }
    }

    console.log("getting witness");
    // get hash and witness for student
    let hash = state.pendingMartialArtist.hash();
    const witness = merkleStore.map.getWitness(state.pendingMartialArtist.id);

    console.log("creating transaction");
    // create discipline specific transaction
    const transaction = await Mina.transaction(
      { sender: state.pendingMartialArtist!.publicKey },
      () => {

        if (args.discipline == "BJJ") {
          state.zkapp!.proveJuijiteiro(studentKey, hash, inquirerKey, witness);
        } else if (args.discipline == "Judo") {
          state.zkapp!.proveJudoka(studentKey, hash, inquirerKey, witness);
        } else if (args.discipline == "Karate") {
          state.zkapp!.proveKarateka(studentKey, hash, inquirerKey, witness);
        }
      }
    );
    console.log("transaction created");
    console.log("adding transaction to state");
    console.log("transaction: ", transaction);
    // add pending transaction to state
    state.transaction = transaction;
    return {
      success: true,
      message: "Transaction created",
    }
  },
  revokeStudent: async (args: { studentPublicKey: string, instructorPublicKey: string, discipline: string }) => {
    console.log("revoke worker", args.studentPublicKey, args.instructorPublicKey, args.discipline);
    let backingStore = new FirebaseBackingStore(args.discipline);
    const merkleStore = await backingStore.getMerkleMap();
    const backingStoreRoot = merkleStore.map.getRoot();
    const contractRoot = await functions.getStorageRootField({ discipline: args.discipline });

    // verify roots match
    const rootsVerified = await functions.rootsVerified({ merkleStore: merkleStore, contractRoot: contractRoot, discipline: args.discipline });
    if (!rootsVerified.success) return rootsVerified;

    // find student and instructor in backing store
    let studentKey = PublicKey.fromBase58(args.studentPublicKey);
    let instructorKey = PublicKey.fromBase58(args.instructorPublicKey);
    state.pendingMartialArtist = await backingStore.get(studentKey);
    const instructor = await backingStore.get(instructorKey);
    const merkleMapDB = await backingStore.getMerkleMap();

    if (state.pendingMartialArtist != null && instructor != null) {

      // update student verified status
      state.pendingMartialArtist.verified = Bool(false);

      // update merkle map with new student hash
      let hash = state.pendingMartialArtist.hash();
      merkleMapDB.map.set(state.pendingMartialArtist.id, hash);

      // get witness for student
      const witness = merkleMapDB.map.getWitness(state.pendingMartialArtist.id);

      // create discipline specific transaction
      const transaction = await Mina.transaction({ sender: instructorKey },
        () => {

          if (args.discipline == "BJJ") {
            state.zkapp!.revokeJuijiteiro(
              hash,
              studentKey,
              state.pendingMartialArtist!.instructor,
              instructor.publicKey,
              instructor.rank,
              witness,
              contractRoot
            );
          } else if (args.discipline == "Judo") {
            state.zkapp!.promoteJudoka(state.pendingMartialArtist!.hash(), studentKey, instructorKey, instructor.rank, witness, contractRoot);
          } else if (args.discipline == "Karate") {
            state.zkapp!.promoteKarateka(state.pendingMartialArtist!.hash(), studentKey, instructorKey, instructor.rank, witness, contractRoot);
          }
        });

      // add pending transaction to state
      state.transaction = transaction;

      return {
        success: true,
        message: "Transaction created",
      }
    } else {
      return {
        success: false,
      }
    }
  },
  proveUpdateTransaction: async (args: {}) => {
    await state.transaction!.prove();
  },
  getTransactionJSON: async (args: {}) => {
    return state.transaction!.toJSON();
  },
};

// ---------------------------------------------------------------------------------------

export type WorkerFunctions = keyof typeof functions;

export type ZkappWorkerRequest = {
  id: number,
  fn: WorkerFunctions,
  args: any
}

export type ZkappWorkerReponse = {
  id: number,
  data: any
}
if (process.browser) {
  addEventListener('message', async (event: MessageEvent<ZkappWorkerRequest>) => {
    const returnData = await functions[event.data.fn](event.data.args);

    const message: ZkappWorkerReponse = {
      id: event.data.id,
      data: returnData,
    }
    postMessage(message)
  });
}
