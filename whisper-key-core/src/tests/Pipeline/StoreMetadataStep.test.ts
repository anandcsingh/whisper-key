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
import { CredentialGenerationContext } from '../../Pipeline/CredentialGenerationContext';
import { jest } from '@jest/globals';
import path from 'path';
import { StoreMetadataStep } from '../../Pipeline/StoreMetadataStep';
jest.useFakeTimers()
describe('StoreMetadataStep', () => {

  it('can create file from json', async () => {
    const req = {
      "name": "Passport",
      "owner": "3e42",
      "description": "",
      "created": "",
      "version": "",
      "fields": [
        { "description": "", "name": "number", "type": "CircuitString" },
        { "description": "", "name": "expiryDate", "type": "CircuitString" },
        { "description": "", "name": "unique", "type": "Field" },
        { "description": "", "name": "address", "type": "PublicKey" },
        { "description": "", "name": "name", "type": "CircuitString" }
      ]
    };
    const creds = CredentialMetadata.fromJson(req);
    const step = new StoreMetadataStep();
    const context = new CredentialGenerationContext();
    context.credential = creds;
    expect(creds).toBeDefined();
    await step.run(context);

  });

});
