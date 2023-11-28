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
 *             $ref: '#/components/schemas/CredentialMetadata'
 *     responses:
 *       '200':
 *         description: Credentials generated successfully
 *       '400':
 *         description: Bad request. Invalid data provided.
 *       '500':
 *         description: Internal server error
 * 
 * components:
 *   schemas:
 *     CredentialMetadata:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         version:
 *           type: string
 *         created:
 *           type: string
 *           format: date-time
 *         owner:
 *           type: string
 *         issuer:
 *           type: string
 *         fields:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CredentialField'
 *         contractPrivateKey:
 *           type: string
 *         contractPublicKey:
 *           type: string
 *         transactionUrl:
 *           type: string
 * 
 *     CredentialField:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         type:
 *           type: string
 */


/**
 * @swagger
 * /created/{address}:
 *   get:
 *     description: Get credentials for address
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns credentials for address
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CredentialMetadata'
 * 
 * components:
 *   schemas:
 *     CredentialMetadata:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         version:
 *           type: string
 *         created:
 *           type: string
 *           format: date-time
 *         owner:
 *           type: string
 *         issuer:
 *           type: string
 *         fields:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CredentialField'
 *         contractPrivateKey:
 *           type: string
 *         contractPublicKey:
 *           type: string
 *         transactionUrl:
 *           type: string
 * 
 *     CredentialField:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         type:
 *           type: string
 */

/**
 * @swagger
 * /issue/{name}:
 *   post:
 *     summary: Issue credential with name
 *     description: Issue a credential
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CredentialMetadata'
 *     responses:
 *       '201':
 *         description: Credential issued successfully
 *         content:
 *           application/json:
 *       '400':
 *         description: Invalid data
 * 
 * components:
 *   schemas:
 *     CredentialMetadata:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         version:
 *           type: string
 *         created:
 *           type: string
 *           format: date-time
 *         owner:
 *           type: string
 *         issuer:
 *           type: string
 *         fields:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CredentialField'
 *         contractPrivateKey:
 *           type: string
 *         contractPublicKey:
 *           type: string
 *         transactionUrl:
 *           type: string
 * 
 *     CredentialField:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         type:
 *           type: string
 */

/**
 * @swagger
 * /owned/{address}:
 *   get:
 *     description: Get owned credential for address
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns owned credential for address
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CredentialMetadata'
 * 
 * components:
 *   schemas:
 *     CredentialMetadata:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         version:
 *           type: string
 *         created:
 *           type: string
 *           format: date-time
 *         owner:
 *           type: string
 *         issuer:
 *           type: string
 *         fields:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CredentialField'
 *         contractPrivateKey:
 *           type: string
 *         contractPublicKey:
 *           type: string
 *         transactionUrl:
 *           type: string
 * 
 *     CredentialField:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         type:
 *           type: string
 */

export const credsRouter = express.Router();

credsRouter.post('/', generateCredentials);

credsRouter.get('/created/:address', getCreatedCredentials);

credsRouter.post('/issue/:name', issueCredentialViaProxy);

credsRouter.get('/owned/:address', getOwnedCredentials);