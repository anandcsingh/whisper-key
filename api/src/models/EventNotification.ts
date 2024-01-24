import { CredentialMetadata, CredentialRepository } from "contract-is-key";
import { CronJob } from "node-cron";
import { PublicKey, UInt32 } from "o1js";
import { CreatedCredentialNotification, CreatedCredentialRepository } from "./CreatedCredentialRepository.js";

export class EventNotification {

    repo: CreatedCredentialRepository;
    constructor() {
        this.repo = new CreatedCredentialRepository();  
    }


    async pushCreated(cred: CredentialMetadata) {
        console.log("pushing created notification");
        console.log(cred);
        // store in firebase for web notifications
        const notification: CreatedCredentialNotification 
            = new CreatedCredentialNotification(cred.name, cred.name, cred.owner, false, new Date());
        this.repo.addCredentialCreationNotification(notification.toPlainObject());
        // send omni-channel notifications

    }

    
    async pushIssued(name: string, events: any[]) {
        
        // store in firebase for web notifications

        // send omni-channel notifications

    }

}