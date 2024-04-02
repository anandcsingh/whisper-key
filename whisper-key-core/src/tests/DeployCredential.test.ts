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
import { ContractDeployer } from '../ContractDeployer';

let proofsEnabled = false;

describe('DeployCredential', () => {
  

  it('can deploy', async () => {
    const feePayerPrivateKey = "EKEaxBppkxKjn7a9rRVCxFsuGur9Xqy6KKVYE9jA4qeRvYA5fzix";//B62qpcuTN9rFhdfkHyZmttMzHqnteygvpPbg3WAdGhb3eZCnHE4DCcZ

    const deployer = new ContractDeployer(feePayerPrivateKey);
    const tr = await deployer.deployCredential("DiscordBadge", "");
    console.log(tr.transactionUrl)


    expect(true).toBeTruthy();
  });
});
