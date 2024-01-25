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
import { NotificationsRepository } from './NotificationsRepository.js';

export class BlockHeightRepository extends NotificationsRepository {
  collectionName = 'BlockchainMetadata';
  documentID = 'BlockHeight';
  async getLastBlock(): Promise<number> {
    const docRef = doc(this.database, this.collectionName, this.documentID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().lastBlock;
    } else {
      return 0;
    }
  }

  async setLastBlock(lastBlock: number): Promise<void> {

    const docRef = doc(
      this.database,
      this.collectionName,
      this.documentID,
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      data.lastBlock = lastBlock;
      await setDoc(docRef, data);
    }
  }

}