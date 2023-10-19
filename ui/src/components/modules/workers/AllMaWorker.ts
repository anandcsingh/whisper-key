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
} from 'snarkyjs'
import { BackingStore, MerkleMapDatabase } from '../../../../contracts/build/src/models/MartialArtistRepository.js';


type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// ---------------------------------------------------------------------------------------

import type { AllMartialArtsEvents } from '../../../../contracts/src/AllMartialArtsEvents';
import { MartialArtistRepository } from '../../../../contracts/src/models/MartialArtistRepository';
import { FirebaseBackingStore } from '../../../../contracts/build/src/models/firebase/FirebaseBackingStore';
import { MartialArtist } from '../../../../contracts/build/src/models/MartialArtist';

const state = {
  zkapp: null as null | AllMartialArtsEvents,
  transaction: null as null | Transaction,
  AllMartialArtsEvents: null as null | typeof AllMartialArtsEvents,
  pendingMartialArtist: null as null | MartialArtist,
}

// ---------------------------------------------------------------------------------------

const functions = {
  loadSnarkyJS: async (args: {}) => {
    await isReady;
  },
  setActiveInstanceToBerkeley: async (args: {}) => {
    const Berkeley = Mina.Network(
      'https://proxy.berkeley.minaexplorer.com/graphql'
    );
    console.log('Berkeley Instance Created');
    Mina.setActiveInstance(Berkeley);
  },
  loadContract: async (args: {}) => {

    const { AllMartialArtsEvents } = await import('../../../../contracts/build/src/AllMartialArtsEvents.js');
    state.AllMartialArtsEvents = AllMartialArtsEvents;
    console.log("contract AllMartialArts loaded");
  },
  compileContract: async (args: {}) => {
    console.log("compiling AllMartialArts contract");
    state.AllMartialArtsEvents!.compile();
    console.log("contract AllMartialArts compiled");
  },
  fetchAccount: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    return await fetchAccount({ publicKey });
  },
  initZkappInstance: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    state.zkapp = new state.AllMartialArtsEvents!(publicKey);
  },
  getBjjStorageRoot: async (args: {}) => {
    const currentNum = await state.zkapp!.bjjMapRoot.get();
    return JSON.stringify(currentNum.toJSON());
  },
  setBjjStorageRoot: async (args: { root: string }) => {
    console.log("setting storage root from worker");
    let storage = Field(args.root);
    const transaction = await Mina.transaction(() => {
      state.zkapp!.setbBjjMapRoot(storage);
    }
    );
    state.transaction = transaction;
    console.log("storage root set from worker");
  },
  addBjj: async (args: { address: string, rank: string }) => {
    console.log("creating worker transaction");
    let discipline = "BJJ";
    let backingStore = new FirebaseBackingStore(discipline);
    const merkleStore = await backingStore.getMerkleMap();
    const currentRoot = merkleStore.map.getRoot();
    console.log("currentRoot addbjj: ", currentRoot.toString());
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
      discipline: discipline,
    });
    state.pendingMartialArtist.id = Field(merkleStore.nextID);
    console.log("martialArtist.id: ", state.pendingMartialArtist.id.toBigInt().toString());
    let hash = state.pendingMartialArtist.hash();
    console.log("hash: ", hash.toString());
    merkleStore.map.set(state.pendingMartialArtist.id, hash);
    const witness = merkleStore.map.getWitness(state.pendingMartialArtist.id);
    const [newRoot, _] = witness.computeRootAndKey(hash);
    console.log("bjj add root: ", newRoot.toString());
    const transaction = await Mina.transaction(
      { sender: state.pendingMartialArtist.publicKey },
      () => {
      state.zkapp!.addJuijiteiro(hash, state.pendingMartialArtist!.publicKey, witness, currentRoot);
    }
    );

    state.transaction = transaction;
  },
  updateBjjBackingStore: async (args: { }) => {
    console.log("update backing store");
    let discipline = "BJJ";
    let backingStore = new FirebaseBackingStore(discipline);
    const merkleStore = await backingStore.getMerkleMap();
    const currentRoot = merkleStore.map.getRoot();
    console.log("currentRoot updatebjj: ", currentRoot.toString());
    
    console.log("martialArtist.id: ", state.pendingMartialArtist!.id.toString());
    let hash = state.pendingMartialArtist!.hash();
    console.log("hash: ", hash.toString());
    
    merkleStore.map.set(state.pendingMartialArtist!.id, hash);
    const witness = merkleStore.map.getWitness(state.pendingMartialArtist!.id);
    const [newRoot, _] = witness.computeRootAndKey(hash);
    console.log("bjj update root: ", newRoot.toString());
    backingStore.upsert(state.pendingMartialArtist!);
  },
  getJudoStorageRoot: async (args: {}) => {
    const currentNum = await state.zkapp!.judoMapRoot.get();
    return JSON.stringify(currentNum.toJSON());
  },
  setJudoStorageRoot: async (args: { root: string }) => {
    console.log("setting storage root from worker");
    let storage = Field(args.root);
    const transaction = await Mina.transaction(() => {
      state.zkapp!.setJudoMapRoot(storage);
    }
    );
    state.transaction = transaction;
    console.log("storage root set from worker");
  },
  addJudo: async (args: { address: string, rank: string }) => {
    let discipline = "Judo";
    let backingStore = new FirebaseBackingStore(discipline);
    const merkleStore = await backingStore.getMerkleMap();
    const currentRoot = merkleStore.map.getRoot();
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
      discipline: discipline,
    });
    state.pendingMartialArtist.id = Field(merkleStore.nextID);
    let hash = state.pendingMartialArtist.hash();
    merkleStore.map.set(state.pendingMartialArtist.id, hash);
    const witness = merkleStore.map.getWitness(state.pendingMartialArtist.id);
    console.log("creating worker transaction");
    console.log("address: ", args.address);
    const transaction = await Mina.transaction(
      { sender: state.pendingMartialArtist.publicKey },
      () => {
      state.zkapp!.addJudoka(hash, state.pendingMartialArtist!.publicKey, witness, currentRoot);
    }
    );

    state.transaction = transaction;
  },
  updateJudoBackingStore: async (args: {  }) => {
    let discipline = "Judo";
    let backingStore = new FirebaseBackingStore(discipline);
    const merkleStore = await backingStore.getMerkleMap();
    
    backingStore.upsert(state.pendingMartialArtist!);
  },
  getKarateStorageRoot: async (args: {}) => {
    const currentNum = await state.zkapp!.karateMapRoot.get();
    return JSON.stringify(currentNum.toJSON());
  },
  setKarateStorageRoot: async (args: { root: string }) => {
    console.log("setting storage root from worker");
    let storage = Field(args.root);
    const transaction = await Mina.transaction(() => {
      state.zkapp!.setKarateMapRoot(storage);
    }
    );
    state.transaction = transaction;
    console.log("storage root set from worker");
  },
  addKarate: async (args: { address: string, rank: string }) => {
    let discipline = "Karate";
    let backingStore = new FirebaseBackingStore(discipline);
    const merkleStore = await backingStore.getMerkleMap();
    const currentRoot = merkleStore.map.getRoot();
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
      discipline: discipline,
    });
    state.pendingMartialArtist.id = Field(merkleStore.nextID);
    let hash = state.pendingMartialArtist.hash();
    merkleStore.map.set(state.pendingMartialArtist.id, hash);
    const witness = merkleStore.map.getWitness(state.pendingMartialArtist.id);
    console.log("creating worker transaction");
    console.log("address: ", args.address);
    const transaction = await Mina.transaction(
      { sender: state.pendingMartialArtist.publicKey },
      () => {
      state.zkapp!.addKarateka(hash, state.pendingMartialArtist!.publicKey, witness, currentRoot);
    }
    );

    state.transaction = transaction;
  },
  updateKarateBackingStore: async (args: {  }) => {
    let discipline = "Karate";
    let backingStore = new FirebaseBackingStore(discipline);
    const merkleStore = await backingStore.getMerkleMap();
    
    backingStore.upsert(state.pendingMartialArtist!);
  },
  promoteBjjStudent: async (args: { studentPublicKey: string, rank: string, instructorPublicKey: string }) => { 
    let discipline = "BJJ";
    let backingStore = new FirebaseBackingStore(discipline);
    let studentKey = PublicKey.fromBase58(args.studentPublicKey);

    let instructorKey = PublicKey.fromBase58(args.instructorPublicKey);
    state.pendingMartialArtist = await functions.get( {publicKey: studentKey, backingStore: backingStore });
    const instructor = await functions.get({publicKey: instructorKey, backingStore: backingStore });
    const merkleMapDB = await backingStore.getMerkleMap();
    const currentRoot = merkleMapDB.map.getRoot();
    if (state.pendingMartialArtist != null && instructor != null) {
      const witness = merkleMapDB.map.getWitness(state.pendingMartialArtist.id);

      state.pendingMartialArtist.rank = CircuitString.fromString(args.rank);
      state.pendingMartialArtist.instructor = instructor.publicKey;
      state.pendingMartialArtist.verified = Bool(true);
      
      console.log("creating worker transaction");
      console.log("student hash: ", state.pendingMartialArtist.hash().toString());
      console.log("Student Key: ", studentKey.toBase58())
      console.log("Instructor Key: ", instructorKey.toBase58());
      console.log("Instructor Rank: ", instructor.rank.toString());
      const transaction = await Mina.transaction({ sender: instructorKey },
        () => {
        state.zkapp!.promoteJuijiteiro(state.pendingMartialArtist!.hash(), studentKey, instructorKey, instructor.rank, witness, currentRoot);
      }
      );
      console.log("transaction created");
      state.transaction = transaction;
    }
  },
  promoteJudoStudent: async (args: { studentPublicKey: string, rank: string, instructorPublicKey: string }) => { 
    let discipline = "Judo";
    let backingStore = new FirebaseBackingStore(discipline);
    let studentKey = PublicKey.fromBase58(args.studentPublicKey);

    let instructorKey = PublicKey.fromBase58(args.instructorPublicKey);
    state.pendingMartialArtist = await functions.get( {publicKey: studentKey, backingStore: backingStore });
    const instructor = await functions.get({publicKey: instructorKey, backingStore: backingStore });
    const merkleMapDB = await backingStore.getMerkleMap();
    const currentRoot = merkleMapDB.map.getRoot();
    if (state.pendingMartialArtist != null && instructor != null) {
      const witness = merkleMapDB.map.getWitness(state.pendingMartialArtist.id);

      state.pendingMartialArtist.rank = CircuitString.fromString(args.rank);
      state.pendingMartialArtist.instructor = instructor.publicKey;
      state.pendingMartialArtist.verified = Bool(true);
      
      console.log("creating worker transaction");
      console.log("student hash: ", state.pendingMartialArtist.hash().toString());
      console.log("Student Key: ", studentKey.toBase58())
      console.log("Instructor Key: ", instructorKey.toBase58());
      console.log("Instructor Rank: ", instructor.rank.toString());
      const transaction = await Mina.transaction({ sender: instructorKey },
        () => {
        state.zkapp!.promoteJudoka(state.pendingMartialArtist!.hash(), studentKey, instructorKey, instructor.rank, witness, currentRoot);
      }
      );
      console.log("transaction created");
      state.transaction = transaction;
    }
  },
  promoteKarateStudent: async (args: { studentPublicKey: string, rank: string, instructorPublicKey: string }) => { 
    let discipline = "Karate";
    let backingStore = new FirebaseBackingStore(discipline);
    let studentKey = PublicKey.fromBase58(args.studentPublicKey);

    let instructorKey = PublicKey.fromBase58(args.instructorPublicKey);
    state.pendingMartialArtist = await functions.get( {publicKey: studentKey, backingStore: backingStore });
    const instructor = await functions.get({publicKey: instructorKey, backingStore: backingStore });
    const merkleMapDB = await backingStore.getMerkleMap();
    const currentRoot = merkleMapDB.map.getRoot();
    if (state.pendingMartialArtist != null && instructor != null) {
      const witness = merkleMapDB.map.getWitness(state.pendingMartialArtist.id);

      state.pendingMartialArtist.rank = CircuitString.fromString(args.rank);
      state.pendingMartialArtist.instructor = instructor.publicKey;
      state.pendingMartialArtist.verified = Bool(true);
      
      console.log("creating worker transaction");
      console.log("student hash: ", state.pendingMartialArtist.hash().toString());
      console.log("Student Key: ", studentKey.toBase58())
      console.log("Instructor Key: ", instructorKey.toBase58());
      console.log("Instructor Rank: ", instructor.rank.toString());
      const transaction = await Mina.transaction({ sender: instructorKey },
        () => {
        state.zkapp!.promoteKarateka(state.pendingMartialArtist!.hash(), studentKey, instructorKey, instructor.rank, witness, currentRoot);
      }
      );
      console.log("transaction created");
      state.transaction = transaction;
    }
  },
  get: async (args: {publicKey: PublicKey, backingStore: FirebaseBackingStore }) => {
    const ma = await args.backingStore.get(args.publicKey);
    if (ma) {
        return ma;
      } else {
        return null;
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
