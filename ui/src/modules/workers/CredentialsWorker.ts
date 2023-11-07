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
import { CredentialProxy } from '../PassportContract';
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
  transaction: null as null | Transaction,
  credentialProxy: null as null | any,
  pendingEntity: null as null | undefined | any,
  credentialsRepository: null as null | any,
  mentatStore: null as null | any,
  credentialName: null as null | string,
  owner: null as null | PublicKey,
}

const localBlockchainSetup = {
  useLocal: true,
  localBlockchain: null as null | any,
  deployer: null as null | PrivateKey,
  issuer: null as null | PrivateKey,
  owner: null as null | PrivateKey,
}


// ---------------------------------------------------------------------------------------

const functions = {
  loado1js: async (args: {}) => {
    await isReady;
  },
  setupActiveInstance: async (args: {}) => {
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
      let senderPrivate = localBlockchainSetup.deployer = PrivateKey.fromBase58('EKFUES7YfgYm38njcBHzxyU6RPZQdZnfThcMzLrHL9LjyxJKfXzY');

      let senderPublic = senderPrivate.toPublicKey();

      let issuerPrivate = localBlockchainSetup.issuer = PrivateKey.fromBase58('EKFZWMtRmcQELaJvqcEyEEJqh874B3PndA8kpxSst6AiHtErn7Xw'); //B62qqzMHkbogU9gnQ3LjrKomimsXYt4qHcXc8Cw4aX7tok8DjuDsAzx
      let issuerPublic = issuerPrivate.toPublicKey();

      let ownerPrivate = localBlockchainSetup.owner = PrivateKey.fromBase58("EKDzuEofrhNa2iSHS7Zq19fy6p7cX3FYrQ2pQ99uab1JjM4zLwA4");// B62qk5mbK8NfRVXEw2ubyD2QbuU7WWhevE42yHz9rxgwjt21BtEa6Jg
      let ownerPublic = ownerPrivate.toPublicKey();
      localBlockchainSetup.localBlockchain.addAccount(senderPublic, '10_000_000_000');
      localBlockchainSetup.localBlockchain.addAccount(issuerPublic, '10_000_000_000');
      localBlockchainSetup.localBlockchain.addAccount(ownerPublic, '10_000_000_000');

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
  setupContract: async (args: { name: string, owner: PublicKey, useProofs: boolean }) => {

    //const { CredentialProxy } = await import(/* webpackIgnore: true */ `../../../public/credentials/${args.name}Contract.js`);
    const path = `../../../../credentials/PassportContract.js`;
    //const { CredentialProxy } = await import(/* webpackIgnore: true */path);

   
    // lookup address from credentials repo
    const contractAddress = PublicKey.fromBase58("B62qobwMt5468aAB64Z55ADbBQy8NKVAYnwoWdWGnBKvwEsMX5Ncegt");//PublicKey.empty();// pull from credential repo
    state.credentialProxy = new CredentialProxy(contractAddress, args.name, args.owner, args.useProofs);
    state.credentialName = args.name;
    state.owner = args.owner;
    state.credentialsRepository = {};
    console.log("contract setup");
    console.log("contract root:", JSON.stringify(await state.credentialProxy.getStorageRoot()))
    if (!args.useProofs) {
      //state.credentialProxy.deployLocal(localBlockchainSetup);
    }

  },
  getStorageRootField: async () => {
    return state.credentialProxy.getStorageRoot();
  },
  getStorageRoot: async () => {
    return JSON.stringify(await functions.getStorageRootField());
  },
  setStorageRoot: async (args: { root: string }) => {
    let storage = Field(args.root);
    const transaction = state.credentialProxy.setStorageRoot(storage);
    state.transaction = transaction;
  },
  rootsVerified: async (args: { merkleStore: any, contractRoot: Field }): Promise<ActionResult> => {
    const backingStoreRoot = args.merkleStore.map.getRoot();

    // verify roots match
    if (backingStoreRoot.toString() != args.contractRoot.toString()) {
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

  issueCredential: async (args: { credential: any }): Promise<ActionResult> => {
    let backingStore = state.mentatStore;
    const merkleStore = await backingStore.getMerkleMap();
    const contractRoot = await functions.getStorageRootField();

    const rootsVerified = await functions.rootsVerified({ merkleStore: merkleStore, contractRoot: contractRoot });
    if (!rootsVerified.success) return rootsVerified;

    const result = state.credentialProxy.issueCredential(args.credential);
    state.transaction = result.transaction;
    state.pendingEntity = result.pendingEntity;
    return {
      success: true,
      message: "Transaction created",
    }
  },
  updateBackingStore: async (args: {}): Promise<ActionResult> => {

    let backingStore = state.mentatStore;
    const merkleStore = await backingStore.getMerkleMap();
    const backingStoreRoot = merkleStore.map.getRoot();
    const contractRoot = await functions.getStorageRootField();

    // verify roots match
    const rootsVerified = await functions.rootsVerified({ merkleStore: merkleStore, contractRoot: contractRoot });
    if (!rootsVerified.success) return rootsVerified;

    // update student in backing store
    backingStore.upsert(state.pendingEntity!);

    return {
      success: true,
      message: "Backing store updated",
    };
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
