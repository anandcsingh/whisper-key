import {
  Mina,
  isReady,
  PublicKey,
  PrivateKey,
  Field,
  fetchAccount,
  MerkleMapWitness,
  CircuitString,
} from 'snarkyjs'

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// ---------------------------------------------------------------------------------------

import type { ProveBjjRank } from '../../../../../contracts/src/ProveBjjRank';
import { MartialArtistRepository } from '../../../../../contracts/src/models/MartialArtistRepository';
import { FirebaseBackingStore } from '../../../../../contracts/build/src/models/firebase/FirebaseBackingStore';
import { MartialArtist } from '../../../../../contracts/build/src/models/MartialArtist';

const state = {
  zkapp: null as null | ProveBjjRank,
  transaction: null as null | Transaction,
  ProveBjjRank: null as null | typeof ProveBjjRank
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

    const { ProveBjjRank } = await import('../../../../../contracts/build/src/ProveBjjRank.js');
    state.ProveBjjRank = ProveBjjRank;
    console.log("contract ProveBjjRank loaded");
  },
  compileContract: async (args: {}) => {
    console.log("compiling ProveBjjRank contract");
    state.ProveBjjRank!.compile();
    console.log("contract ProveBjjRank compiled");
  },
  fetchAccount: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    return await fetchAccount({ publicKey });
  },
  initZkappInstance: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    state.zkapp = new state.ProveBjjRank!(publicKey);
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
  proveRank: async (args: { prover: string,
    inquirer: string,
    rank: string,}) => { 
    let backingStore = new FirebaseBackingStore("BJJ");
    let proverKey = PublicKey.fromBase58(args.prover);
    let inquirerKey = PublicKey.fromBase58(args.inquirer);
    const student = await functions.get(proverKey);;
    const merkleMapDB = await backingStore.getMerkleMap();
    const currentRoot = merkleMapDB.map.getRoot();

    if (student != null) {

      const transaction = await Mina.transaction(
        { sender: proverKey },
        () => {
        state.zkapp!.proveRank(proverKey, inquirerKey, CircuitString.fromString(args.rank), currentRoot);
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
  updateBackingStore: async (args: { prover: string,
    inquirer: string,
    rank: string,}) => { 
   
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
