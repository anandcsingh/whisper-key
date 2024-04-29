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

    const docRef = doc(
      this.database,
      'Verifications',
      verification.id,
    );

    await setDoc(docRef, verification);
  }

  async getVerifications(owner: string): Promise<VerificationData[]> {
    
    const maQuery = query(collection(this.database, 'Verifications'), 
    where('owner', '==', owner),
    orderBy('verificationDate', 'desc'));
    const querySnapshot = await getDocs(maQuery);
    const verifications: VerificationData[] = [];
    querySnapshot.forEach((doc) => {
      verifications.push(doc.data() as VerificationData);
    });
    return verifications;
  }
}