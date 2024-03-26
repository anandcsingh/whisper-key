import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { ProfileRepository } from './ProfileRepository.js';
import { PaymentRequirements } from './PaymentRequirements.js';
import { Payment } from './Payment.js';

export class EscrowPaymentRepository {
    config: any;
    app: any;
    database: any;
    collectionName = 'Payments';

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

    async getPayment(paymentId: string): Promise<Payment | undefined> {
        const docRef = doc(this.database, this.collectionName, paymentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as Payment;
        } else {
            return undefined;
        }
    }

    async addOrUpdatePayment(payment: Payment, credential: any, walletAddress: string): Promise<void> {
        // Store payment with a reference to user profile
        let id = `${credential.owner}`;
        const paymentRef = doc(this.database, this.collectionName, id);
        const paymentData = {
            paymentAmount: payment.paymentAmount,
            paymentStatus: payment.paymentStatus,
            credential: credential,
            owner: walletAddress,
            timestamp: new Date().toISOString(), // Add timestamp for the payment
            id
        };
        await setDoc(paymentRef, paymentData);
    }
}
