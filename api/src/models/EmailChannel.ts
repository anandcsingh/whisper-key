import { NotificationChannel } from "./NotificationChannel";
import nodemailer from 'nodemailer';

export class EmailChannel extends NotificationChannel {
    constructor(channel: string) {
        super(channel);
    }

    sendMessage(source: string, destination: string, message: string): void {

    }

    async sendEmail(source: string, destination: string, message: string,
        transport: string, subject: string): Promise<void> {
        super.setupSend(source, destination, message);

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
            console.log("Error", "Invalid transport specified")
        }

        // Validate parameters
        if (!destination || !subject || !message) {
            console.log("Missing required parameters");
        }

        const mailOptions = {
            from: process.env.EMAIL_USER, // sender address
            to: destination, // list of receivers
            subject: subject, // Subject line
            text: message // plain text body
        };

        try {
            // Send email
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent: ', info.response);

        } catch (error) {
            console.error('Error sending email: ', error);
        }

    }
}