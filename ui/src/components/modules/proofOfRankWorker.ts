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
  MerkleWitness,
  MerkleMap,
} from 'o1js'

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// ---------------------------------------------------------------------------------------

import type { ProofOfRank } from '../../../contracts/src/ProofOfRank';
import type { ProofOfBjjRankNoParent } from '../../../contracts/src/ProofOfBjjRankNoParent';
import type { ProofOfJudoRankNoParent } from '../../../contracts/src/ProofOfJudoRankNoParent';
import type { ProofOfKarateRankNoParent } from '../../../contracts/src/ProofOfKarateRankNoParent';
import { MartialArtist } from '../../../contracts/src/models/MartialArtist';
import { stat } from 'fs';

const state = {
  proofOfRank: null as null | typeof ProofOfRank,
  zkapp: null as null | ProofOfRank,
  transaction: null as null | Transaction,
  zkapps: null as null | Map<string, ProofOfRank>,
  proofOfRanks: null as null | Map<string, typeof ProofOfRank>,
}

const Disciplines = {
  Karate: 'Karate',
  BJJ: 'BJJ',
  Judo: 'Judo',
};

const zkAppAddresses = new Map<string, PublicKey>([
  [Disciplines.BJJ, PublicKey.fromBase58("B62qqdeMFTd2WrS2WF75eBjFJsboTGJ4GmQZu7gPRHjwLqdKHiUDH7Q")],
  [Disciplines.Judo, PublicKey.fromBase58("B62qqr4u86qAkX3fqozshTf5FyCnYVQcRDNU9BfRc9oxMvoUME62CEv")],
  [Disciplines.Karate, PublicKey.fromBase58("B62qrXFZvymSuAMLfUiv31SV5Whj4FaGG6ozykhBg8zZbVp3dVWgCQf")]
]);

const getZkApp = (disciple: string) => {
  return state.zkapps!.get(disciple)!;
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
    const { ProofOfRank } = await import('../../../contracts/build/src/ProofOfRank') //await import('../../../contracts/build/src/contracts/ProofOfRank.js');
    const { ProofOfBjjRankNoParent } = await import('../../../contracts/build/src/ProofOfBjjRankNoParent');
    const { ProofOfJudoRankNoParent } = await import('../../../contracts/build/src/ProofOfJudoRankNoParent');
    const { ProofOfKarateRankNoParent } = await import('../../../contracts/build/src/ProofOfKarateRankNoParent'); 
    state.proofOfRank = ProofOfRank;
    state.proofOfRanks = new Map<string, typeof ProofOfRank>();
    state.proofOfRanks.set(Disciplines.BJJ, ProofOfBjjRankNoParent);
    state.proofOfRanks.set(Disciplines.Judo, ProofOfJudoRankNoParent);
    state.proofOfRanks.set(Disciplines.Karate, ProofOfKarateRankNoParent);
  },
  compileContract: async (args: {}) => {
    console.log('compiling contract');
    console.log('contracts count: ', state.proofOfRanks!.size);
    // iterate over state.proofofranks
    for (let [key, value] of state.proofOfRanks!) {
      console.log('compiling contract: ', key, value);
      await value.compile();
      console.log('contract compiled: ', key, value);
    }

    // state.proofOfRanks!.forEach(async (contract) => {
    //   await contract.compile();
    //     console.log('next contract compiled');
    // });
  },
  fetchZkAppAccount: async (args: { discipline: string }) => {
    const publicKey = zkAppAddresses.get(args.discipline)!;
    return await fetchAccount({ publicKey });
  },
  reFetchZkApps: async (args: { }) => {
    zkAppAddresses.forEach(async (publicKey, discipline) => {
    await fetchAccount({ publicKey });
    });
  },
  fetchAccount: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    return await fetchAccount({ publicKey });
  },
  initZkappInstance: async (args: { }) => {

    state.zkapps = new Map<string, ProofOfRank>();
    state.zkapps.set(Disciplines.BJJ, new (state.proofOfRanks!.get(Disciplines.BJJ)! as typeof ProofOfBjjRankNoParent)(zkAppAddresses.get(Disciplines.BJJ)!));
    state.zkapps.set(Disciplines.Judo, new (state.proofOfRanks!.get(Disciplines.Judo)! as typeof ProofOfJudoRankNoParent)(zkAppAddresses.get(Disciplines.Judo)!));
    state.zkapps.set(Disciplines.Karate, new (state.proofOfRanks!.get(Disciplines.Karate)! as typeof ProofOfKarateRankNoParent)(zkAppAddresses.get(Disciplines.Karate)!));
  },
  getStorageRoot: async (args: {discipline: string}) => {
    const root = await getZkApp(args.discipline)!.mapRoot.get();
    return JSON.stringify(root.toJSON());
  },
  setStorageRoot: async (args: { root: Field, discipline: string }) => {
    const transaction = await Mina.transaction(() => {
      getZkApp(args.discipline)!.setMapRoot(args.root);
    }
    );
    state.transaction = transaction;
  },
  add: async(args: {ma: any}) => {
    
  },
  addPractitionerTransaction: async (args: { martialArtist: MartialArtist, witness: MerkleMapWitness, currentRoot: Field }) => {
    const transaction = await Mina.transaction(() => {
      getZkApp(args.martialArtist.discipline)!.addPractitioner(args.martialArtist, args.witness, args.currentRoot);
    }
    );
    state.transaction = transaction;
  },
  promoteStudentTransaction: async (args: { student: MartialArtist, instructor: MartialArtist, newRank: CircuitString, studentWitness: MerkleMapWitness }) => {
    const transaction = await Mina.transaction(() => {
      getZkApp(args.student.discipline)!.promoteStudent(args.student, args.instructor, args.newRank, args.studentWitness);
    }
    );
    state.transaction = transaction;
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
