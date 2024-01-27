import { CredentialMetadata, CredentialRepository } from "contract-is-key";
import { CronJob } from "node-cron";
import { PublicKey, UInt32 } from "o1js";
import { randomUUID } from 'crypto';
import { NotificationData, NotificationsRepository } from "./NotificationsRepository.js";

export class EventNotification {

    repo: NotificationsRepository;
    constructor() {
        this.repo = new NotificationsRepository();
    }


    async push(notification: NotificationData) {
        console.log("pushing notification");
        console.log(notification);

        // store in firebase for web notifications
        this.repo.addNotification(notification.toPlainObject());

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
            this.push(new NotificationData(name, issuer, eventInfo.data, event.type))
        }
    }

}