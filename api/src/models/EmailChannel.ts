import { MessageDestination } from "./MessageDestination.js";
import { NotificationChannel } from "./NotificationChannel.js";
import nodemailer from 'nodemailer';

export class EmailChannel extends NotificationChannel {
    constructor(channel: string) {
        super(channel);
    }

    async sendMessage(destination: MessageDestination, message: string): Promise<void> {
        // Your email configuration
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASSWORD // Your email password or app-specific password
            }
        });

        const subject = "Your credential notification from Whisper Key"

        const mailOptions = {
            from: process.env.EMAIL_USER, // sender address
            to: destination.email, // list of receivers
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

    async sendEmail(destination: string, message: string,
        transport: string, subject: string): Promise<void> {

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