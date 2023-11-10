import path from "path";
import { CredentialMetadata } from "../CredentialMetadata.js";
import { ContractCloudStorage } from "./ContractCloudStorage.js";
import { CreateFileStep } from "./CreateFileStep.js";
import { BundleFileStep } from "./BundleFileStep.js";
import { StoreMetadataStep } from "./StoreMetadataStep.js";
import { DeployContractStep } from "./DeployContractStep.js";

export class CredentialGenerationPipeline {
    steps: IPipelineStep[] = [];
    context: CredentialGenerationContext = new CredentialGenerationContext();
    
    initDefault(): void {
        this.context.cloudStorage = new ContractCloudStorage();
        this.context.templatePath = path.resolve(`public/CredentialTemplate.mustache`);
        this.context.saveFilesPath = path.resolve(`public/credentials`);

        this.addStep(new CreateFileStep());
        this.addStep(new BundleFileStep());
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

export interface IPipelineStep {
    name: string;
    run(context: CredentialGenerationContext): Promise<void>;
}

export class CredentialGenerationContext {
    credential: CredentialMetadata;
    generatedFile: string;
    saveFilesPath: string;
    templatePath: any;
    cloudStorage: ContractCloudStorage;
  bundledFile: any;
}