// routes/credentialsRoute.ts
import express from 'express';
import { generateCredentials, getCreatedCredentials, getOwnedCredentials, issueCredentialViaProxy } from '../controllers/credentialsController.js';
import { get } from 'http';

export const credsRouter = express.Router();

credsRouter.post('/', generateCredentials);
credsRouter.get('/created/:address', getCreatedCredentials);
credsRouter.post('/issue/:name', issueCredentialViaProxy);
credsRouter.get('/owned/:address', getOwnedCredentials);