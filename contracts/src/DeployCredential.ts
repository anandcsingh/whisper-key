import { AccountUpdate, Mina } from "o1js";

export class DeployCredential {
    async run(credentialName: string) {

         // https://github.com/o1-labs/zkapp-cli/blob/main/src/lib/deploy.js 

        // consider windows vs linux systems in path finding
        let path = ""; // path to credentials contracts folder, combine credential name

        let tx = await Mina.transaction({ sender: feepayerAddress, fee }, () => {
            AccountUpdate.fundNewAccount(feepayerAddress);
            let zkapp = new zkApp(zkAppAddress);
            zkapp.deploy({ verificationKey });
          });

    
    }
}