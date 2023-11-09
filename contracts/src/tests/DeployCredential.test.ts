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
    const deployer = new ContractDeployer();
    const tr = await deployer.deployCredential("DiscordBadge");
    console.log(tr.transactionUrl)


    expect(true).toBeTruthy();
  });
});
