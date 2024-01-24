// controllers/messagingController.ts
import { Request, Response } from "express";
import nodemailer from "nodemailer";

// Send a SMS : Number format: E164
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

    res.status(200).send("ok");
}
// Send a WhatsApp Message : Number format: E164
export const sendWhatsapp = async (req: Request, res: Response) => {
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
            from: `whatsapp:${from}`,
            to: `whatsapp:${to}`
        })
        .then(message => console.log(message.sid));

    res.status(200).send("ok");

}

// Send an Email
export const sendEmail = async (req: Request, res: Response) => {
    // Default to 'gmail' if 'transport' is not provided in the request body
    const transport = req.body.transport || 'gmail';

    // Your email configuration
    let transporter;

    if (transport === 'gmail') {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER, // Your Gmail email address
                pass: process.env.GMAIL_PASSWORD // Your Gmail password or app-specific password
            }
        });
    } else if (transport === 'sendgrid') {
        // Add SendGrid configuration
        transporter = nodemailer.createTransport({
            host: 'smtp.sendgrid.net',
            port: 587,
            auth: {
                user: 'your-sendgrid-username',
                pass: 'your-sendgrid-password'
            }
        });
    } else {
        return res.status(400).json({ error: 'Invalid transport specified' });
    }

    const { to, subject, text } = req.body;

    // Validate parameters
    if (!to || !subject || !text) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text // plain text body
    };

    try {
        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.response);

        return res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email: ', error);
        return res.status(500).json({ error: 'Internal server error' });
    }

};