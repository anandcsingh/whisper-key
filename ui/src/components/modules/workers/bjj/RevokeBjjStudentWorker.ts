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

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// ---------------------------------------------------------------------------------------

import type { RevokeBjjStudent } from '../../../../../contracts/src/RevokeBjjStudent';
import { MartialArtistRepository } from '../../../../../contracts/src/models/MartialArtistRepository';
import { FirebaseBackingStore } from '../../../../../contracts/build/src/models/firebase/FirebaseBackingStore';
import { MartialArtist } from '../../../../../contracts/build/src/models/MartialArtist';

const state = {
  zkapp: null as null | RevokeBjjStudent,
  transaction: null as null | Transaction,
  RevokeBjjStudent: null as null | typeof RevokeBjjStudent
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

    const { RevokeBjjStudent } = await import('../../../../../contracts/build/src/RevokeBjjStudent.js');
    state.RevokeBjjStudent = RevokeBjjStudent;
    console.log("contract RevokeBjjStudent loaded");
  },
  compileContract: async (args: {}) => {
    console.log("compiling RevokeBjjStudent contract");
    state.RevokeBjjStudent!.compile();
    console.log("contract RevokeBjjStudent compiled");
  },
  fetchAccount: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    return await fetchAccount({ publicKey });
  },
  initZkappInstance: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    state.zkapp = new state.RevokeBjjStudent!(publicKey);
  },
  getStorageRoot: async (args: {}) => {
    const currentNum = await state.zkapp!.mapRoot.get();
    return JSON.stringify(currentNum.toJSON());
  },
  setStorageRoot: async (args: { root: string }) => {
    console.log("setting storage root from worker");
    let storage = Field(args.root);
    const transaction = await Mina.transaction(() => {
      state.zkapp!.setMapRoot(storage);
    }
    );
    state.transaction = transaction;
    console.log("storage root set from worker");
  },
  revokeStudent: async (args: { studentPublicKey: string, instructorPublicKey: string }) => { 
    let backingStore = new FirebaseBackingStore("BJJ");
    let studentKey = PublicKey.fromBase58(args.studentPublicKey);
    let instructorKey = PublicKey.fromBase58(args.instructorPublicKey);
    const student = await functions.get(studentKey);
    const instructor = await functions.get(instructorKey);
    const merkleMapDB = await backingStore.getMerkleMap();
    const currentRoot = merkleMapDB.map.getRoot();

    if (student != null && instructor != null) {
      const witness = merkleMapDB.map.getWitness(student.id);

      student.verified = Bool(false);

      const transaction = await Mina.transaction(
        { sender: instructorKey },
        () => {
        state.zkapp!.revokeStudent(student.hash(), studentKey, instructorKey, instructor.rank, witness, currentRoot);
      }
      );
  
      state.transaction = transaction;
    }
  },
  get: async (publicKey: PublicKey) => {
    let backingStore = new FirebaseBackingStore("BJJ");
    const ma = await backingStore.get(publicKey);
    if (ma) {
        return ma;
      } else {
        return undefined;
      }
  },
  updateBackingStore: async (args: { studentPublicKey: string, instructorPublicKey: string }) => { 
    let studentKey = PublicKey.fromBase58(args.studentPublicKey);
    const student = await functions.get(studentKey);
    student!.verified = Bool(false);

    let backingStore = new FirebaseBackingStore("BJJ");
    backingStore.upsert(student!);
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
