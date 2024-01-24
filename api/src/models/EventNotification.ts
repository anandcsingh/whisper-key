import { CredentialMetadata, CredentialRepository } from "contract-is-key";
import { CronJob } from "node-cron";
import { PublicKey, UInt32 } from "o1js";

export class EventNotification {

    async pushCreated(cred: CredentialMetadata) {
        
        // store in firebase for web notifications

        // send omni-channel notifications

    }

    
    async pushIssued(name: string, events: any[]) {
        
        // store in firebase for web notifications

        // send omni-channel notifications

    }

}