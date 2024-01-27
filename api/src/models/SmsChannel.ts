import { MessageDestination } from "./MessageDestination.js";
import { NotificationChannel } from "./NotificationChannel.js";

export class SmsChannel extends NotificationChannel {
    constructor(channel: string) {
        super(channel);
    }

    sendMessage(destination: MessageDestination, message: string): void {
        const source = process.env.SMS_NUMBER;
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);

        if (!destination || !message) {
            return;
        }

        client.messages
            .create({
                body: message,
                from: source,
                to: destination.phone
            })
            .then(message => console.log(message.sid));
    }
}