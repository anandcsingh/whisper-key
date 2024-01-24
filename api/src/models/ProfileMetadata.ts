export class ProfileMetadata {
    private walletAddress: string;
    private phoneNumber: string;
    private emailAddress: string;
    private preferredNotificationChannel: string;

    constructor(
        walletAddress: string,
        phoneNumber: string,
        emailAddress: string,
        preferredNotificationChannel: string
    ) {
        this.walletAddress = walletAddress;
        this.phoneNumber = phoneNumber;
        this.emailAddress = emailAddress;
        this.preferredNotificationChannel = preferredNotificationChannel;
    }

    // Getter methods
    getWalletAddress(): string {
        return this.walletAddress;
    }

    getPhoneNumber(): string {
        return this.phoneNumber;
    }

    getEmailAddress(): string {
        return this.emailAddress;
    }

    getPreferredNotificationChannel(): string {
        return this.preferredNotificationChannel;
    }
}