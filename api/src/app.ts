import express from 'express';
import bodyParser from 'body-parser'
import { credsRouter } from './routes/credentialsRoute.js';
import { messagingRouter } from './routes/messagingRoute.js';
import { credsStatsRouter } from './routes/credentialStatsRoute.js';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { CircuitString, Field, MerkleMap, Mina, PrivateKey, PublicKey, UInt32, fetchAccount } from 'o1js';
import { DiscordBadgeContract, DiscordBadgeEntity } from '../public/credentials/DiscordBadgeContract.js';
import swaggerUi from 'swagger-ui-express';
import specs from './config/swaggerConfig.js'; // Import the generated Swagger specs
import { CredentialRepository } from 'contract-is-key';
import { EventNotification } from './models/EventNotification.js';
import { EventPolling } from './models/EventPolling.js';
import { checkDeploymentStatus } from './controllers/credentialsController.js'
import cron from 'node-cron';
import { profileRouter } from './routes/profileRoute.js';
import { BlockHeightRepository } from './models/BlockHeightRepository.js';
import { inboxRouter } from './routes/inboxRoute.js';
import { escrowRouter } from './routes/escrowRoute.js';

const app = express();
const port = process.env.PORT || 3001; // Set your desired port

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Create Credential NOTIFICATIONS 
// cron.schedule('*/5 * * * *', () => {
//   checkDeploymentStatus(new EventNotification());
// });

// Issue credential NOTIFICATIONS
const polling = new EventPolling("*/10 * * * * *", new CredentialRepository(), new EventNotification(), new BlockHeightRepository());
//polling.start();

app.use('/api/credentials', credsRouter);

app.use('/api/messaging', messagingRouter);

app.use('/api/profile', profileRouter);
app.use('/api/inbox', inboxRouter);

app.use('/api/credential-stats', credsStatsRouter);

app.use('/api/escrow', escrowRouter);

app.use('/api/poll/created', async (req, res, next) => {
  checkDeploymentStatus(new EventNotification());
  res.status(200).send('checking created status');

});

app.use('/api/poll/issued', async (req, res, next) => {
  const polling = new EventPolling("*/10 * * * * *", new CredentialRepository(), new EventNotification(), new BlockHeightRepository());
  polling.job();
  res.status(200).send('checking issued status');

});


app.use('/api/events/:name', async (req, res, next) => {
  const name = req.params.name;
  const Berkeley = Mina.Network({
    mina: 'https://proxy.berkeley.minaexplorer.com/graphql',
    archive: 'https://archive.berkeley.minaexplorer.com/',
  });
  Mina.setActiveInstance(Berkeley);

  const repo = new CredentialRepository();
  const credMetadata = await repo.GetCredential(name);
  // const templatePath = path.resolve(`public/credentials/${name}Contract.js`);
  const templatePath = `../../public/credentials/${req.params.name}Contract.js`

  const { CredentialProxy } = await import(/* webpackIgnore: true */templatePath);
  const zkAppAddress = PublicKey.fromBase58(credMetadata.contractPublicKey);

  console.log("credMetadata.contractPublicKey:", credMetadata.contractPublicKey);
  const proxy = new CredentialProxy(zkAppAddress, name, PublicKey.empty, true);
  const blockHeight = UInt32.from(34964);
  const events = await proxy.fetchEvents(UInt32.from(0));
  res.send(events);

});


// Serve Swagger documentation using swagger-ui-express
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/api/scripts/:name', (req, res, next) => {
  res.type('.js');
  const templatePath = path.resolve(`public/credentials/${req.params.name}Contract.js`);
  const templateContent = fs.readFileSync(templatePath, 'utf-8');
  res.send(templateContent);
})

/**
 * @swagger
 * /real:
 *   get:
 *     description: Real
 *     responses:
 *       200:
 *         description: /Real endpoint
 */
app.get('/real', async (req, res, next) => {
  // Get data from client 
  // can we sign this data and verify the authenticity of the data?
  // sign with private key on the browser, send message to api public verfify
  let proofsEnabled = true;
  let deployerAccount: PublicKey,
    deployerKey: PrivateKey,
    senderAccount: PublicKey,
    senderKey: PrivateKey,
    zkAppAddress: PublicKey,
    zkAppPrivateKey: PrivateKey,
    zkApp: DiscordBadgeContract,
    local: any;
  if (proofsEnabled) await DiscordBadgeContract.compile();


  const Berkeley = Mina.Network(
    'https://proxy.berkeley.minaexplorer.com/graphql'
  );
  console.log('Berkeley Instance Created');
  Mina.setActiveInstance(Berkeley);
  senderKey = PrivateKey.fromBase58("EKEjzZdcsuaThenLan7UkQRxKXwZGTC2L6ufbCg4X5M9WF6UJx2j");
  senderAccount = senderKey.toPublicKey();

  zkAppAddress = PublicKey.fromBase58("B62qmVJRKong9PuMagoWGDmPjSdmSkjPhW2R3ZyB8nZswiSAxcua5H8");
  await fetchAccount({ publicKey: zkAppAddress });

  zkApp = new DiscordBadgeContract(zkAppAddress);

  console.log("senderAccount:", senderAccount.toBase58());
  const map = new MerkleMap();
  const entity = new DiscordBadgeEntity({
    id: Field(1),
    credentialType: CircuitString.fromString('Test'),
    owner: PublicKey.fromBase58("B62qqzMHkbogU9gnQ3LjrKomimsXYt4qHcXc8Cw4aX7tok8DjuDsAzx"),
    issuer: senderAccount,
    BadgeName: CircuitString.fromString('Test'),
    DiscordID: CircuitString.fromString('Test'),
  });


  const merkleStore = {
    nextID: 2,
    map: map,
  };
  const currentRoot = zkApp.mapRoot.get();

  await fetchAccount({ publicKey: zkAppAddress });
  entity.id = Field(merkleStore.nextID);
  let hash = entity.hash();

  merkleStore.map.set(entity.id, hash);
  const transactionFee = 100_000_000;
  console.log("fee:", transactionFee);
  const witness = merkleStore.map.getWitness(entity.id);
  const transaction = await Mina.transaction({ sender: entity.issuer, fee: transactionFee }, () => {
    zkApp.issueCredential(senderAccount, entity, witness, currentRoot);
  });

  console.log("proving transaction");
  await transaction.prove();
  console.log("signing transaction");
  let result = await transaction.sign([senderKey]).send();

  console.log(`https://berkeley.minaexplorer.com/transaction/${result.hash()}`);
  res.send("ok");
})



// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Oops... Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
