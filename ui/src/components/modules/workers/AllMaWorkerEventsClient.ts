import {
  fetchAccount,
  PublicKey,
  PrivateKey,
  Field,
  MerkleMapWitness,
} from 'snarkyjs'

import type { ZkappWorkerRequest, ZkappWorkerReponse, WorkerFunctions } from './AllMaWorkerEvents'
import ActionResult from './AllMaWorkerEvents';
export default class AllMaWorkerEventsClient {
  
  async revokeStudent(studentPublicKey: string, instructorPublicKey: string, discipline: string): Promise<ActionResult> {
    console.log("prove client", studentPublicKey, instructorPublicKey, discipline);
    const result = await this._call('revokeStudent', { studentPublicKey, instructorPublicKey, discipline });
    return result as ActionResult;
  }
  async prove(address: string, inquirer: string, discipline: string): Promise<ActionResult> {
    console.log("prove client", address, inquirer, discipline);
    const result = await this._call('prove', { address, inquirer, discipline });
    return result as ActionResult;
  }

  // ---------------------------------------------------------------------------------------

  loadSnarkyJS() {
    return this._call('loadSnarkyJS', {});
  }

  setupLocalBlockchain() {
    
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
    console.log("fetchAccount inside client", publicKey.toBase58());
    const result = this._call('fetchAccount', { publicKey58: publicKey.toBase58() });
    return (result as ReturnType<typeof fetchAccount>);
  }

  initZkappInstance(publicKey: PublicKey) {
    return this._call('initZkappInstance', { publicKey58: publicKey.toBase58() });
  }
  async getStorageRoot(discipline: string): Promise<Field> {
    const result = await this._call('getStorageRoot', {discipline});
    return Field.fromJSON(JSON.parse(result as string));
  }
  async setStorageRoot(root: string, discipline: string): Promise<void> {
    await this._call('setStorageRoot', { root, discipline });
  }
  async add(address: string, rank: string, discipline: string): Promise<ActionResult> {
    console.log("add client", address, rank);
    const result = await this._call('add', { address, rank, discipline });
    return result as ActionResult;
  }
  async updateBackingStore(discipline: string): Promise<ActionResult> {
    const result = await this._call('updateBackingStore', { discipline });
    return result as ActionResult;
  }
  async promoteStudent(
    studentPublicKey: string,
    rank: string,
    instructorPublicKey: string,
    discipline: string
  ): Promise<ActionResult>
  {
    const result = await this._call('promoteStudent', { studentPublicKey, rank, instructorPublicKey, discipline });
    return result as ActionResult;
  }

  async proveYourRank(
    studentPublicKey: string,
    rank: string,
    instructorPublicKey: string,
    discipline: string
  ): Promise<ActionResult>
  {
    const result = await this._call('proveYourRank', { studentPublicKey, instructorPublicKey, discipline });
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

  constructor() {
    this.worker = new Worker(new URL('./AllMaWorkerEvents.ts', import.meta.url))
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

