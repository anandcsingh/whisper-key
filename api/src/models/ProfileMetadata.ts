export class ProfileMetadata {
    walletAddress: string;
    phoneNumber: string;
    emailAddress: string;
    preferredNotificationChannel: string;

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
}