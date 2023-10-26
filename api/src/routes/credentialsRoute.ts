// routes/credentialsRoute.ts
import express from 'express';
import { generateCredentials } from '../controllers/credentialsController.js';

export const credsRouter = express.Router();

credsRouter.post('/', generateCredentials);