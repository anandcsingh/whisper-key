
import { CredentialMetadata } from '../../CredentialMetadata.js';
import { CreateFileStep } from '../../Pipeline/CreateFileStep';
import { CredentialGenerationContext } from '../../Pipeline/CredentialGenerationContext';
import path from 'path';
import { CredentialGenerationPipeline } from '../../Pipeline/CredentialGenerationPipeline.js';
    const req = {
      "name": "Passport",
      "owner": "3e42",
      "description": "",
      "created": "",
      "version": "",
      "fields":[
          {  "description": "", "name": "number", "type": "CircuitString"},
          { "description": "", "name": "expiryDate", "type": "CircuitString"},
          { "description": "", "name": "unique", "type": "Field"},
          { "description": "", "name": "address", "type": "PublicKey"},
          { "description": "", "name": "name", "type": "CircuitString"}
      ]
  };
  const creds = CredentialMetadata.fromJson(req);
   const pipeline = new CredentialGenerationPipeline(); 
   pipeline.initDefault();
   pipeline.steps = [pipeline.steps[0]];
   pipeline.context.credential = creds;
    
   pipeline.context.saveFilesPath = path.resolve('templates');
   await pipeline.run(creds);