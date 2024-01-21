// controllers/messagingController.ts
import { Request, Response } from "express";

export const sendSms = async (req: Request, res: Response) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    const from = process.env.TWILIO_FROM_NUMBER_SMS

    const { to, message } = req.body;

    // Validate parameters
    if (!to || !message) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    client.messages
        .create({
            body: message,
            from: from,
            to: to
        })
        .then(message => console.log(message.sid));
}
