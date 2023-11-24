import express from 'express';
import bodyParser from 'body-parser'
import { credsRouter } from './routes/credentialsRoute.js';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { CircuitString, Field, MerkleMap, Mina, PrivateKey, PublicKey, fetchAccount } from 'o1js';
import { DiscordBadgeContract, DiscordBadgeEntity } from '../public/credentials/DiscordBadgeContract.js';
import swaggerUi from 'swagger-ui-express';
import specs from './config/swaggerConfig.js'; // Import the generated Swagger specs

const app = express();
const port = process.env.PORT || 3001; // Set your desired port

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use('/api/credentials', credsRouter);

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
