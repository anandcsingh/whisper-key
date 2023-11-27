// swaggerConfig.ts
import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
const __dirname = path.dirname(path.dirname(__filename));

console.log(path.join(__dirname, './routes/*.ts'));

console.log(__filename);
console.log(__dirname);

const options: swaggerJsdoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Whisper Key API',
            version: '1.0.0',
            description: 'Verifiable Credentials management',
        },
    },
    apis: [path.join(__dirname, './routes/*.ts')], // Replace with your route files pattern
};

const specs = swaggerJsdoc(options);
export default specs;
