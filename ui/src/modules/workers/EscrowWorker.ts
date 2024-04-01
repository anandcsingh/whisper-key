import { Mina, PublicKey, UInt64, fetchAccount } from 'o1js';

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// ---------------------------------------------------------------------------------------

import type { EscrowContract } from '../../../../smartcontract-deployer/build/src/EscrowContract.js';

const state = {
    EscrowContract: null as null | typeof EscrowContract,
    zkapp: null as null | EscrowContract,
    transaction: null as null | Transaction
};

// ---------------------------------------------------------------------------------------

const functions = {
    setActiveInstanceToBerkeley: async (args: {}) => {
        console.log('setting network instance');
        const Berkeley = Mina.Network(
            //'https://api.minascan.io/node/berkeley/v1/graphql'
            //'https://berkeley.graphql.minaexplorer.com/'
            'https://proxy.berkeley.minaexplorer.com/graphql'
        );
        console.log('Berkeley Instance Created');
        Mina.setActiveInstance(Berkeley);
    },
    loadContract: async (args: {}) => {
        const { EscrowContract } = await import('../../../../smartcontract-deployer/build/src/EscrowContract.js');
        state.EscrowContract = EscrowContract;
    },
    compileContract: async (args: {}) => {
        await state.EscrowContract!.compile();
    },
    fetchAccount: async (args: { publicKey58: string }) => {
        const publicKey = PublicKey.fromBase58(args.publicKey58);
        return await fetchAccount({ publicKey });
    },
    initZkappInstance: async (args: { publicKey58: string }) => {
        const publicKey = PublicKey.fromBase58(args.publicKey58);
        state.zkapp = new state.EscrowContract!(publicKey);
    },
    getAmount: async (args: {}) => {
        const currentNum = await state.zkapp!.escrowAmount.get();
        return JSON.stringify(currentNum.toJSON());
    },
    depositToSmartContract: async (args: { publicKey: string }) => {
        let fee = 100_000_000;
        let sender = PublicKey.fromBase58(args.publicKey);
        const transaction = await Mina.transaction({ sender, fee }, () => {
            state.zkapp!.deposit(UInt64.from(2 * 1e9));
        });
        state.transaction = transaction;
    },
    proveUpdateTransaction: async (args: {}) => {
        await state.transaction!.prove();
    },
    getTransactionJSON: async (args: {}) => {
        return state.transaction!.toJSON();
    }
};

// ---------------------------------------------------------------------------------------

export type WorkerFunctions = keyof typeof functions;

export type ZkappWorkerRequest = {
    id: number;
    fn: WorkerFunctions;
    args: any;
};

export type ZkappWorkerReponse = {
    id: number;
    data: any;
};

if (typeof window !== 'undefined') {
    addEventListener(
        'message',
        async (event: MessageEvent<ZkappWorkerRequest>) => {
            const returnData = await functions[event.data.fn](event.data.args);

            const message: ZkappWorkerReponse = {
                id: event.data.id,
                data: returnData
            };
            postMessage(message);
        }
    );
}

console.log('Web Worker Successfully Initialized.');
