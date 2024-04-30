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
import { randomUUID } from 'crypto';
import { VerificationData } from './VerificationData';

export class VerificationsRepository {

  config: any;
  app: any;
  database: any;

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
  
  async addVerification(verification: VerificationData): Promise<void> {
    verification.id = randomUUID();
    verification.verificationDate = new Date();
    const docRef = doc(
      this.database,
      'Verifications',
      verification.id,
    );

    await setDoc(docRef, verification);
  }

  async addVerificationTemplate(verification: any): Promise<void> {
    verification.id = randomUUID();
    verification.created = new Date();

    const docRef = doc(
      this.database,
      'VerificationTemplates',
      verification.id,
    );

    await setDoc(docRef, verification);
  }

  async getVerificationTemplates(templateOwner: string): Promise<any[]> {
    
    const maQuery = query(collection(this.database, 'VerificationTemplates'), 
    where('templateOwner', '==', templateOwner),
    orderBy('name', 'asc'));
    const querySnapshot = await getDocs(maQuery);
    const verifications: any[] = [];
    querySnapshot.forEach((doc) => {
      verifications.push(doc.data());
    });
    return verifications;
  }

  async getVerificationByID(id: string): Promise<VerificationData | undefined> {
    const docRef = doc(this.database, 'Verifications', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data() as VerificationData;
    } else {
        return undefined;
    }
}

  async getVerifications(requestor: string): Promise<any[]> {
    
    const maQuery = query(collection(this.database, 'Verifications'), 
    where('requestor', '==', requestor),
    orderBy('verificationDate', 'desc'));
    const querySnapshot = await getDocs(maQuery);
    const verifications: any[] = [];
    console.log("get verifications size",querySnapshot.size);
    querySnapshot.forEach((doc) => {
      verifications.push(doc.data());
    });
    return verifications;
  }
}