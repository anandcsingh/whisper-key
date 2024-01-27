// routes/profileRoute.ts
import express, { Router } from 'express';
import { getInboxCount, getNotifications, setNotifcationsAsSeen } from '../controllers/inboxController.js';

export const inboxRouter = express.Router();

inboxRouter.post('/seenby/:owner', setNotifcationsAsSeen);
inboxRouter.get('/countfor/:owner', getInboxCount);
inboxRouter.get('/:owner', getNotifications);
