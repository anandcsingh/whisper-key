import {
  Field,
  Mina,
  PrivateKey,
  PublicKey,
  AccountUpdate,
  CircuitString,
  Encryption,
  Encoding,
} from 'o1js';
import { CredentialMetadata } from '../../CredentialMetadata';
import { CreateFileStep } from '../../Pipeline/CreateFileStep';
import { CredentialGenerationContext } from '../../Pipeline/CredentialGenerationPipeline';
import {jest} from '@jest/globals';
import path from 'path';
jest.useFakeTimers()
describe('CreateFileStep', () => {
 
  it('can create file from json', async () => {
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
   const step = new CreateFileStep();
   const context = new CredentialGenerationContext();
   context.credential = creds;
   context.templatePath = path.resolve('templates/CredentialTemplate.mustache');
    expect(creds).toBeDefined();
    await step.run(context);
    expect(context.generatedFile).toBeDefined();
  });

});
