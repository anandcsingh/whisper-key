import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { ProfileRepository } from './ProfileRepository';
import { PaymentRequirements } from './PaymentRequirements';
import { Payment } from './Payment';

export class EscrowPaymentRepository {
    config: any;
    app: any;
    database: any;
    collectionName = 'Payments';
    profileRepository: ProfileRepository;

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
        this.profileRepository = new ProfileRepository();
    }

    async getPayment(paymentId: string): Promise<Payment | undefined> {
        const docRef = doc(this.database, this.collectionName, paymentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as Payment;
        } else {
            return undefined;
        }
    }

    async addOrUpdatePayment(payment: Payment, paymentRequirements: PaymentRequirements, walletAddress: string): Promise<void> {
        // Assuming the payment is linked to a user profile, get the profile
        // const userProfile = await this.profileRepository.getProfile(walletAddress);
        // if (!userProfile) {
        //     throw new Error("User profile not found");
        // }

        // Store payment with a reference to user profile
        let id = `${paymentRequirements.credentialMeta.name}${walletAddress}`;
        const paymentRef = doc(this.database, this.collectionName);
        const paymentData = {
            ...payment,
            ...paymentRequirements,
            timestamp: new Date().toISOString(), // Add timestamp for the payment
            id
        };
        await setDoc(paymentRef, paymentData);
    }
}
