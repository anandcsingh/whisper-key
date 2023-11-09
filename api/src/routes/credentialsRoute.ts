// routes/credentialsRoute.ts
import express from 'express';
import { generateCredentials, getCredentials } from '../controllers/credentialsController.js';
import { get } from 'http';

export const credsRouter = express.Router();

credsRouter.post('/', generateCredentials);
credsRouter.get('/', getCredentials);