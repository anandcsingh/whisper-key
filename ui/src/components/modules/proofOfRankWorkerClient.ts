import {
  fetchAccount,
  PublicKey,
  PrivateKey,
  Field,
  MerkleMapWitness,
  CircuitString,
} from 'o1js'

import type { ZkappWorkerRequest, ZkappWorkerReponse, WorkerFunctions } from '../modules/proofOfRankWorker';
import { MartialArtist } from '../../../contracts/src/models/MartialArtist';
import { ZkClient, ZkClientResponse } from '../../../contracts/build/src/models/ZkClient';

export default class ProofOfRankWorkerClient extends ZkClient {

  // ---------------------------------------------------------------------------------------
  className = 'ProofOfRankWorkerClient';

  loado1js() {
    return this._call('loado1js', {});
  }

  setActiveInstanceToBerkeley() {
    return this._call('setActiveInstanceToBerkeley', {});
  }

  loadContract() {
    return this._call('loadContract', {});
  }

  compileContract() {
    return this._call('compileContract', {});
  }

  fetchZkAppAccount(discipline: string): ReturnType<typeof fetchAccount> {    
    const result = this._call('fetchZkAppAccount', { discipline: discipline });
    return (result as ReturnType<typeof fetchAccount>);
  }

  reFetchZkApps() {    
    return this._call('reFetchZkApps', {  });
  }

  fetchAccount({ publicKey }: { publicKey: PublicKey }): ReturnType<typeof fetchAccount> {    
    const result = this._call('fetchAccount', { publicKey58: publicKey.toBase58() });
    return (result as ReturnType<typeof fetchAccount>);
  }

  initZkappInstance(publicKey: PublicKey) {
    return this._call('initZkappInstance', { publicKey58: publicKey.toBase58() });
  }
  async getStorageRoot(): Promise<Field> {
    const result = await this._call('getStorageRoot', {});
    return Field.fromJSON(JSON.parse(result as string));
  }
  setStorageRoot(root: Field, discipline: string): Promise<any> {
    return this._call('setStorageRoot', { root, discipline });
  }
  add(ma: any) {
    return this._call('add', { ma });
  }
  addPractitioner(martialArtist: MartialArtist, witness: MerkleMapWitness, currentRoot: Field): Promise<any>  {
    return this._call('addPractitionerTransaction', {
      martialArtist, witness, currentRoot
    });
  }


  promoteStudent(student: MartialArtist, instructor: MartialArtist, newRank: string, studentWitness: MerkleMapWitness): Promise<any> {
    return this._call('promoteStudentTransaction', {
      student, instructor, newRank, studentWitness
    });
  }

  proveUpdateTransaction(): Promise<any> {
    return this._call('proveUpdateTransaction', {});
  }

  async sendTransaction() : Promise<ZkClientResponse> {
    console.log('getting Transaction JSON...');
    const transactionJSON = await this.getTransactionJSON()

    console.log('requesting send transaction...');
    let transactionFee = 0.1;

    const { hash, isSuccess } = await (window as any).mina.sendTransaction({
        transaction: transactionJSON,
        feePayer: {
            fee: transactionFee,
            memo: '',
        },
    });

    console.log(
        'See transaction at https://berkeley.minaexplorer.com/transaction/' + hash
    );
    return { hash: hash, isSuccessful: isSuccess };
  }

  async getTransactionJSON() {
    const result = await this._call('getTransactionJSON', {});
    return result;
  }

  // ---------------------------------------------------------------------------------------

  worker: Worker;

  promises: { [id: number]: { resolve: (res: any) => void, reject: (err: any) => void } };

  nextId: number;

  constructor() {
    super();
    this.worker = new Worker(new URL('./proofOfRankWorker.ts', import.meta.url))
    this.promises = {};
    this.nextId = 0;

    this.worker.onmessage = (event: MessageEvent<ZkappWorkerReponse>) => {
      this.promises[event.data.id].resolve(event.data.data);
      delete this.promises[event.data.id];
    };
  }

  _call(fn: WorkerFunctions, args: any) {
    return new Promise((resolve, reject) => {
      this.promises[this.nextId] = { resolve, reject }

      const message: ZkappWorkerRequest = {
        id: this.nextId,
        fn,
        args,
      };

      this.worker.postMessage(message);

      this.nextId++;
    });
  }
}

