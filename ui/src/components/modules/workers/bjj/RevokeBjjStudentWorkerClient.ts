import {
  fetchAccount,
  PublicKey,
  PrivateKey,
  Field,
  MerkleMapWitness,
} from 'o1js'

import type { ZkappWorkerRequest, ZkappWorkerReponse, WorkerFunctions } from './RevokeBjjStudentWorker';
import { RevokeZkClient, ZkClientResponse } from '../../../../../contracts/build/src/models/RankProofClients';
export default class RevokeBjjStudentWorkerClient implements RevokeZkClient {

  // ---------------------------------------------------------------------------------------

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
  async setStorageRoot(root: string): Promise<void> {
    await this._call('setStorageRoot', { root });
  }
  async revokeStudent(
    studentPublicKey: string,
    instructorPublicKey: string,
  ): Promise<void> {
    await this._call('revokeStudent', { studentPublicKey, instructorPublicKey });
  }
  async updateBackingStore(studentPublicKey: string,
    instructorPublicKey: string,): Promise<void> {
    await this._call('updateBackingStore', { studentPublicKey, instructorPublicKey });
  }

  async proveUpdateTransaction(): Promise<void> {
    await this._call('proveUpdateTransaction', {});
  }

  async sendTransaction(): Promise<ZkClientResponse> {
    let transactionJSON = await this.getTransactionJSON();
    let transactionFee = 0.1;

    const { hash, isSuccess } = await (window as any).mina.sendTransaction({
      transaction: transactionJSON,
      feePayer: {
        fee: transactionFee,
        memo: '',
      },
    });

    const transactionLink = `https://berkeley.minaexplorer.com/transaction/${hash}`;
    console.log(`View transaction at ${transactionLink}`);
    console.log(`Transaction success: ${isSuccess}`);
    return { hash, isSuccess };
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
    this.worker = new Worker(new URL('./RevokeBjjStudentWorker.ts', import.meta.url))
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

