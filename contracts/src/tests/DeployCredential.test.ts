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
import * as fs from 'fs';
import * as path from 'path';

let proofsEnabled = false;

describe('DeployCredential', () => {
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

  it('can find current directory', async () => {
    console.log('Current directory:', path.resolve(process.cwd()));
    //const data = fs.readFileSync(path.resolve(process.cwd(), 'settings.json'), { encoding: 'utf8', flag: 'r' });
    expect(true).toBeTruthy();
  });
});
