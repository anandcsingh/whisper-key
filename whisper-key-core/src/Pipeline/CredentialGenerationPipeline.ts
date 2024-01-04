import path from "path";
import { CredentialMetadata } from "../CredentialMetadata.js";
//import { ContractCloudStorage } from "./ContractCloudStorage.js";
import { CreateFileStep } from "./CreateFileStep.js";
import { BundleFileStep } from "./BundleFileStep.js";
import { StoreMetadataStep } from "./StoreMetadataStep.js";
import { DeployContractStep } from "./DeployContractStep.js";
import { IPipelineStep } from "./IPipelineStep.js";
import { CredentialGenerationContext } from "./CredentialGenerationContext.js";

import { fileURLToPath } from 'url';

export class CredentialGenerationPipeline {
    steps: IPipelineStep[] = [];
    context: CredentialGenerationContext = new CredentialGenerationContext();

    initDefault(): void {
        //this.context.cloudStorage = new ContractCloudStorage();

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        this.context.templatePath = path.join(__dirname, 'CredentialTemplate.mustache');
        this.context.saveFilesPath = path.resolve(`public/credentials`);

        // context.templatePath = path.join(__dirname, 'CredentialTemplate.mustache');
        // context.saveFilesPath = path.resolve('./credentials');
        this.addStep(new CreateFileStep());
        //this.addStep(new BundleFileStep());
        this.addStep(new StoreMetadataStep());
        this.addStep(new DeployContractStep());
    }

    addStep(step: IPipelineStep): void {
        this.steps.push(step);
    }

    async run(credential: CredentialMetadata): Promise<void> {
        console.log("Running pipeline");
        this.context.credential = credential;
        for (let step of this.steps) {
            await step.run(this.context);
        }
    }
}


