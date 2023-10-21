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
} from 'o1js'
import { NewLineKind } from 'typescript';

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// ---------------------------------------------------------------------------------------


export default class ActionResult {
  success: boolean;
  message: string;
  constructor(success: boolean, message: string) {
    this.success = success;
    this.message = message;
  }
}

const state = {
  zkapp: null as null,
  transaction: null as null | Transaction,
  AllMartialArtsEvents: null as null,
  pendingMartialArtist: null as null | undefined,
}

const localBlockchainSetup = {
  useLocal: true,
  localBlockchain: null as null | any,
}


// ---------------------------------------------------------------------------------------

const functions = {
  loado1js: async (args: {}) => {
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

    
  },
  compileContract: async (args: {}) => {
    

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

    
      console.log("zkapp AllMartialArtsEvents instance initialized locally");

      
  },
  getStorageRootField: async (args: { discipline: string }) => {
    console.log("getting storage root for discipline: ", args.discipline);
    
  },
  getStorageRoot: async (args: { discipline: string }) => {
    return JSON.stringify(await functions.getStorageRootField({ discipline: args.discipline }));
  },
  setStorageRoot: async (args: { root: string, discipline: string }) => {
    let storage = Field(args.root);

    // create storage root transaction for a discipline
    
  },
  add: async (args: { address: string, rank: string, discipline: string }): Promise<ActionResult> => {
    console.log("add worker", args.address, args.rank);
    return new ActionResult(true, "add worker");
  },
  updateBackingStore: async (args: { discipline: string }): Promise<ActionResult> => {
    return new ActionResult(true, "add worker");

  },
  promoteStudent: async (args: { studentPublicKey: string, rank: string, instructorPublicKey: string, discipline: string }) => {
    
  },
  proveYourRank: async (args: { studentPublicKey: string, rank: string, instructorPublicKey: string, discipline: string }) => {
  
  },
  prove: async (args: { address: string, inquirer: string, discipline: string }): Promise<ActionResult> => {
    return new ActionResult(true, "add worker");
   
  },
  revokeStudent: async (args: { studentPublicKey: string, instructorPublicKey: string, discipline: string }) => {
   
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
