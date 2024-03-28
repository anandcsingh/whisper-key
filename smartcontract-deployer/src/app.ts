import express, { Request, Response } from 'express';
import { EscrowBerkeleyDeployer } from './EscrowBerkeleyDeployer.js';

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
    const { senderAccount, receiverAccount } = req.body;

    if (!senderAccount || !receiverAccount) {
        return res.status(400).json({ error: 'senderAccount and receiverAccount are required in the request body' });
    }

    let smartContractPublicKey = "";
    let deployer = new EscrowBerkeleyDeployer(senderAccount, receiverAccount);
    smartContractPublicKey = await deployer.deploy();
    console.log(smartContractPublicKey);

    if (smartContractPublicKey)
        res.json({ message: 'Deploy initiation successful', smartContractPublicKey, senderAccount, receiverAccount });
    else
        res.json({ message: 'Deploy initiation not successful', smartContractPublicKey, senderAccount, receiverAccount });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});