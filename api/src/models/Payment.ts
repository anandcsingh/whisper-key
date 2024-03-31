export class Payment {
    id: string;
    paymentAmount: number;
    paymentStatus: string;
    smartContractPublicKey?: string; // Optional property
    timestamp: Date;

    constructor(
        id: string,
        paymentAmount: number,
        paymentStatus: string,
        smartContractPublicKey?: string,
        timestamp: Date = new Date() // Default timestamp
    ) {
        this.id = id;
        this.paymentAmount = paymentAmount;
        this.paymentStatus = paymentStatus;
        this.smartContractPublicKey = smartContractPublicKey;
        this.timestamp = timestamp;
    }
}
