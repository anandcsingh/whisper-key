// routes/messagingRoute.ts
import express, { Router } from 'express';
import { sendEmail, sendSms, sendWhatsapp } from '../controllers/messagingController.js';

export const messagingRouter = express.Router();

messagingRouter.post('/sms', sendSms);
messagingRouter.post('/whatsapp', sendWhatsapp);
messagingRouter.post('/email', sendEmail);
