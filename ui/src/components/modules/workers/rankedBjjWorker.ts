import {
  Mina,
  isReady,
  PublicKey,
  PrivateKey,
  Field,
  fetchAccount,
} from 'o1js'

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// ---------------------------------------------------------------------------------------

//import type { RankProof } from '../../contracts/src/RankProof';
import type { RankProof } from '../../../../contracts/src/contracts/RankProof';
import type { ProofOfBjjRankNoParent } from '../../../../contracts/src/ProofOfBjjRankNoParent';
import type { AddBjjRank } from '../../../../contracts/src/AddBjjRank';
import { MartialArtistRepository } from '../../../../contracts/src/models/MartialArtistRepository';

const state = {
  Ranked: null as null | typeof RankProof,
  zkapp: null as null | AddBjjRank,
  transaction: null as null | Transaction,
  AddBjjRank: null as null | typeof AddBjjRank
}

// ---------------------------------------------------------------------------------------

const functions = {
  loado1js: async (args: {}) => {
    await isReady;
  },
  setActiveInstanceToBerkeley: async (args: {}) => {
    const Berkeley = Mina.BerkeleyQANet(
      "https://proxy.berkeley.minaexplorer.com/graphql"
    );
    Mina.setActiveInstance(Berkeley);
  },
  loadContract: async (args: {}) => {
   
    const { AddBjjRank } = await import('../../../../contracts/build/src/AddBjjRank.js');  
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
