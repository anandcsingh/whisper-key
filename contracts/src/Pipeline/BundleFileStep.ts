import path from "path";
import fs from 'fs';
import { CredentialGenerationContext } from "./CredentialGenerationPipeline.js"
import { IPipelineStep } from "./CredentialGenerationPipeline.js"
import CredentialGenerator from "../CredentialGenerator.js";
import webpack from "webpack";

export class BundleFileStep implements IPipelineStep {
  name: string = "BundleFileStep";
    async run(context: CredentialGenerationContext): Promise<void> {
        console.log("Bundling credential");
    const config = {
      entry: context.generatedFile,
      output: {
        filename: `${context.credential.name}Contract.js`,    // The name of the output bundle file.
        path: path.resolve('public', 'credentials', 'bundled'),  // The directory to output the bundle.
        libraryTarget: 'module', // Use 'module' to target ECMAScript modules (ESM).
      },
      experiments: {
        outputModule: true, // Enable the output module feature for ESM.
      },
    };
    const compiler = webpack(config);

    compiler.run((err, stats) => {
      if (err) {
        console.error(err);
      }
      else {
        context.bundledFile = path.resolve(config.output.path, config.output.filename);
        context.cloudStorage.storeContractBundle(context.credential);
      }
      console.log(stats!.toString());
    });
    }
}