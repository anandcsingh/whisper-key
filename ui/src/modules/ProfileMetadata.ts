import axios from 'axios';
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

    updateProfileInfo = async (): Promise<any> => {
        const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}/api/profile`;
        const requestBody = {
            walletAddress: this.walletAddress,
            phoneNumber: this.phoneNumber,
            emailAddress: this.emailAddress,
            preferredNotificationChannel: this.preferredNotificationChannel,
        };

        try {
            const response = await axios.post(apiUrl, requestBody);
            return response.data;
        } catch (error) {
            console.error('Error updating profile information:', error);
            throw error;
        }
    };

    async getProfileInfo(): Promise<any> {
        const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}/api/profile`;
        const queryString = `walletAddress=${encodeURIComponent(this.walletAddress)}`;
        console.log('Query string for getting profole info:', `${apiUrl}?${queryString}`);

        try {
            const response = await axios.get(`${apiUrl}?${queryString}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching profile information:', error);
            throw error;
        }
    }
}