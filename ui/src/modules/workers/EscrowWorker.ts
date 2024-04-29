import { Mina, PublicKey, UInt64, fetchAccount } from 'o1js';

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// ---------------------------------------------------------------------------------------

import type { EscrowContract } from '../../modules/EscrowContract.js';

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
        const { EscrowContract } = await import('../../modules/EscrowContract.js');
        state.EscrowContract = EscrowContract;
    },
    compileContract: async (args: {}) => {
        await state.EscrowContract!.compile();
    },
    fetchAccount: async (args: { publicKey58: string }) => {
        const publicKey = PublicKey.fromBase58(args.publicKey58);
        return await fetchAccount({ publicKey });
    },
    initZkappInstance: async (args: { publicKey58: string, owner: string, issuer: string }) => {
        const publicKey = PublicKey.fromBase58(args.publicKey58);
        state.zkapp = new state.EscrowContract!(publicKey);
    },
    getAmount: async (args: {}) => {
        const currentNum = await state.zkapp!.escrowAmount.get();
        return JSON.stringify(currentNum.toJSON());
    },
    getSender: async (args: {}) => {
        const sender = await state.zkapp!.senderPublicKey.requireNothing();
        console.log('sender ...', sender);
    },
    getReceiver: async (args: {}) => {
        return await state.zkapp!.receiverPublicKey.requireNothing();
    },
    setSender: async (args: { senderPublicKey: string, feePayerPubKey: string }) => {
        console.log('Entered set sender worker...');
        let fee = 100_000_000;
        console.log('Converting feepayer pub key in setsender method of worker...');
        let feePayer = PublicKey.fromBase58(args.feePayerPubKey);
        console.log('Converting credential to be owner pub key in setsender method of worker...');
        const senderPub = PublicKey.fromBase58(args.senderPublicKey);
        const transaction = await Mina.transaction({ sender: feePayer, fee }, () => {
            console.log('About to call setSender method of Escrow Smart contract');
            state.zkapp!.setSender(senderPub);
        });
        state.transaction = transaction;
    },
    setReceiver: async (args: { receiverPublicKey: string, feePayerPubKey: string }) => {
        console.log('Entered set receiver worker...');
        let fee = 100_000_000;
        console.log('Converting feepayer pub key in setsender method of worker...');
        let feePayer = PublicKey.fromBase58(args.feePayerPubKey);
        console.log('Converting credential to be owner pub key in setReceiver method of worker...');
        const receiverPub = PublicKey.fromBase58(args.receiverPublicKey);
        const transaction = await Mina.transaction({ sender: feePayer, fee }, () => {
            console.log('About to call setReceiver method of Escrow Smart contract');
            state.zkapp!.setSender(receiverPub);
            console.log('Successfully called setReceiver');
        });
        state.transaction = transaction;
    },
    depositToSmartContract: async (args: { publicKey: string }) => {
        let fee = 100_000_000;
        let sender = PublicKey.fromBase58(args.publicKey);
        const transaction = await Mina.transaction({ sender, fee }, () => {
            state.zkapp!.deposit(UInt64.from(2 * 1e9));
        });
        state.transaction = transaction;
    },
    withdrawFromSmartContract: async (args: { publicKey: string }) => {
        let fee = 100_000_000;
        let sender = PublicKey.fromBase58(args.publicKey);
        const transaction = await Mina.transaction({ sender, fee }, () => {
            state.zkapp!.withdraw();
        });
        state.transaction = transaction;
    },
    proveUpdateTransaction: async (args: {}) => {
        await state.transaction!.prove();
    },
    getTransactionJSON: async (args: {}) => {
        return state.transaction!.toJSON();
    },
    getEscrowEvents: async (args: {}) => {
        const events = await state.zkapp!.fetchEvents();
        console.log(
            events.map((e) => {
                return { type: e.type, data: JSON.stringify(e.event) };
            })
        );
        return events;
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
