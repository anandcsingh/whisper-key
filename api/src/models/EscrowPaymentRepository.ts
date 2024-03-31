import { doc, getDoc, getFirestore, setDoc, query, getDocs, collection, where, updateDoc } from 'firebase/firestore';
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

    async getPaymentsByStatus(walletAddress: string, paymentStatus: string): Promise<Payment[] | undefined> {
        const myQuery = query(
            collection(this.database, this.collectionName),
            where('owner', '==', walletAddress),
            where('paymentStatus', '==', paymentStatus),
            where('smartContractPublicKey', '!=', ''),
        );

        const querySnapshot = await getDocs(myQuery);

        if (querySnapshot.empty) {
            return undefined;
        }

        return querySnapshot.docs.map((doc) => doc.data() as Payment);
    }

    async addOrUpdatePayment(payment: Payment, credential: any, walletAddress: string, smartContractPublicKey: string): Promise<void> {
        // Store payment with a reference to user profile
        let id = `${credential.credentialType}${credential.owner}`;
        const paymentRef = doc(this.database, this.collectionName, id);
        const paymentData = {
            paymentAmount: payment.paymentAmount,
            paymentStatus: payment.paymentStatus,
            credential: credential,
            owner: walletAddress,
            smartContractPublicKey: smartContractPublicKey,
            timestamp: new Date().toISOString(), // Add timestamp for the payment
            id
        };
        await setDoc(paymentRef, paymentData);
    }

    async updatePaymentPublicKey(id: string, publicKey: string): Promise<void> {
        console.log('Payments record id to be updated:', id);
        const paymentRef = doc(this.database, this.collectionName, id); // Reference the document
        console.log('Pending payments public key to update:', publicKey);
        try {
            await updateDoc(paymentRef, { smartContractPublicKey: publicKey });
            console.log("Payment public key updated successfully");
        } catch (error) {
            console.error("Error updating payment public key:", error);
        }
    }
}
