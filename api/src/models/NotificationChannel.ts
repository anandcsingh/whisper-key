
import { MessageDestination } from './MessageDestination.js';

export abstract class NotificationChannel {
    channel: string;

    constructor(channel: string) {
        this.channel = channel;
    }

    sendMessage(destination: MessageDestination, message: string): void { }
}
