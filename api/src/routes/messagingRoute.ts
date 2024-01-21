// routes/messagingRoute.ts
import express, { Router } from 'express';
import { sendSms } from '../controllers/messagingController';

export const messagingRouter = express.Router();

messagingRouter.post('/sms', sendSms);
