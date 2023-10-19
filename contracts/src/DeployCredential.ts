import { AccountUpdate, Mina, PrivateKey, PublicKey } from 'o1js';
import * as path from 'path';

export class DeployCredential {
  local: boolean;
  constructor(local: boolean) {
    this.local = local;
  }

  async run(credentialName: string) {
    // https://github.com/o1-labs/zkapp-cli/blob/main/src/lib/deploy.js
    let zkAppPrivateKey = PrivateKey.random();
    let feepayerPrivateKey = PrivateKey.random();
    let zkAppAddress = zkAppPrivateKey.toPublicKey();
    let feepayerAddress = feepayerPrivateKey.toPublicKey();
    let fee = 0.01;
    let path = this.getPath(credentialName);
    const { credentialContract } = await import(path);
    const { verificationKey } = await credentialContract.compile(zkAppAddress);
    let tx = await Mina.transaction({ sender: feepayerAddress, fee }, () => {
      AccountUpdate.fundNewAccount(feepayerAddress);
      let zkapp = new credentialContract(zkAppAddress);
      credentialContract.deploy({ verificationKey });
    });

    if (this.local) {
      tx.sign([zkAppPrivateKey, feepayerPrivateKey]).toJSON();
    } else {
      let transactionJSON = tx
        .sign([zkAppPrivateKey, feepayerPrivateKey])
        .toJSON();

      const { hash, isSuccess } = await (window as any).mina.sendTransaction({
        transaction: transactionJSON,
        feePayer: {
          fee: fee,
          memo: '',
        },
      });
    }
  }

  getPath(credentialName: string): string {
    return path.resolve(process.cwd(), 'credentials', credentialName);
  }
}
