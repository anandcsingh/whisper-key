import { CredentialRepository } from "contract-is-key";
import { CronJob } from "node-cron";
import { PublicKey, UInt32 } from "o1js";
import { EventNotification } from "./EventNotification";

export class EventPolling {
    schedule: string;
    repo: CredentialRepository;
    startBlock: number;
    eventNotification: EventNotification;
    blockchain: any;
    constructor(
        schedule: string,
        repo: CredentialRepository,
        eventNotification: EventNotification,
        blockchain: any,
    ) {
        this.schedule = schedule;
        this.repo = repo;
        this.eventNotification = eventNotification;
    }

    async start() {

        const job = new CronJob(this.schedule, async () => {

            const startBlock = 0; // db.info.getHeight get from db in future
            const currentBlock = this.blockchain.getNetworkState().blockchainLength;// get from blockchain

            console.log("Running Event Polling Job");
            const creds = await this.repo.GetAllCredentials();
            for (const cred of creds) {
                const templatePath = `../../public/credentials/${cred.name}Contract.js`
                const { CredentialProxy } = await import(/* webpackIgnore: true */templatePath); 
                const zkAppAddress = PublicKey.fromBase58(cred.contractPublicKey);
                const proxy = new CredentialProxy(zkAppAddress, name, PublicKey.empty, true);
                const events = await proxy.fetchEvents(UInt32.from(0));
                this.eventNotification.push(events);
            }

            // update db with current block
            // db.info.setBlock(currentBlock);
        });
        job.start();

    }

}