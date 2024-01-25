import { CredentialRepository } from "contract-is-key";
import cron from 'node-cron';
import { Mina, PublicKey, UInt32 } from "o1js";
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
        blockHeightRepo: BlockHeightRepository,
    ) {
        this.schedule = schedule;
        this.repo = repo;
        this.eventNotification = eventNotification;
        this.blockHeightRepo = blockHeightRepo;
    }

    async start() {
        console.log("Starting Event Polling Job");
        cron.schedule('*/30 * * * * *', async () => {
            try {
                console.log("Starting scheduled Job");
                const Berkeley = Mina.Network({
                    mina: 'https://proxy.berkeley.minaexplorer.com/graphql',
                    archive: 'https://archive.berkeley.minaexplorer.com/',
                });
                Mina.setActiveInstance(Berkeley);
                const startBlock = (await this.blockHeightRepo.getLastBlock()) + 1; // db.info.getHeight get from db in future
                const currentBlock = 3000;// Number(Berkeley.getNetworkState().blockchainLength.toBigint());// get from blockchain

                console.log("Running Event Polling Job");
                const creds = await this.repo.GetAllCredentials();
                for (const cred of creds) {
                    const templatePath = `../../public/credentials/${cred.name}Contract.js`
                    //const { CredentialProxy } = await import(/* webpackIgnore: true */templatePath);
                    //const zkAppAddress = PublicKey.fromBase58(cred.contractPublicKey);
                    // const proxy = new CredentialProxy(zkAppAddress, name, PublicKey.empty, true);
                    // const events = await proxy.fetchEvents(startBlock, currentBlock);
                    const events = [
                        {
                            type: 'issued',
                            data: '{"data":"B62qqzMHkbogU9gnQ3LjrKomimsXYt4qHcXc8Cw4aX7tok8DjuDsAzx","transactionInfo":{}}',
                            blockHeight: 0
                        },
                        {
                            type: 'issued',
                            data: '{"data":"B62qqNZ5uRoJabpHubKLoaGQtHPiJBAoNWiPAHyf1W9iWHWzkko8pYC","transactionInfo":{}}',
                            blockHeight: 0
                        }
                    ];
                    this.eventNotification.pushIssued(cred.name, cred.owner, events);
                }

                // update db with current block
                await this.blockHeightRepo.setLastBlock(currentBlock);
            } catch (e) {
                console.log(e);
            }
        });

    }

}