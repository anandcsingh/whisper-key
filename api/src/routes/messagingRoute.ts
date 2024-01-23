// routes/messagingRoute.ts
import express, { Router } from 'express';
import { sendSms, sendWhatsapp } from '../controllers/messagingController.js';

export const messagingRouter = express.Router();

messagingRouter.post('/sms', sendSms);
messagingRouter.post('/whatsapp', sendWhatsapp)
