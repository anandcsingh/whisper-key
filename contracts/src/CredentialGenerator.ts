import * as fs from 'fs';
import mustache from "mustache"
import path from 'path';
import { CredentialMetadata } from './CredentialMetadata';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

export class CredentialGenerator {
  generateAndSave(jsonObject: any, template: string): void {
    try {
      // Parse the JSON string to get className

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      console.log(__dirname);

      const className = jsonObject.name;
      // Render the template using Mustache.js
      //console.log(template);
      jsonObject.plainValue = function() {
        if(this.type == "Field") {
          return `Number(this.${this.name}.toBigInt())`;
        } else if(this.type == "PublicKey") {
          return `this.${this.name}.toBase58()`;
        } else if(this.type == "CircuitString") {
          return `this.${this.name}.toString()`;
        } else if(this.type == "Bool") {
          return `this.${this.name}.toBoolean()`;
        }
      }
      const renderedTemplate = mustache.render(template, jsonObject);
      //console.log(renderedTemplate);
      // Define the path to the credentials folder relative to the current directory
      const credentialsFolderPath = path.join(__dirname, 'credentials');
      const userFilePath = path.resolve(`public/credentials/${className}Contract.js`);

      // Define the path to the file within the credentials folder
      //const userFilePath = path.join(credentialsFolderPath, `${className}.js`);

      // Create the file if it doesn't already exist
      // if (!fs.existsSync(`${userFilePath}`)) {
      //   fs.writeFileSync(`${userFilePath}`, "");
      // }

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
