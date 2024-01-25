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
  
  export class IssuedCredentialRepository extends NotificationsRepository {
  
    async addIssuesdredentialNotification(notification: IssuedCredentialNotification): Promise<void> {
        const docRef = doc(
          this.database,
          'IssuedCredentialNotification',
          notification.id,
        );
        await setDoc(docRef, notification);
      }
    
      async getIssuedCredentialNotifications(owner: string): Promise<IssuedCredentialNotification[]> {
        const maQuery = query(collection(this.database, 'IssuedCredentialNotification'), 
        where('owner', '==', owner), 
        where('seen', '==', false), 
        orderBy('created', 'desc'));
        const querySnapshot = await getDocs(maQuery);
        const notifications: IssuedCredentialNotification[] = [];
        querySnapshot.forEach((doc) => {
          notifications.push(doc.data() as IssuedCredentialNotification);
        });
        return notifications;
      }
    
      async setIssuedCredentialNotificationSeen(id: string): Promise<void> {
        const docRef = doc(this.database, 'IssuedCredentialNotification', id);
        await setDoc(docRef, { seen: true }, { merge: true });
      }
  }
  
export class IssuedCredentialNotification {
 
    id: string;
    credentialName: string;
    issuer: string;
    owner: string;
    seen: boolean;
    created: Date;

    constructor(
        id: string,
        credentialName: string,
        issuer: string,
        owner: string,
        seen: boolean,
        created: Date,
    ) {
        this.id = id;
        this.credentialName = credentialName;
        this.issuer = issuer;
        this.owner = owner;
        this.seen = seen;
        this.created = created;
    }

    toPlainObject(): any {
        return {
            id: this.id,
            credentialName: this.credentialName,
            issuer: this.issuer,
            owner: this.owner,
            seen: this.seen,
            created: this.created,
        }
    }
}