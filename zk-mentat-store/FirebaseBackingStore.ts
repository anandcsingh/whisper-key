import { PublicKey, MerkleMap, Field, CircuitString, Bool } from 'snarkyjs';
import { app, database } from './firebaseConfig.js';
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    setDoc,
    where,
} from 'firebase/firestore';
import { ZkMentatStore } from './ZkMentatStore.js';

export class FirebaseBackingStore extends ZkMentatStore {
    collectionName: string;
    constructor(collectionName: string) {
        super();
        this.collectionName = collectionName;
    }

    async clearStore(): Promise<void> {
        const maQuery = query(collection(database, this.collectionName));
        const querySnapshot = await getDocs(maQuery);
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
    }

    async getAll<T>(): Promise<Map<any, T>> {
        let all = new Map<any, T>();
        let stringMap = new Map<string, T>();

        // DO NOT DELETE THIS COMMENTED OUT CODE
        const maQuery = query(
            collection(database, this.collectionName),
            orderBy('id')
        );
        //const maQuery = query(collection(database, this.collectionName));

        const querySnapshot = await getDocs(maQuery);
        querySnapshot.forEach((doc) => {
            let ma = this.getGenericObjectFromDocSnap<T>(doc.data());
            all.set(ma.publicKey, ma);
        });
        return all;
    }

    async getAllVerified<T>(): Promise<Map<PublicKey, T>> {
        let all = new Map<PublicKey, T>();
        let stringMap = new Map<string, T>();
        const maQuery = query(
            collection(database, this.collectionName),
            where('verified', '==', true),
            orderBy('id')
        );

        const querySnapshot = await getDocs(maQuery);
        querySnapshot.forEach((doc) => {
            let ma = this.getGenericObjectFromDocSnap(doc.data());
            all.set(ma.publicKey, ma);
        });
        return all;
    }
    async getAllStudents(publicKey: string): Promise<Array<any>> {
        let all = new Array<any>();
        let stringMap = new Map<string, any>();
        const maQuery = query(
            collection(database, this.collectionName),
            where('instructor', '==', publicKey),
            orderBy('id')
        );
        //const maQuery = query(collection(database, this.collectionName));

        const querySnapshot = await getDocs(maQuery);
        querySnapshot.forEach((doc) => {
            let ma = doc.data();
            all.push(ma);
        });
        return all;
    }

    async getAllHashes(): Promise<Map<PublicKey, Field>> {
        let all = new Map<PublicKey, Field>();
        const maQuery = query(
            collection(database, this.collectionName),
            orderBy('id')
        );
        const querySnapshot = await getDocs(maQuery);
        querySnapshot.forEach((doc) => {
            all.set(
                PublicKey.fromBase58(doc.data().publicKey),
                Field(doc.data().hash)
            );
            //console.log(doc.data().id, 'hash: ', doc.data().hash);
        });
        return all;
    }
    async get<T>(publicKey: PublicKey): Promise<T | null | undefined> {
        const docRef = doc(database, this.collectionName, publicKey.toBase58());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return this.getGenericObjectFromDocSnap(docSnap.data());
        } else {
            return undefined;
        }
    }
    async upsert<T>(martialArtist: T): Promise<void> {
        const docRef = doc(
            database,
            this.collectionName,
        );
        const data = this.getObjectFromStruct(martialArtist);
        await setDoc(docRef, data);
    }
    getObjectFromStruct<T>(data: T) {
        return {

        };
    }

    getGenericObjectFromDocSnap<T>(data: any): any {
        let param: any = {};
        // ... populate the param object with the data from the document snapshot ...
        //return new T(param);
    }
}