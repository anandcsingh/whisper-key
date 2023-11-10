import path from "path";
import fs from 'fs';
import { CredentialGenerationContext } from "./CredentialGenerationPipeline.js"
import { IPipelineStep } from "./CredentialGenerationPipeline.js"
import CredentialGenerator from "../CredentialGenerator.js";
import mustache from "mustache";

export class CreateFileStep implements IPipelineStep {
  name: string = "CreateFileStep";

    async run(context: CredentialGenerationContext): Promise<void> {
        console.log("Generating credential file");
        const templatePath = context.templatePath;
        console.log(`Using template ${templatePath}`);
        const templateContent = fs.readFileSync(templatePath, 'utf-8');

        const generator = new CredentialGenerator();
        const file = this.generateAndSave(context.credential, templateContent, context.saveFilesPath);
        console.log("Generated credential file");
        context.generatedFile = file;
    }

    generateAndSave(jsonObject: any, template: string, savePath: string): string {
        try {
        
          const className = jsonObject.name;
         
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
          jsonObject.provableValue = function() {
            if(this.type == "Field") {
              return `Field(obj.${this.name})`;
            } else if(this.type == "PublicKey") {
              return `PublicKey.fromBase58(obj.${this.name})`;
            } else if(this.type == "CircuitString") {
              return `CircuitString.fromString(obj.${this.name})`;
            } else if(this.type == "Bool") {
              return `Bool(${this.name})`;
            }
          }
          const renderedTemplate = mustache.render(template, jsonObject);
          const userFilePath = path.resolve(savePath, `${className}Contract.js`);

          fs.writeFileSync(userFilePath, renderedTemplate);
    
          console.log(`File saved as ${userFilePath}`);
          return userFilePath;
        } catch (error) {
          console.error('An error occurred:', error);
          return "";
        }
      }
    
}