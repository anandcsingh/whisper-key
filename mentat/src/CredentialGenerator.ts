import * as fs from 'fs';
import * as Mustache from 'mustache';
import path from 'path';
import { CredentialMetadata } from './CredentialMetadata';

export class CredentialGenerator {
  generateAndSave(jsonObject: CredentialMetadata, template: string): void {
    try {
      // Parse the JSON string to get className
      const className = jsonObject.name;

      // Render the template using Mustache.js
      const renderedTemplate = Mustache.render(template, jsonObject);

      // Define the path to the credentials folder relative to the current directory
      const credentialsFolderPath = path.join(__dirname, 'credentials');

      // Define the path to the file within the credentials folder
      const userFilePath = path.join(credentialsFolderPath, `${className}.ts`);

      // Create the file if it doesn't already exist
      if (!fs.existsSync(`${userFilePath}`)) {
        fs.writeFileSync(`${userFilePath}`, "");
      }

      // Write the rendered template to the TypeScript file
      fs.writeFileSync(userFilePath, renderedTemplate);

      console.log(`File saved as ${userFilePath}`);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  generateFromFiles(jsonFilePath: string, templateFilePath: string): void {
    try {
      // Read JSON and template strings from files
      const jsonContent = fs.readFileSync(jsonFilePath, 'utf-8');
      const templateContent = fs.readFileSync(templateFilePath, 'utf-8');

      let jsonObj = JSON.parse(jsonContent) as CredentialMetadata;

      // Call generateAndSave with the content from files
      this.generateAndSave(jsonObj, templateContent);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
}

export default CredentialGenerator;

// // Example usage:
// const jsonStr = '{"ClassName": "MyCredentials", "username": "john_doe", "password": "secret"}';
// const templateStr = 'class {{ClassName}} {\n  username: string = "{{username}}";\n  password: string = "{{password}}";\n}';
// const generator = new CredentialGenerator();
// generator.generateAndSave(jsonStr, templateStr);


// // Example usage:
// const generator = new CredentialGenerator();
// const jsonFilePath = 'path/to/your/json-file.json';
// const templateFilePath = 'path/to/your/template-file.mustache';
// generator.generateFromFiles(jsonFilePath, templateFilePath);
