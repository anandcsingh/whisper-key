import {
  fetchAccount,
  PublicKey,
  PrivateKey,
  Field,
  MerkleMapWitness,
} from 'o1js'

import type { ZkappWorkerRequest, ZkappWorkerReponse, WorkerFunctions } from './CredentialsWorker'
import ActionResult from './AllMaWorkerEvents';
export default class CredentialsWorkerClient {


  // ---------------------------------------------------------------------------------------

  loado1js() {
    return this._call('loado1js', {});
  }

  setupLocalBlockchain() {
    
  }

  setupActiveInstance() {
    return this._call('setupActiveInstance', {});
  }

  fetchAccount({ publicKey }: { publicKey: PublicKey }): ReturnType<typeof fetchAccount> {
    const result = this._call('fetchAccount', { publicKey58: publicKey.toBase58() });
    return (result as ReturnType<typeof fetchAccount>);
  }

  setupContract(name: string, owner: PublicKey, useProofs: boolean) {
    return this._call('setupContract',{ name, owner, useProofs });
  }

  async getStorageRoot(): Promise<Field> {
    const result = await this._call('getStorageRoot', {});
    return Field.fromJSON(JSON.parse(result as string));
  }
  async setStorageRoot(root: string): Promise<void> {
    await this._call('setStorageRoot', { });
  }
  
  async updateBackingStore(): Promise<ActionResult> {
    const result = await this._call('updateBackingStore', { });
    return result as ActionResult;
  }

  async issueCredential(credential: any): Promise<ActionResult>
  {
    const result = await this._call('issueCredential', { credential } );
    return result as ActionResult;
  }

  async proveUpdateTransaction(): Promise<void> {
    await this._call('proveUpdateTransaction', {});
  }

  async sendTransaction(): Promise<string> {
    let transactionJSON = await this.getTransactionJSON();
    let transactionFee = 0.1;

    const { hash } = await (window as any).mina.sendTransaction({
      transaction: transactionJSON,
      feePayer: {
        fee: transactionFee,
        memo: '',
      },
    });

    const transactionLink = `https://berkeley.minaexplorer.com/transaction/${hash}`;
    console.log(`View transaction at ${transactionLink}`);
    return hash;
  }

  async getTransactionJSON() {
    const result = await this._call('getTransactionJSON', {});
    return result;
  }

  // ---------------------------------------------------------------------------------------

  worker: Worker;

  promises: { [id: number]: { resolve: (res: any) => void, reject: (err: any) => void } };

  nextId: number;

  constructor(workerUrl: string) {
    this.worker = new Worker(new URL('./CredentialsWorker.ts', import.meta.url))
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

