import {
    doc,
    getDoc,
    getFirestore,
    setDoc,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { ProfileMetadata } from './ProfileMetadata';

export class ProfileRepository {
    config: any;
    app: any;
    database: any;
    collectionName = 'ProfileMetadata';

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

    async getProfile(id: string): Promise<ProfileMetadata | undefined> {
        const docRef = doc(this.database, this.collectionName, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as ProfileMetadata;
        } else {
            return undefined;
        }
    }

    async addOrUpdateUserProfile(profile: ProfileMetadata): Promise<void> {
        const docRef = doc(
            this.database,
            this.collectionName,
            profile.getWalletAddress(),
        );
        await setDoc(docRef, profile);
    }
}