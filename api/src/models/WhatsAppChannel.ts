import { NotificationChannel } from "./NotificationChannel";

export class WhatsAppChannel extends NotificationChannel {
    constructor(channel: string) {
        super(channel);
    }

    sendMessage(source: string, destination: string, message: string): void {
        super.setupSend(source, destination, message);
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);

        if (!destination || !message) {
            return;
        }

        client.messages
            .create({
                body: message,
                from: `whatsapp:${source}`,
                to: `whatsapp:${destination}`
            })
            .then(message => console.log(message.sid));
    }
}