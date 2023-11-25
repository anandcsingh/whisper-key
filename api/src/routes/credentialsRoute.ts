// routes/credentialsRoute.ts
import express from 'express';
import { generateCredentials, getCreatedCredentials, getOwnedCredentials, issueCredentialViaProxy } from '../controllers/credentialsController.js';
import { get } from 'http';

/**
 * @swagger
 * tags:
 *   name: Credentials
 *   description: Credential Management
 * 
*/

/**
 * @swagger
 * /:
 *   post:
 *     summary: Generate credentials
 *     description: Generate credentials using provided data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Credentials generated successfully
 *       '400':
 *         description: Bad request. Invalid data provided.
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /created/:address:
 *   get:
 *     description: Get credential for address
 *     responses:
 *       200:
 *         description: Returns credential for address
 */

/**
 * @swagger
 * /issue/:name:
 *   post:
 *     summary: Issue credential with name
 *     description: Issue a credential
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       '201':
 *         description: Credential issued successfully
 *         content:
 *           application/json:
 *       '400':
 *         description: Invalid data
 */

/**
 * @swagger
 * /owned/:address:
 *   get:
 *     description: Get owned credential for address
 *     responses:
 *       200:
 *         description: Returns owned credential for address
 */

export const credsRouter = express.Router();

credsRouter.post('/', generateCredentials);

credsRouter.get('/created/:address', getCreatedCredentials);

credsRouter.post('/issue/:name', issueCredentialViaProxy);

credsRouter.get('/owned/:address', getOwnedCredentials);