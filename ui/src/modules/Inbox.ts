import axios from 'axios';
export class Inbox {
   
    setNotifcationsAsSeen = async (owner: string, notifcations: string[]): Promise<any> => {
        const apiUrl = `${process.env.NEXT_PUBLIC_CREDENTIALS_API}/api/inbox/seenby/${owner}`;

        try {
            const response = await axios.post(apiUrl, notifcations);
            return response.data;
        } catch (error) {
            console.error('Error updating profile information:', error);
            throw error;
        }
    };

    async getInboxCount(owner: string): Promise<any> {
        const apiUrl = `${process.env.NEXT_PUBLIC_CREDENTIALS_API}/api/inbox/countfor/${owner}`;

        try {
            const response = await axios.get(`${apiUrl}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching profile information:', error);
            throw error;
        }
    }

    async getNotifications(owner: string): Promise<any> {
        const apiUrl = `${process.env.NEXT_PUBLIC_CREDENTIALS_API}/api/inbox/${owner}`;

        try {
            const response = await axios.get(`${apiUrl}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching profile information:', error);
            throw error;
        }
    }
}