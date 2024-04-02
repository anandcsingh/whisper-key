import path from "path";
import fs from 'fs';
import { CredentialGenerationContext } from "./CredentialGenerationContext.js"
import { IPipelineStep } from "./IPipelineStep.js"
import CredentialGenerator from "../CredentialGenerator.js";
import { CredentialRepository } from "../CredentialRepository.js";
import { ContractDeployer } from "../ContractDeployer.js";

export class DeployContractStep implements IPipelineStep {
    name: string = "DeployContractStep";

    async run(context: CredentialGenerationContext): Promise<void> {
        console.log("Deploying to network");
        const deployer = new ContractDeployer(context.feePayer);
        const result = await deployer.deployCredential(context.credential.name,context.saveFilesPath);
    
        context.credential.contractPrivateKey = result.privateKey;
        context.credential.contractPublicKey = result.publicKey;
        context.credential.transactionUrl = result.transactionUrl;

        // update the credential in the database
        await (new CredentialRepository().AddCredential(context.credential));
        console.log("Deployed to network");
    }
}