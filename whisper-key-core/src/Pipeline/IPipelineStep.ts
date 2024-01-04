import { CredentialGenerationContext } from "..";

export interface IPipelineStep {
    name: string;
    run(context: CredentialGenerationContext): Promise<void>;
}