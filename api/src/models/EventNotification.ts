import { CredentialMetadata, CredentialRepository } from "contract-is-key";
import { CronJob } from "node-cron";
import { PublicKey, UInt32 } from "o1js";
import {randomUUID} from 'crypto';
import { CreatedCredentialNotification, CreatedCredentialRepository } from "./CreatedCredentialRepository.js";
import { IssuedCredentialNotification, IssuedCredentialRepository } from "./IssuedCredentialRepository.js";

export class EventNotification {

    addRepo: CreatedCredentialRepository;
    issuedRepo: IssuedCredentialRepository;
    constructor() {
        this.addRepo = new CreatedCredentialRepository();  
        this.issuedRepo = new IssuedCredentialRepository();
    }


    async pushCreated(cred: CredentialMetadata) {
        console.log("pushing created notification");
        console.log(cred);
        // store in firebase for web notifications
        const notification: CreatedCredentialNotification 
            = new CreatedCredentialNotification(cred.name, cred.name, cred.owner, false, new Date());
        this.addRepo.addCredentialCreationNotification(notification.toPlainObject());
        // send omni-channel notifications

    }
    
    async pushIssued(name: string, issuer: string, events: any[]) {
        
        // store in firebase for web notifications
        for (const event of events) {
            if (event.type != "issued") {
                continue;
            }
            console.log("pushing issued notification");
            const eventInfo = JSON.parse(event.data);
            const id = randomUUID();
            const notification: IssuedCredentialNotification 
                = new IssuedCredentialNotification(id, name, issuer, eventInfo.data, false, new Date());
            this.issuedRepo.addIssuesdredentialNotification(notification.toPlainObject());
        }

        // send omni-channel notifications
       
    }

}