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
import { CredentialMetadata } from '../CredentialMetadata';
import { CredentialsPipeline } from '../CredentialsPipeline';
  
  /*
   * This file specifies how to test the `Add` example smart contract. It is safe to delete this file and replace
   * with your own tests.
   *
   * See https://docs.minaprotocol.com/zkapps for more info.
   */
  
  let proofsEnabled = false;
  
  describe('CredentialPipeline', () => {
    
  
    it('can deploy end to end', async () => {
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

        const creds: CredentialMetadata = CredentialMetadata.fromJson(req);
        creds.created = new Date();
        const pipeline = new CredentialsPipeline();
        await pipeline.run(creds);
    });
  
  });
  