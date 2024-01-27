import { CredentialMetadata, CredentialRepository } from "contract-is-key";
import { CronJob } from "node-cron";
import { PublicKey, UInt32 } from "o1js";
import { randomUUID } from 'crypto';
import { CreatedCredentialNotification, CreatedCredentialRepository } from "./CreatedCredentialRepository.js";
import { IssuedCredentialNotification, IssuedCredentialRepository } from "./IssuedCredentialRepository.js";
import { ProfileMetadata } from "./ProfileMetadata.js";
import axios from 'axios';
import { NotificationChannel, NotificationChannel } from './NotificationChannel';

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
        const apiUrl = `${process.env.NEXT_PUBLIC_CREDENTIALS_API}/api/profile`;
        const queryString = `walletAddress=${encodeURIComponent(issuer)}`;

        try {
            const response = await axios.get(`${apiUrl}?${queryString}`);
            let profileData = response.data as ProfileMetadata;
            const channel = NotificationChannel.createChannel(profileData.preferredNotificationChannel);
            //TODO:
            // channel.send();
        } catch (error) {
            console.error('Error fetching profile information:', error);
            throw error;
        }
    }

}