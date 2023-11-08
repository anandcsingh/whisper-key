import path from "path";
import fs from 'fs';
import { CredentialGenerationContext } from "./CredentialGenerationPipeline"
import { IPipelineStep } from "./CredentialGenerationPipeline"
import CredentialGenerator from "../CredentialGenerator.js";
import { CredentialRepository } from "../CredentialRepository.js";

export class StoreMetadataStep implements IPipelineStep {

    async run(context: CredentialGenerationContext): Promise<void> {
        console.log("Storing credential");
    await (new CredentialRepository().AddCredential(context.credential));
    console.log("Stored credential");
    }
}