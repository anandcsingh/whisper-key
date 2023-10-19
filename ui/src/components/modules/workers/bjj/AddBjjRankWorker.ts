import {
  Mina,
  isReady,
  PublicKey,
  PrivateKey,
  Field,
  fetchAccount,
  MerkleMapWitness,
} from 'snarkyjs'

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// ---------------------------------------------------------------------------------------

import type { AddBjjRank } from '../../../../../contracts/src/AddBjjRank';
import { MartialArtistRepository } from '../../../../../contracts/src/models/MartialArtistRepository';
import { FirebaseBackingStore } from '../../../../../contracts/build/src/models/firebase/FirebaseBackingStore';

const state = {
  zkapp: null as null | AddBjjRank,
  transaction: null as null | Transaction,
  AddBjjRank: null as null | typeof AddBjjRank
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

    const { AddBjjRank } = await import('../../../../../contracts/build/src/AddBjjRank.js');
    state.AddBjjRank = AddBjjRank;
    console.log("contract AddBjjRank loaded");
  },
  compileContract: async (args: {}) => {
    console.log("compiling AddBjjRank contract");
    state.AddBjjRank!.compile();
    console.log("contract AddBjjRank compiled");
  },
  fetchAccount: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    return await fetchAccount({ publicKey });
  },
  initZkappInstance: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    state.zkapp = new state.AddBjjRank!(publicKey);
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
  addPractitioner: async (args: { studentHash: string, studentPublicKey: PublicKey, witness: MerkleMapWitness }) => {
    console.log("addPractitioner from worker");
    // let hash = Field(args.studentHash);
    // const transaction = await Mina.transaction(() => {
    //   state.zkapp!.addPractitioner(hash, args.studentPublicKey, args.witness);
    // }
    // );
    // console.log("addPractitioner transaction created");
    // state.transaction = transaction;
  },
  add: async (args: { address: string, rank: string }) => {
    console.log("creating worker transaction");
    let backingStore = new FirebaseBackingStore("BJJ");
    const merkleStore = await backingStore.getMerkleMap();
    const currentRoot = merkleStore.map.getRoot();
    let martialArtist = backingStore.getMartialArtistFromDocSnap({
      id: 0,
      publicKey: args.address,
      firstName: '',
      lastName: '',
      rank: args.rank,
      verified: false,
      instructor: '',
      createdDate: '',
      modifiedDate: '',
      discipline: "BJJ",
    });
    martialArtist.id = Field(merkleStore.nextID);
    let hash = martialArtist.hash();
    merkleStore.map.set(martialArtist.id, hash);
    const witness = merkleStore.map.getWitness(martialArtist.id);
    console.log("creating worker transaction");
    console.log("address: ", args.address);
    const transaction = await Mina.transaction(
      { sender: martialArtist.publicKey },
      () => {
      state.zkapp!.addPractitioner(hash, martialArtist.publicKey, witness, currentRoot);
    }
    );

    state.transaction = transaction;
  },
  updateBackingStore: async (args: { address: string, rank: string }) => {
    let backingStore = new FirebaseBackingStore("BJJ");
    const merkleStore = await backingStore.getMerkleMap();
    let martialArtist = backingStore.getMartialArtistFromDocSnap({
      id: 0,
      publicKey: args.address,
      firstName: '',
      lastName: '',
      rank: args.rank,
      verified: false,
      instructor: '',
      createdDate: '',
      modifiedDate: '',
      discipline: "BJJ",
    });
    martialArtist.id = Field(merkleStore.nextID);
    backingStore.upsert(martialArtist);
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
