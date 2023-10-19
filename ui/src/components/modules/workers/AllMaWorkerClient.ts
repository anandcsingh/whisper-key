import {
  fetchAccount,
  PublicKey,
  PrivateKey,
  Field,
  MerkleMapWitness,
} from 'snarkyjs'

import type { ZkappWorkerRequest, ZkappWorkerReponse, WorkerFunctions } from './AllMaWorker'
export default class AllMaWorkerClient {
  updateBackingStore() {
    throw new Error("Method not implemented.");
  }
  revokeBjjStudent(studentID: string, instructorID: string) {
    throw new Error("Method not implemented.");
  }
  proveStudent(practitionerID: string, disciplineValue: string, inquirerID: string) {
    throw new Error("Method not implemented.");
  }

  // ---------------------------------------------------------------------------------------

  loadSnarkyJS() {
    return this._call('loadSnarkyJS', {});
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
  async getBjjStorageRoot(): Promise<Field> {
    const result = await this._call('getBjjStorageRoot', {});
    return Field.fromJSON(JSON.parse(result as string));
  }
  async setBjjStorageRoot(root: string): Promise<void> {
    await this._call('setBjjStorageRoot', { root });
  }

  async addBjj(address: string, rank: string): Promise<void> {
    console.log("addBjj client", address, rank);
    await this._call('addBjj', { address, rank });
  }
  async updateBjjBackingStore(address: string, rank: string): Promise<void> {
    await this._call('updateBjjBackingStore', { address, rank });
  }
  async getJudoStorageRoot(): Promise<Field> {
    const result = await this._call('getJudoStorageRoot', {});
    return Field.fromJSON(JSON.parse(result as string));
  }
  async setJudoStorageRoot(root: string): Promise<void> {
    await this._call('setJudoStorageRoot', { root });
  }

  async addJudo(address: string, rank: string): Promise<void> {
    await this._call('addJudo', { address, rank });
  }
  async updateJudoBackingStore(address: string, rank: string): Promise<void> {
    await this._call('updateJudoBackingStore', { address, rank });
  }
  async getKarateStorageRoot(): Promise<Field> {
    const result = await this._call('getKarateStorageRoot', {});
    return Field.fromJSON(JSON.parse(result as string));
  }
  async setKarateStorageRoot(root: string): Promise<void> {
    await this._call('setKarateStorageRoot', { root });
  }

  async addKarate(address: string, rank: string): Promise<void> {
    await this._call('addKarate', { address, rank });
  }
  async updateKarateBackingStore(address: string, rank: string): Promise<void> {
    await this._call('updateKarateBackingStore', { address, rank });
  }
  async promoteBjjStudent(
    studentPublicKey: string,
    rank: string,
    instructorPublicKey: string,
  ): Promise<void>
  {
    console.log("client: promoteBjjStudent", studentPublicKey, rank, instructorPublicKey);
    await this._call('promoteBjjStudent', { studentPublicKey, rank, instructorPublicKey });
  }
  async promoteJudoStudent(
    studentPublicKey: string,
    rank: string,
    instructorPublicKey: string,
  ): Promise<void>
  {
    await this._call('promoteJudoStudent', { studentPublicKey, rank, instructorPublicKey });
  }
  async promoteKarateStudent(
    studentPublicKey: string,
    rank: string,
    instructorPublicKey: string,
  ): Promise<void>
  {
    await this._call('promoteKarateStudent', { studentPublicKey, rank, instructorPublicKey });
  }
  async proveUpdateTransaction(): Promise<void> {
    await this._call('proveUpdateTransaction', {});
  }

  async sendTransaction(): Promise<string> {
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
    this.worker = new Worker(new URL('./AllMaWorker.ts', import.meta.url))
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

