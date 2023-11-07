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
      apiKey: "AIzaSyCLf7YUCTyPN9spPSmbzwxFpxSLfz7Mqoc",
      authDomain: "whisper-key.firebaseapp.com",
      projectId: "whisper-key",
      storageBucket: "whisper-key.appspot.com",
      messagingSenderId: "1097281157212",
      appId: "1:1097281157212:web:e9c42bc24d566fd269ce99"
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
