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

  // Get the number of all collections
  async GetNumberOfAllCollections(): Promise<number> {
    const collections = await this.database.listCollections();
    const collectionCount = collections.length;
    console.log(`Number of collections: ${collectionCount}`);
    return collectionCount;
  }

  // Get total number of documents for all collections
  async GetTotalNumberOfIssuedCredentials(): Promise<number> {
    const collections = await this.database.listCollections();
    let totalDocumentCount = 0;
    for (const collection of collections) {
      // Get the collection reference
      const colRef = collection.ref;
      const snapshot = await colRef.count();
      totalDocumentCount += snapshot.data().count;
    }
    console.log(`Total number of documents: ${totalDocumentCount}`);
    return totalDocumentCount;
  }

  // Get the number of documents per collection
  async GetIssuedCredentialCountForEachCredentialType(): Promise<{ [name: string]: number }> {
    const collectionCounts: { [name: string]: number } = {};

    const collections = await this.database.listCollections();

    for (const collection of collections) {
      const colRef = collection.ref;
      const snapshot = await colRef.count();
      collectionCounts[collection.id] = snapshot.data().count;
    }
    return collectionCounts;
  }

  // Get number of issued VCs by this issuer address
  // For example, fieldName = "issuer";
  // For example. It can return { jerry: 3, missy: 55}
  async groupDocumentsByFieldName(collectionName: string, fieldName: string): Promise<{ [field: string]: number }> {
    const collectionRef = this.database.collection(collectionName);

    // Use aggregation query to group by field name(for example, "issuer") and count documents
    const snapshot = await collectionRef
      .orderBy(fieldName)
      .groupBy(fieldName)
      .count()
      .get();

    const fieldCounts: { [field: string]: number } = {};

    // Iterate through each group and extract field name (for example, "issuer") and count
    //@ts-ignore
    snapshot.forEach((doc) => {
      const field = doc.id;
      const count = doc.data().count;
      fieldCounts[field] = count;
    });

    return fieldCounts;
  }

}