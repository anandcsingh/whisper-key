import { PublicKey, MerkleMap, Field, CircuitString, Bool } from 'o1js';

import { IEntity } from './IEntity';
import { ZkMentatStore } from './ZkMentatStore';

export class FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;

    constructor(apiKey: string,
        authDomain: string,
        projectId: string,
        storageBucket: string,
        messagingSenderId: string,
        appId: string) {
        this.apiKey = apiKey;
        this.authDomain = authDomain;
        this.projectId = projectId;
        this.storageBucket = storageBucket;
        this.messagingSenderId = messagingSenderId;
        this.appId = appId;
    }
}

export class FirebaseMentatStore extends ZkMentatStore {
    getAll(): Promise<Map<any, IEntity>> {
        throw new Error('Method not implemented.');
    }
    getAllHashes(): Promise<Map<any, Field>> {
        throw new Error('Method not implemented.');
    }
    get(key: any): Promise<IEntity> {
        throw new Error('Method not implemented.');
    }
    clearStore(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    collectionName: string;
    app: any;
    database: any;
    keyField: string;
    constructor(collectionName: string, keyField: string, config: FirebaseConfig) {
        super();
        this.collectionName = collectionName;

        this.keyField = keyField;
    }
    async upsert(dataObj: IEntity): Promise<void> {
        console.log("upserting", dataObj);
    }
}