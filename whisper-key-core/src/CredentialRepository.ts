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
  allCredentials: CredentialMetadata[];

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
    const id = `${credential.name}`;
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

  async GetCredentialByName(name: string): Promise<CredentialMetadata | undefined> {
    const maQuery = query(
      collection(this.database, this.collectionName),
      where('name', '==', name)
    );

    const querySnapshot = await getDocs(maQuery);
    const credentials: CredentialMetadata[] = [];
    querySnapshot.forEach((doc) => {
      const credential = doc.data() as CredentialMetadata;
      credentials.push(credential);
    });
    return credentials[0];
  }

  async GetCredentials(createdBy: string): Promise<CredentialMetadata[]> {
    const maQuery = query(
      collection(this.database, this.collectionName),
      where('owner', '==', createdBy),
      orderBy('id')
    );
    const querySnapshot = await getDocs(maQuery);
    const credentials: CredentialMetadata[] = [];
    querySnapshot.forEach((doc) => {
      const credential = doc.data() as CredentialMetadata;
      credentials.push(credential);
    });
    return credentials;
  }

  async GetAllCredentials(): Promise<CredentialMetadata[]> {
    console.log("Getting all credentials for new npm package");
    const maQuery = query(
      collection(this.database, this.collectionName),
    );
    const querySnapshot = await getDocs(maQuery);
    const credentials: CredentialMetadata[] = [];
    querySnapshot.forEach((doc) => {
      const credential = doc.data() as CredentialMetadata;
      credentials.push(credential);
    });
    this.allCredentials = credentials;
    return credentials;
  }

  async GetOwnedCredentials(owner: string) {
    // saddest method of all time
    // gett all the credentials
    // filter by owner
    const creds: any = [];
    const all = await this.GetAllCredentials();

    for (let i = 0; i < all.length; i++) {
      const credentialMetadata = all[i];
      const store = this.GetCredentialStore(credentialMetadata.name);
      const allIsssued = (await store.getAll());
      allIsssued.forEach((value, key) => {
        if ((value as any).owner === owner) {
          creds.push(value);
        }
      });

    }
    return creds;
  }

  GetCredentialStore(name: string): ZkMentatStore {
    return new FirebaseMentatStore(name, 'owner', this.config);
  }

  // Queries as it pertains to verifiable crendentials statistics

  async GetTotalNumberOfIssuedCredentials(): Promise<[any]> {
    const creds: any = [];
    const all = await this.GetAllCredentials();

    for (let i = 0; i < all.length; i++) {
      const credentialMetadata = all[i];
      const store = this.GetCredentialStore(credentialMetadata.name);
      const allIsssued = (await store.getAll());
      allIsssued.forEach((value, key) => {
        creds.push(value);
      });

    }
    return creds;
  }

  async GetFirstCreatedCredential() {
    let first: string = '';
    if (!this.allCredentials) {
      const maQuery = query(
        collection(this.database, this.collectionName),
        orderBy('created', 'asc')
      );
      const querySnapshot = await getDocs(maQuery);
      first = querySnapshot.docs[0].id;
    }
    else {
      first = this.allCredentials[0].id;
    }
    return first;
  }

  async GetMostRecentCredential() {
    let last: string = '';
    if (!this.allCredentials) {
      const maQuery = query(
        collection(this.database, this.collectionName),
        orderBy('created', 'desc')
      );
      const querySnapshot = await getDocs(maQuery);
      last = querySnapshot.docs[0].id;
    }
    else {
      last = this.allCredentials[0].id;
    }
    return last;
  }

  // Get number of issued VCs by this issuer address
  // For example, fieldName = "issuer";
  // For example. It can return { jerry: 3, missy: 55}
  async GroupDocumentsByFieldName(fieldName: string): Promise<{ [field: string]: number }> {
    const maQuery = query(
      collection(this.database, this.collectionName)
    );
    const querySnapshot = await getDocs(maQuery);

    const fieldCounts: { [field: string]: number } = {};

    // Iterate over each document in the snapshot
    querySnapshot.forEach(doc => {
      const fieldValue = doc.get(fieldName); // Get the value of the specified field from the document
      if (fieldValue) {
        // Increment count for the fieldValue group
        fieldCounts[fieldValue] = (fieldCounts[fieldValue] || 0) + 1;
      }
    });

    return fieldCounts;
  }

}