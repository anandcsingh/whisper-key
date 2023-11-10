// routes/credentialsRoute.ts
import express from 'express';
import { generateCredentials, getIssuedCredentials, getOwnedCredentials, issueCredentialViaProxy } from '../controllers/credentialsController.js';
import { get } from 'http';

export const credsRouter = express.Router();

credsRouter.post('/', generateCredentials);
credsRouter.get('/issued/:address', getIssuedCredentials);
credsRouter.post('/issue/:name', issueCredentialViaProxy);
credsRouter.get('/owned/:address', getOwnedCredentials);