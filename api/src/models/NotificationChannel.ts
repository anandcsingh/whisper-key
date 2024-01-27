import { EmailChannel } from './EmailChannel';
import { MessageDestination } from './MessageDestination';
import { SmsChannel } from './SmsChannel';
import { WhatsAppChannel } from './WhatsAppChannel';
export class NotificationChannel {
    channel: string;

    constructor(channel: string) {
        this.channel = channel;
    }

    static createChannel(channel: string): NotificationChannel {
        switch (channel) {
            case 'email':
                return new EmailChannel(channel);
            case 'sms':
                return new SmsChannel(channel);
            case 'whatsapp':
                return new WhatsAppChannel(channel);
            // Add more cases for other channel types
            default:
                throw new Error(`Unsupported channel: ${channel}`);
        }
    }

    sendMessage(destination: MessageDestination, message: string): void { }
}