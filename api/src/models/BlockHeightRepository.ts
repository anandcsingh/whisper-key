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
import { NotificationsRepository } from './NotificationsRepository';

export class BlockHeightRepository extends NotificationsRepository {
  
  async getLastBlock(): Promise<number> {
    const docRef = doc(this.database, 'block');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data().lastBlock;
    } else {
        return 0;
    }
  }

  async setLastBlock(lastBlock: number): Promise<void> {
    const docRef = doc(this.database, 'block');
    await setDoc(docRef, { lastBlock });
  }

}
