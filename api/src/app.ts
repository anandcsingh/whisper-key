import express from 'express';
import bodyParser from 'body-parser'
import { credsRouter } from './routes/credentialsRoute.js';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = process.env.PORT || 3001; // Set your desired port

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use('/api/credentials', credsRouter);
app.get('/api/scripts/:name', (req, res, next) => {
    res.type('.js');
    const templatePath = path.resolve(`public/credentials/${req.params.name}.js`);
console.log(templatePath);
    // const templatePath = path.resolve(__dirname, 'credentials', `${req.params.name}.js`);
    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    res.send(templateContent);
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
