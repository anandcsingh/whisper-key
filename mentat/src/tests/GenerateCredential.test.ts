import * as fs from 'fs';
import CredentialGenerator from '../CredentialGenerator'; // Import the class from the correct file path
import path from 'path';

const generator = new CredentialGenerator();

describe('CredentialGenerator', () => {

    const currentFolder = __dirname;
    const destinationFolder = path.resolve(__dirname, "..");

    const jsonFilePath = `${currentFolder}/testCredentials.json`;
    const templateFilePath = `${currentFolder}/VcTemplate.txt`;
    const generatedFilePath = `${destinationFolder}/credentials/UserCredentials.ts`;
    const verifierTextpath = `${currentFolder}/credentials/verifier.txt`;

    it('should generate a TypeScript file with the correct content', () => {
        // Call the generateFromFiles method
        generator.generateFromFiles(jsonFilePath, templateFilePath);

        // Check if the generated file exists
        const fileExists = fs.existsSync(generatedFilePath);

        expect(fileExists).toBe(true);

        if (fileExists) {
            // Read the generated file content
            let generatedContent = fs.readFileSync(generatedFilePath, 'utf-8');

            // Define the expected result (predefined TypeScript content)
            var expectedResult = "";
            try {
                const verifierExists = fs.existsSync(verifierTextpath);
                if (verifierExists) {
                    expectedResult = fs.readFileSync(verifierTextpath, 'utf-8');
                }
            } catch (error) {
                console.log(error);
            }

            generatedContent = normalizeString(generatedContent);
            expectedResult = normalizeString(expectedResult);
            // Compare the generated content with the expected result
            expect(generatedContent).toBe(expectedResult);
        }
    }, 190000);

    // Add a cleanup function to remove the generated file after the test
    afterAll(() => {
        if (fs.existsSync(generatedFilePath)) {
            fs.unlinkSync(generatedFilePath);
        }
    });
});

function normalizeString(string: string): string {
    // Remove all whitespace from the string.
    string = string.replace(/\s+/g, "");

    // Remove all comments from the string.
    string = string.split("//")[0];

    // Remove all quotes from the string.
    string = string.replace(/"/g, "");

    return string;
}
