import { CredentialMetadata } from './CredentialMetadata';
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
import { initializeApp } from 'firebase/app';
import { ZkMentatStore } from './ZkMentatStore.js';
import { FirebaseMentatStore } from './FirebaseMentatStore.js';

export class CredentialRepository {
  config: any;
  app: any;
  database: any;
  collectionName = 'CredentialMetadata';

  constructor() {
    this.config = {
      apiKey: 'AIzaSyBIJmplBy5lylYZo9_D7WX18_seBKnzSF0',
      authDomain: 'rankproof-cohort1.firebaseapp.com',
      projectId: 'rankproof-cohort1',
      storageBucket: 'rankproof-cohort1.appspot.com',
      messagingSenderId: '988704691374',
      appId: '1:988704691374:web:e57bebd121bef8b2fdc93f',
    };
    this.app = initializeApp(this.config);
    this.database = getFirestore(this.app);
  }

  async clearMetadataStore(): Promise<void> {
    const maQuery = query(collection(this.database, this.collectionName));
    const querySnapshot = await getDocs(maQuery);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  }
  async clearCredentialStore(name: string): Promise<void> {
    const maQuery = query(collection(this.database, name));
    const querySnapshot = await getDocs(maQuery);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  }

  async AddCredential(credential: CredentialMetadata): Promise<void> {
    const id = `${credential.name}${credential.owner}`;
    credential.id = id;
    const docRef = doc(
      this.database,
      this.collectionName,
      id,
    );
    await setDoc(docRef, credential.toPlainObject());
  }

  async GetCredential(id: string): Promise<CredentialMetadata | undefined> {
    const docRef = doc(this.database, this.collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data() as CredentialMetadata;
    } else {
        return undefined;
    }
  }

  async GetCredentials(): Promise<CredentialMetadata[]> {
    const maQuery = query(
      collection(this.database, this.collectionName),
    );
    const querySnapshot = await getDocs(maQuery);
    const credentials: CredentialMetadata[] = [];
    querySnapshot.forEach((doc) => {
      const credential = doc.data() as CredentialMetadata;
      credentials.push(credential);
    });
    return credentials;
  }

  GetCredentialStore(name: string): ZkMentatStore {
    return new FirebaseMentatStore(name, 'id', this.config);
  }
}
