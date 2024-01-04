import path from "path";
import fs from 'fs';
import { CredentialGenerationContext } from "./CredentialGenerationContext"
import { IPipelineStep } from "./IPipelineStep"
import CredentialGenerator from "../CredentialGenerator.js";
import { CredentialRepository } from "../CredentialRepository.js";

export class StoreMetadataStep implements IPipelineStep {
    name: string = "StoreMetadataStep";

    async run(context: CredentialGenerationContext): Promise<void> {
        console.log("Storing credential");
    await (new CredentialRepository().AddCredential(context.credential));
    console.log("Stored credential");
    }
}