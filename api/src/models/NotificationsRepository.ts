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

export class NotificationsRepository {

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

  
  async addNotification(notification: NotificationData): Promise<void> {
    const docRef = doc(
      this.database,
      'Notifications',
      notification.id,
    );
    await setDoc(docRef, notification);
  }

  async getNotifications(owner: string): Promise<NotificationData[]> {
    const maQuery = query(collection(this.database, 'Notifications'), 
    where('owner', '==', owner), 
    where('seen', '==', false), 
    orderBy('created', 'desc'));
    const querySnapshot = await getDocs(maQuery);
    const notifications: NotificationData[] = [];
    querySnapshot.forEach((doc) => {
      notifications.push(doc.data() as NotificationData);
    });
    return notifications;
  }

  async setNotificationASeen(id: string): Promise<void> {
    const docRef = doc(this.database, 'Notifications', id);
    await setDoc(docRef, { seen: true }, { merge: true });
  }
}

export class NotificationData {

  id: string;
  credentialName: string;
  issuer: string;
  owner: string;
  type: string;
  seen: boolean;
  created: Date;

  constructor(
    credentialName: string,
    issuer: string,
    owner: string,
    type: string,
  ) {
    this.id =  randomUUID();
    this.credentialName = credentialName;
    this.issuer = issuer;
    this.owner = owner;
    this.type = type;
    this.seen = false;
    this.created = new Date();
  }

  toPlainObject(): any {
    return {
      id: this.id,
      credentialName: this.credentialName,
      issuer: this.issuer,
      owner: this.owner,
      type: this.type,
      seen: this.seen,
      created: this.created,
    }
  }
}