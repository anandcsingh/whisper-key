import * as fs from 'fs';
import CredentialGenerator from '../CredentialGenerator'; // Import the class from the correct file path

const generator = new CredentialGenerator();

describe('CredentialGenerator', () => {

    const currentFolder = __dirname;

    const jsonFilePath = `${currentFolder}/testCredentials.json`;
    const templateFilePath = `${currentFolder}/VcTemplate.txt`;
    const generatedFilePath = `${currentFolder}/credentials/UserCredentials.ts`; // Modify this path as needed
    const verifierTextpath = `${currentFolder}/credentials/verifier.txt`;

    it('should generate a TypeScript file with the correct content', () => {
        // Call the generateFromFiles method
        generator.generateFromFiles(jsonFilePath, templateFilePath);

        // Check if the generated file exists
        const fileExists = fs.existsSync(generatedFilePath);

        expect(fileExists).toBe(true);

        if (fileExists) {
            // Read the generated file content
            const generatedContent = fs.readFileSync(generatedFilePath, 'utf-8');

            // Define the expected result (predefined TypeScript content)
            var expectedResult;
            try {
                const verifierExists = fs.existsSync(verifierTextpath);
                if (verifierExists) {
                    expectedResult = fs.readFileSync(verifierTextpath, 'utf-8');
                }
            } catch (error) {
                console.log(error);
            }

            // Compare the generated content with the expected result
            expect(generatedContent).toBe(expectedResult);
        }
    });

    // Add a cleanup function to remove the generated file after the test
    afterAll(() => {
        if (fs.existsSync(generatedFilePath)) {
            fs.unlinkSync(generatedFilePath);
        }
    });
});
