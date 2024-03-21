import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { ProfileRepository } from './ProfileRepository';

// Define types/interfaces as needed
interface Payment {
    paymentAmount: number;
    paymentStatus: string;
    // Add more fields as needed
}

export class PaymentRepository {
    config: any;
    app: any;
    database: any;
    collectionName = 'Payments';
    profileRepository: ProfileRepository;

    constructor() {
        this.config = {
            apiKey: "",
            authDomain: "",
            projectId: "",
            storageBucket: "",
            messagingSenderId: "",
            appId: ""
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

    async addOrUpdatePayment(payment: Payment, walletAddress: string): Promise<void> {
        // Assuming the payment is linked to a user profile, get the profile
        const userProfile = await this.profileRepository.getProfile(walletAddress);
        if (!userProfile) {
            throw new Error("User profile not found");
        }

        // Store payment with a reference to user profile
        const paymentRef = doc(this.database, this.collectionName);
        const paymentData = {
            ...payment,
            userProfileId: userProfile.id, // Assuming there's an ID for the user profile
            timestamp: new Date().toISOString() // Add timestamp for the payment
        };
        await setDoc(paymentRef, paymentData);
    }
}
