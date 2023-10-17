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

/*
 * This file specifies how to test the `Add` example smart contract. It is safe to delete this file and replace
 * with your own tests.
 *
 * See https://docs.minaprotocol.com/zkapps for more info.
 */

let proofsEnabled = false;

describe('Encrypt', () => {
  let deployerAccount: PublicKey,
    deployerKey: PrivateKey,
    senderAccount: PublicKey,
    senderKey: PrivateKey,
    zkAppAddress: PublicKey,
    zkAppPrivateKey: PrivateKey;

  beforeEach(() => {
    const Local = Mina.LocalBlockchain({ proofsEnabled });
    Mina.setActiveInstance(Local);
    ({ privateKey: deployerKey, publicKey: deployerAccount } =
      Local.testAccounts[0]);
    ({ privateKey: senderKey, publicKey: senderAccount } =
      Local.testAccounts[1]);
  });

  it('can encrypt json data', async () => {
    let credential = {
      name: 'John Doe',
      email: 'john.doe@whisper-key.com',
      phone: '555-555-5555',
      address: '123 Main St, Anytown, USA',
      ssn: '123-45-6789',
      dob: '01/01/1970',
    };
    let credentialString = CircuitString.fromString(credential.email);
    let credentialField = credentialString.toFields();
    let fields = Encryption.encrypt(credentialField, senderAccount);
    console.log(fields.cipherText);
    expect(fields.cipherText.length).toBeGreaterThan(0);
  });

  it('can encrypt and decrypt json data', async () => {
    let message = 'This is a secret.';
    let messageFields = Encoding.stringToFields(message);

    // encrypt
    let cipherText = Encryption.encrypt(messageFields, senderAccount);

    // decrypt
    let decryptedFields = Encryption.decrypt(cipherText, senderKey);
    let decryptedMessage = Encoding.stringFromFields(decryptedFields);

    expect(decryptedMessage).toEqual(message);

    // an example and signing @ https://github.com/45930/coinflip-executor-contract/blob/17040a8fcf27afafcb2ef952f53880d01448e7e6/src/executor.test.ts#L287
  });
});
