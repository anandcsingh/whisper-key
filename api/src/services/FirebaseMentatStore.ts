import { PublicKey, MerkleMap, Field, CircuitString, Bool } from 'o1js';
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    orderBy,
    query,
    setDoc,
    where,
} from 'firebase/firestore';
import { ZkMentatStore } from './ZkMentatStore.js';
import { initializeApp } from "firebase/app";
import { IEntity } from './IEntity.js';

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
    collectionName: string;
    app: any;
    database: any;
    keyField: string;
    constructor(collectionName: string, keyField: string, config: FirebaseConfig) {
        super();
        this.collectionName = collectionName;

        this.app = initializeApp(config);
        this.database = getFirestore(this.app);
        this.keyField = keyField;
    }

    async clearStore(): Promise<void> {
        const maQuery = query(collection(this.database, this.collectionName));
        const querySnapshot = await getDocs(maQuery);
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
    }

    async getAll<T>(): Promise<Map<any, IEntity>> {
        let all = new Map<any, IEntity>();

        const maQuery = query(
            collection(this.database, this.collectionName),
            orderBy('id')
        );

        const querySnapshot = await getDocs(maQuery);
        querySnapshot.forEach((doc) => {
            let entity = doc.data() as IEntity;
            all.set((entity as any)[this.keyField], entity);
        });
        return all;
    }

    async getAllHashes(): Promise<Map<any, Field>> {
        let all = new Map<any, Field>();
        const maQuery = query(
            collection(this.database, this.collectionName),
            orderBy('id')
        );
        const querySnapshot = await getDocs(maQuery);
        querySnapshot.forEach((doc) => {
            all.set(
                doc.data()[this.keyField],
                Field(doc.data().hash)
            );
        });
        return all;
    }
    async get(key: any): Promise<IEntity | null | undefined> {
        const docRef = doc(this.database, this.collectionName, key);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as IEntity;
        } else {
            return undefined;
        }
    }
    async upsert(dataObj: IEntity): Promise<void> {
        const data = dataObj.toPlainObject();
        data.hash = dataObj.hash().toString();
        const docRef = doc(
            this.database,
            this.collectionName,
            (data as any)[this.keyField],
        );
        console.log(data);
        await setDoc(docRef, data);
    }
}