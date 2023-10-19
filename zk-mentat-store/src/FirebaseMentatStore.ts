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
    keyField: any;
    constructor(collectionName: string, keyField: any, config: FirebaseConfig) {
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

    async getAll<T>(): Promise<Map<any, T>> {
        let all = new Map<any, T>();

        const maQuery = query(
            collection(this.database, this.collectionName),
            orderBy('id')
        );

        const querySnapshot = await getDocs(maQuery);
        querySnapshot.forEach((doc) => {
            let entity = doc.data() as T;
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
    async get<T>(key: any): Promise<T | null | undefined> {
        const docRef = doc(this.database, this.collectionName, key);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as T;
        } else {
            return undefined;
        }
    }
    async upsert<T>(dataObj: T): Promise<void> {
        const docRef = doc(
            this.database,
            this.collectionName,
        );
        const data = dataObj;
        await setDoc(docRef, dataObj as any);
    }
}