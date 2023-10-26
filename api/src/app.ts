import express, { Request, Response } from 'express';
import { CredentialGenerator } from './CredentialsController.js';

const app = express();
const port = process.env.PORT || 3000; // Set your desired port

app.get('/', (req: Request, res: Response) => {
    new CredentialGenerator().generateCredentials(req,res);
  });
// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Oops... Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
