import express, { Request, Response } from 'express';
import { EscrowBerkeleyDeployer } from './EscrowBerkeleyDeployer.js';
import { Mina, PublicKey } from 'o1js';
import cron from 'node-cron';
import { EscrowContract } from './EscrowContract.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON requests
app.use(express.json());

// Example GET endpoint
app.get('/api/', (req: Request, res: Response) => {
    // Logic to handle GET request
    res.json({ message: 'GET request received' });
});

app.post('/api/deploy', async (req: Request, res: Response) => {
    const { senderAccount, receiverAccount, credentialName } = req.body;

    if (!senderAccount || !receiverAccount) {
        return res.status(400).json({ error: 'senderAccount and receiverAccount are required in the request body' });
    }

    let smartContractPublicKey = "B62qkXRq2dKn5tebDLHAaRK8u3y5BZi4geBxe2926GNH1vLxZ2dsQ12";
    // let deployer = new EscrowBerkeleyDeployer(senderAccount, receiverAccount);
    // smartContractPublicKey = await deployer.deploy();
    console.log(smartContractPublicKey);
    checkEscrowContractDeployStats(smartContractPublicKey, credentialName, senderAccount, receiverAccount);

    if (smartContractPublicKey)
        res.json({ message: 'Deploy initiation successful', smartContractPublicKey, senderAccount, receiverAccount });
    else
        res.json({ message: 'Deploy initiation not successful', smartContractPublicKey, senderAccount, receiverAccount });
});

const checkEscrowContractDeployStats = async (contractPublicAddress: string, credName: string, owner: string, issuer: string) => {
    const scheduledJob = cron.schedule('*/15 * * * * *', async () => {
        try {
            let berkeleyUrl = "https://proxy.berkeley.minaexplorer.com/graphql";
            // you can use this with any spec-compliant graphql endpoint
            let Berkeley = Mina.Network(berkeleyUrl);
            Mina.setActiveInstance(Berkeley);

            console.log('Compiling smart contract..... this can take a while...');
            let { verificationKey } = await EscrowContract.compile();

            let pubKey = PublicKey.fromBase58(contractPublicAddress);
            let zkApp = new EscrowContract(pubKey);

            let payment = await zkApp.escrowAmount.fetch();
            let isDeployed = payment?.equals(1).not().toBoolean() ?? false;

            // Check if stopping condition is met
            if (isDeployed) {
                console.log('Smart contract is deployed...');
                // Api request to make a Notification event
                let data = {
                    contractPublicAddress: contractPublicAddress,
                    credName: credName,
                    owner: owner,
                    issuer: issuer
                }
                console.log('About to send notification to API about smart contract');
                deployNotification(data);
                scheduledJob.stop();
            }
            else {
                console.log('Not deployed yet...');
            }
        } catch (error) {
            console.log('Error occurred while trying to check smart contract deploy status to notify user', error);
        }
    });
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

function deployNotification(data: any) {
    const apiUrl = `${process.env.NEXT_PUBLIC_CREDENTIALS_API}/deployNotification`;
    if (!apiUrl) {
        throw new Error('API URL not defined in environment variables.');
    }
    const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // You can add other headers here if needed
        },
        body: JSON.stringify(data)
    };

    fetch(apiUrl, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}
