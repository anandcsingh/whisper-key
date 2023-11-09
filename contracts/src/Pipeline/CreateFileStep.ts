import path from "path";
import fs from 'fs';
import { CredentialGenerationContext } from "./CredentialGenerationPipeline.js"
import { IPipelineStep } from "./CredentialGenerationPipeline.js"
import CredentialGenerator from "../CredentialGenerator.js";

export class CreateFileStep implements IPipelineStep {

    async run(context: CredentialGenerationContext): Promise<void> {
        console.log("Generating credential file");
        const templatePath = context.templatePath;
        const templateContent = fs.readFileSync(templatePath, 'utf-8');

        const generator = new CredentialGenerator();
        const file = generator.generateAndSave(context.credential, templateContent);
        console.log("Generated credential file");
        context.generatedFile = file;
    }
}