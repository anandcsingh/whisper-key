import { CredentialRepository } from "contract-is-key";
import { CronJob } from "node-cron";
import { PublicKey, UInt32 } from "o1js";
import { EventNotification } from "./EventNotification";
import { BlockHeightRepository } from "./BlockHeightRepository";

export class EventPolling {
    schedule: string;
    repo: CredentialRepository;
    startBlock: number;
    eventNotification: EventNotification;
    blockchain: any;
    blockHeightRepo: BlockHeightRepository;
    constructor(
        schedule: string,
        repo: CredentialRepository,
        eventNotification: EventNotification,
        blockchain: any,
    blockHeightRepo: BlockHeightRepository,
    ) {
        this.schedule = schedule;
        this.repo = repo;
        this.eventNotification = eventNotification;
        this.blockchain = blockchain;
        this.blockHeightRepo = blockHeightRepo;
    }

    async start() {

        const job = new CronJob(this.schedule, async () => {

            const startBlock = (await this.blockHeightRepo.getLastBlock()) + 1; // db.info.getHeight get from db in future
            const currentBlock = this.blockchain.getNetworkState().blockchainLength;// get from blockchain

            console.log("Running Event Polling Job");
            const creds = await this.repo.GetAllCredentials();
            for (const cred of creds) {
                const templatePath = `../../public/credentials/${cred.name}Contract.js`
                const { CredentialProxy } = await import(/* webpackIgnore: true */templatePath); 
                const zkAppAddress = PublicKey.fromBase58(cred.contractPublicKey);
                const proxy = new CredentialProxy(zkAppAddress, name, PublicKey.empty, true);
                const events = await proxy.fetchEvents(UInt32.from(0));
                this.eventNotification.pushIssued(cred.name, events);
            }

            // update db with current block
            await this.blockHeightRepo.setLastBlock(currentBlock);
        });
        job.start();

    }

}