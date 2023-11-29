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
    // console.log(fields.cipherText);
    expect(fields.cipherText.length).toBeGreaterThan(0);
  });

  // it('can encrypt and decrypt json data', async () => {
  //   let message = 'This is a secret.';
  //   let messageFields = Encoding.stringToFields(message);

  //   // encrypt
  //   let cipherText = Encryption.encrypt(messageFields, senderAccount);

  //   // decrypt
  //   let decryptedFields = Encryption.decrypt(cipherText, senderKey);
  //   let decryptedMessage = Encoding.stringFromFields(decryptedFields);

  //   expect(decryptedMessage).toEqual(message);
  //   // https://github.com/o1-labs/o1js/blob/2bc9ee9d21a21e27cc7825683e22ebab050c9c9d/src/examples/encryption.ts#L37
  //   // an example and signing @ https://github.com/45930/coinflip-executor-contract/blob/17040a8fcf27afafcb2ef952f53880d01448e7e6/src/executor.test.ts#L287
  // });

  it('can encrypt and decrypt a number', async () => {
    let message = Field(123456789);

    // encrypt
    let cipherText = Encryption.encrypt(message.toFields(), senderAccount);

    // decrypt
    let decryptedFields = Encryption.decrypt(cipherText, senderKey);
    let decryptedMessage = Field.fromFields(decryptedFields);

    expect(decryptedMessage).toEqual(message);
    console.log("decrypted number:",decryptedMessage.toBigInt());
    console.log("origianl number:", message.toBigInt());
  });

  it('can encrypta number, serialize it and decrypt it', async () => {
    let message = Field(123456789);

    // encrypt
    let cipherText = Encryption.encrypt(message.toFields(), senderAccount);

    let serialized = JSON.stringify(cipherText.cipherText);
    let deserialized = { publicKey: senderAccount.toGroup(),  cipherText: JSON.parse(serialized) };

    console.log("deserialized:", deserialized);

    // decrypt
    let decryptedFields = Encryption.decrypt(deserialized, senderKey);
    let decryptedMessage = Field.fromFields(decryptedFields);

    expect(decryptedMessage).toEqual(message);
    console.log("decrypted number:",decryptedMessage.toBigInt());
    console.log("origianl number:", message.toBigInt());
  });

  it('can encrypt and decrypt a number multiple times', async () => {
    let message = Field(123456789);

    // encrypt
    let cipherText = Encryption.encrypt(message.toFields(), senderAccount);

    // decrypt
    let decryptedFields = Encryption.decrypt(cipherText, senderKey);
    let decryptedMessage = Field.fromFields(decryptedFields);

    expect(decryptedMessage).toEqual(message);

    decryptedFields = Encryption.decrypt(cipherText, senderKey);
    expect(decryptedMessage).toEqual(message);

  });

  it('can encrypt and decrypt string compare fields data', async () => {
    // With a longer message
    let message = 'Hello World';

    let messageFields = Encoding.Bijective.Fp.fromString(message);

    let fields = CircuitString.fromString(message).toFields();
    // encrypt
    let cipherText = Encryption.encrypt(fields, senderAccount);

    // decrypt
    let decryptedFields = Encryption.decrypt(cipherText, senderKey);

    let decryptedMessage = Encoding.Bijective.Fp.toString(decryptedFields);
    console.log(decryptedMessage);
    expect(decryptedFields).toEqual(fields);

    //let decryptedMessage = CircuitString.fromFields().fromFields(decryptedFields);
    //expect(decryptedFields).toEqual(fields);
  });

  it('can encrypt and decrypt string compare string data', async () => {
    const str = 'any string';
    const enc = Encryption.encrypt(
      Encoding.Bijective.Fp.fromString(str),
      senderAccount
    );
    const dec = Encoding.Bijective.Fp.toString(
      Encryption.decrypt(
        { publicKey: enc.publicKey, cipherText: enc.cipherText },
        senderKey
      )
    );
    expect(dec).toEqual(str);
  });
});
