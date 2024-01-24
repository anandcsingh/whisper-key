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
  
  export class CreatedCredentialRepository extends NotificationsRepository {
  
    async addCredentialCreationNotification(notification: CreatedCredentialNotification): Promise<void> {
        const docRef = doc(
          this.database,
          'CreatedCredentialNotification',
          notification.id,
        );
        await setDoc(docRef, notification);
      }
    
      async getCreatedCredentialNotifications(creator: string): Promise<CreatedCredentialNotification[]> {
        const maQuery = query(collection(this.database, 'CreatedCredentialNotification'), 
        where('creator', '==', creator), 
        where('seen', '==', false), 
        orderBy('created', 'desc'));
        const querySnapshot = await getDocs(maQuery);
        const notifications: CreatedCredentialNotification[] = [];
        querySnapshot.forEach((doc) => {
          notifications.push(doc.data() as CreatedCredentialNotification);
        });
        return notifications;
      }
    
      async setCreatedCredentialNotificationSeen(id: string): Promise<void> {
        const docRef = doc(this.database, 'CreatedCredentialNotification', id);
        await setDoc(docRef, { seen: true }, { merge: true });
      }
  }
  
export class CreatedCredentialNotification {
    id: string;
    credentialName: string;
    creator: string;
    seen: boolean;
    created: Date;

    constructor(
        id: string,
        credentialName: string,
        creator: string,
        seen: boolean,
        created: Date,
    ) {
        this.id = id;
        this.credentialName = credentialName;
        this.creator = creator;
        this.seen = seen;
        this.created = created;
    }

    toPlainObject(): any {
        return {
            id: this.id,
            credentialName: this.credentialName,
            creator: this.creator,
            seen: this.seen,
            created: this.created,
        };
    }
}