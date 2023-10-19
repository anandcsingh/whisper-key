import CredentialGenerator from './CredentialGenerator'; // Import the class from the correct file path

const generator = new CredentialGenerator();

// Define the file paths for the JSON and template files
const jsonFilePath = './jsonCredentials.json';
const templateFilePath = './VcTemplate.txt';

// Call the generateFromFiles method
generator.generateFromFiles(jsonFilePath, templateFilePath);
