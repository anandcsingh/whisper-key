import * as fs from 'fs';
import * as Mustache from 'mustache';

class CredentialGenerator {
  generateAndSave(jsonString: string, template: string): void {
    try {
      // Parse the JSON string to get ClassName
      const className = "UserCredentials";

      // Render the template using Mustache.js
      const renderedTemplate = Mustache.render(template, jsonString);

      // Create the credentials directory if it doesn't exist
      if (!fs.existsSync('credentials')) {
        fs.mkdirSync('credentials');
      }

      // Generate the TypeScript file name based on ClassName
      const fileName = `credentials/${className}.ts`;

      // Write the rendered template to the TypeScript file
      fs.writeFileSync(fileName, renderedTemplate);

      console.log(`File saved as ${fileName}`);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  generateFromFiles(jsonFilePath: string, templateFilePath: string): void {
    try {
      // Read JSON and template strings from files
      const jsonContent = fs.readFileSync(jsonFilePath, 'utf-8');
      const templateContent = fs.readFileSync(templateFilePath, 'utf-8');

      // Call generateAndSave with the content from files
      this.generateAndSave(jsonContent, templateContent);
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
