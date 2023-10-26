import express from 'express';
import * as bodyParser from 'body-parser';
import { credsRouter } from './routes/credentialsRoute.js';

const app = express();
const port = process.env.PORT || 3000; // Set your desired port

// Middleware
//app.use(bodyParser.json());

app.use('/api/credentials', credsRouter);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Oops... Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;