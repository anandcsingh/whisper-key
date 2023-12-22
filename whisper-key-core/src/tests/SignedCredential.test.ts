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
  Scalar,
} from 'o1js';
import { CredentialMetadata } from '../CredentialMetadata';
import { CredentialsPipeline } from '../CredentialsPipeline';
import { PassportEntity } from '../CredentialProxy';
import { SignedCredential } from '../SignedCredential';
import crypto from 'crypto';

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

  it('can serialize signature and verify hash', async () => {
    const privateKey = PrivateKey.random();

    const cred = {
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
    };

    // client signs the credential
    const clientJson = JSON.stringify(cred);
    const clientHash = crypto.createHash('sha256').update(clientJson).digest('hex');
    const clientSignature = Signature.create(privateKey, CircuitString.fromString(clientHash).toFields());
  
    // client sends the credential and signature to the server
    const serializedSignature = clientSignature.toBase58();

    // server verifies the signature
    const serverHash = crypto.createHash('sha256').update(clientJson).digest('hex');
    const transportedSignature = Signature.fromBase58(serializedSignature);
    const verified = transportedSignature.verify(privateKey.toPublicKey(), CircuitString.fromString(serverHash).toFields());
    expect(verified.toBoolean()).toBeTruthy();
  });
  
  it('invalid data fails verify', async () => {
    const privateKey = PrivateKey.random();

    const cred = {
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
    };

    // client signs the credential
    const clientJson = JSON.stringify(cred);
    const clientHash = crypto.createHash('sha256').update(clientJson).digest('hex');
    const clientSignature = Signature.create(privateKey, CircuitString.fromString(clientHash).toFields());
  
    // client sends the credential and signature to the server
    const serializedSignature = clientSignature.toBase58();

    // server verifies the invalid signature
    cred.firstName = "Jane";
    const invalidClientJson = JSON.stringify(cred);
    const serverHash = crypto.createHash('sha256').update(invalidClientJson).digest('hex');
    const transportedSignature = Signature.fromBase58(serializedSignature);
    const verified = transportedSignature.verify(privateKey.toPublicKey(), CircuitString.fromString(serverHash).toFields());
    expect(verified.toBoolean()).toBeFalsy();
  });

  it('can verify signature from auro', async () => {
    const privateKey = PrivateKey.random();

    const request   = {"data":{"owner":"B62qrZhVxxpGGTjWXntrDh5qCC3kboUQ1zjnayYLppMZZ4vfdX8F3x5","Time":"12","Stop":"12","issuer":"B62qrZhVxxpGGTjWXntrDh5qCC3kboUQ1zjnayYLppMZZ4vfdX8F3x5","credentialType":"DeclareTime"},
    "hash":"1216d101a5016fbbcb8c0df2896be04517197aea2f92a4f5fdd117a6633795ae",
    "signResult":"7mXCzrtW7KxZkYEDi1LRvwAkxYUnT99s3yvzsSdXD2Uw8tsPXDxMKXK2m6tLQXtfBXqwGmAi7PaRzAnZxxJGxjyzUVDeZ83h"}

    const signatureJson = {
      "signature": {
          "field": "9210022359405050608824861496380483949808720947153451299496618614614426062446",
          "scalar": "24300077718074168807590934528324640827732566755573655281653809118784765936185"
      },
      "publicKey": "B62qrZhVxxpGGTjWXntrDh5qCC3kboUQ1zjnayYLppMZZ4vfdX8F3x5",
      "data": "1216d101a5016fbbcb8c0df2896be04517197aea2f92a4f5fdd117a6633795ae"
  };

  // const jsonSignature = Signature.fromObject({
  //   r: Field(signatureJson.signature.field),
  //   s: Scalar.fromJSON(s.toString()),
  // });
  const jsonSignature = new Signature(Field(signatureJson.signature.field), Scalar.fromBigInt(BigInt(signatureJson.signature.scalar)));
  console.log("jsonSignature base 58:", jsonSignature.toBase58());

    //const jsonSignature = Signature.fromJSON(signatureJson.signature);

    const clientJson = JSON.stringify(request.data);
    const clientHash = crypto.createHash('sha256').update(clientJson).digest('hex');
    expect(request.hash).toEqual(clientHash);

    const transportedSignature = Signature.fromBase58(request.signResult);
    const verified = jsonSignature.verify(PublicKey.fromBase58("B62qrZhVxxpGGTjWXntrDh5qCC3kboUQ1zjnayYLppMZZ4vfdX8F3x5"), CircuitString.fromString(clientHash).toFields());
    expect(verified.toBoolean()).toBeTruthy();
  });

  
  it('signature from auro and o1js same', async () => {
    const privateKey = PrivateKey.fromBase58("EKEjzZdcsuaThenLan7UkQRxKXwZGTC2L6ufbCg4X5M9WF6UJx2j");
    const hash = "1216d101a5016fbbcb8c0df2896be04517197aea2f92a4f5fdd117a6633795ae";
    const auroSignature = "7mXCzrtW7KxZkYEDi1LRvwAkxYUnT99s3yvzsSdXD2Uw8tsPXDxMKXK2m6tLQXtfBXqwGmAi7PaRzAnZxxJGxjyzUVDeZ83h";
    
    const signature = Signature.create(privateKey, CircuitString.fromString(hash).toFields());
    const o1Signature = signature.toBase58();
    expect(o1Signature).toEqual(auroSignature);
  });
});
