import { EmailChannel } from './EmailChannel.js';
import { NotificationChannel } from './NotificationChannel.js';
import { SmsChannel } from './SmsChannel.js';
import { WhatsAppChannel } from './WhatsAppChannel.js';
export class NotificationChannelFactory 
{
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

}