import { fetchAccount, PublicKey, Field } from 'o1js';

import type {
    ZkappWorkerRequest,
    ZkappWorkerReponse,
    WorkerFunctions,
} from './EscrowWorker';

export default class EscrowWorkerClient {
    // ---------------------------------------------------------------------------------------

    setActiveInstanceToBerkeley() {
        return this._call('setActiveInstanceToBerkeley', {});
    }

    loadContract() {
        return this._call('loadContract', {});
    }

    compileContract() {
        return this._call('compileContract', {});
    }

    fetchAccount({
        publicKey,
    }: {
        publicKey: PublicKey;
    }): ReturnType<typeof fetchAccount> {
        const result = this._call('fetchAccount', {
            publicKey58: publicKey.toBase58(),
        });
        return result as ReturnType<typeof fetchAccount>;
    }

    initZkappInstance(publicKey: PublicKey, owner: string, issuer: string) {
        return this._call('initZkappInstance', {
            owner: owner,
            issuer: issuer,
            publicKey58: publicKey.toBase58(),
        });
    }
    async getSender() {
        return this._call('getSender', {});
    }

    async getReceiver() {
        return this._call('getReceiver', {});
    }

    async setSender(senderPublicKey: string, feePayerPubKey: string) {
        return this._call('setSender', { senderPublicKey, feePayerPubKey });
    }

    async setReciever(receiverPublicKey: string, feePayerPubKey: string) {
        return this._call('setReceiver', { receiverPublicKey, feePayerPubKey });
    }

    async getEscrowAmount(): Promise<Field> {
        const result = await this._call('getAmount', {});
        return Field.fromJSON(JSON.parse(result as string));
    }

    async getEscrowEvents() {
        return this._call('getEscrowEvents', {});
    }

    async withdrawFromSmartContract(publicKey: string) {
        return this._call('withdrawFromSmartContract', { publicKey });
    }

    depositTransaction(publicKey: string) {
        return this._call('depositToSmartContract', { publicKey });
    }

    proveUpdateTransaction() {
        return this._call('proveUpdateTransaction', {});
    }

    async getTransactionJSON() {
        const result = await this._call('getTransactionJSON', {});
        return result;
    }

    // ---------------------------------------------------------------------------------------

    worker: Worker;

    promises: {
        [id: number]: { resolve: (res: any) => void; reject: (err: any) => void };
    };

    nextId: number;

    constructor() {
        this.worker = new Worker(new URL('./EscrowWorker.ts', import.meta.url));
        this.promises = {};
        this.nextId = 0;

        this.worker.onmessage = (event: MessageEvent<ZkappWorkerReponse>) => {
            this.promises[event.data.id].resolve(event.data.data);
            delete this.promises[event.data.id];
        };
    }

    _call(fn: WorkerFunctions, args: any) {
        return new Promise((resolve, reject) => {
            this.promises[this.nextId] = { resolve, reject };

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
