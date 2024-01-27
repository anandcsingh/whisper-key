import { EmailChannel } from './EmailChannel';
import { SmsChannel } from './SmsChannel';
import { WhatsAppChannel } from './WhatsAppChannel';
export class NotificationChannel {
    channel: string;
    source: string;
    destination: string;
    message: string;

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

    setupSend(source: string, destination: string, message: string): void {
        this.source = source;
        this.destination = destination;
        this.message = message
    }

    sendMessage(source: string, destination: string, message: string): void { }
}