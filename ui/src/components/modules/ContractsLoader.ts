import { PublicKey } from "snarkyjs";
import AddBjjRankWorkerClient from "./workers/bjj/AddBjjRankWorkerClient";
import PromoteBjjStudentWorkerClient from "./workers/bjj/PromoteBjjStudentWorkerClient";
import ProveBjjRankWorkerClient from "./workers/bjj/ProveBjjRankWorkerClient";
import RevokeBjjStudentWorkerClient from "./workers/bjj/RevokeBjjStudentWorkerClient";

export class ContractsLoader {
    contracts: any;
    addresses: any;
    constructor() {
        

        this.addresses = {
            BJJ: {
                add: "B62qnQpnwWNr7b9sbEtdQVdf8Ckprm9WGmHfk7Cum2ZLL69HaiM9R5B",
                promote: "B62qrrwFn6GbeVJats2Qk86xRS3JBDhdfEyM1zmMP4hc8bwrfgrDPmT",
                // prove: new ProveBjjRankWorkerClient(),
                // revoke: new RevokeBjjStudentWorkerClient(),
            },
        };

        this.contracts = {
            BJJ: {
                add: new AddBjjRankWorkerClient(),
                promote: new PromoteBjjStudentWorkerClient(),
                // prove: new ProveBjjRankWorkerClient(),
                // revoke: new RevokeBjjStudentWorkerClient(),
            },
        };
    }
    async loadAll() {
        let discipline = "BJJ";
        let contract = this.contracts[discipline]["add"];
        let contractAddress = "B62qnQpnwWNr7b9sbEtdQVdf8Ckprm9WGmHfk7Cum2ZLL69HaiM9R5B";
        await contract.loadContract();
        console.log("loaded contract");
        await contract.compileContract();
        console.log("compiled contract");
        //const contractAddress = 'B62qqEme9EYMj3KC4vSXij2vAwt8qxLiKLsrHPprQeYXXmjTFUH16wF';
        const zkappPublicKey = PublicKey.fromBase58(contractAddress);
        await contract.initZkappInstance(zkappPublicKey);
        console.log("initialized zkapp instance");

    }

}
