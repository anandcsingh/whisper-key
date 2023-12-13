import {
  Field,
  Mina,
  PrivateKey,
  PublicKey,
  AccountUpdate,
  CircuitString,
  Encryption,
  Encoding,
  Sign,
  Signature,
} from 'o1js';
import { CredentialMetadata } from '../CredentialMetadata';
import { CredentialsPipeline } from '../CredentialsPipeline';
import { PassportEntity } from '../CredentialProxy';
import { SignedCredential } from '../SignedCredential';

/*
 * This file specifies how to test the `Add` example smart contract. It is safe to delete this file and replace
 * with your own tests.
 *
 * See https://docs.minaprotocol.com/zkapps for more info.
 */

let proofsEnabled = false;

describe('SignedCredential', () => {


  it('can sign', async () => {
    const req = {
      "name": "Passport",
      "owner": "B62qrZhVxxpGGTjWXntrDh5qCC3kboUQ1zjnayYLppMZZ4vfdX8F3x5",
      "description": "",
      "created": "",
      "version": "",
      "fields": [
        { "description": "", "name": "firstName", "type": "CircuitString" },
        { "description": "", "name": "lastName", "type": "CircuitString" },
        { "description": "", "name": "dateOfBirth", "type": "CircuitString" },
        { "description": "", "name": "expiryDate", "type": "CircuitString" },
        { "description": "", "name": "passportNumber", "type": "CircuitString" },
        { "description": "", "name": "nationality", "type": "CircuitString" },
      ]
    };

    const creds: CredentialMetadata = CredentialMetadata.fromJson(req);
    creds.created = new Date();

    const passportEntity = PassportEntity.fromPlainObject({
      id: '123',
      credentialType: 'Passport',
      issuer: 'B62qrZhVxxpGGTjWXntrDh5qCC3kboUQ1zjnayYLppMZZ4vfdX8F3x5',
      owner: 'B62qrZhVxxpGGTjWXntrDh5qCC3kboUQ1zjnayYLppMZZ4vfdX8F3x5',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '01/01/1970',
      expiryDate: '01/01/2022',
      passportNumber: '123456789',
      nationality: 'USA'
    });

    const privateKey = PrivateKey.random();
    const signedCred = new SignedCredential(creds, privateKey.toBase58());
    const credential = signedCred.sign(passportEntity);
    console.log(credential);

    const signature = Signature.fromBase58(credential.signature);
    const data = signedCred.getFieldDataCollection(passportEntity);
    const verified = signature.verify(privateKey.toPublicKey(), data);
    expect(credential).toBeDefined();
    expect(verified.toBoolean()).toBeTruthy();
  });

});
