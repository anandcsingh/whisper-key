import { CredentialMetadata, CredentialRepository } from "contract-is-key";
import { CronJob } from "node-cron";
import { PublicKey, UInt32 } from "o1js";
import { NotificationData, NotificationsRepository } from "./NotificationsRepository.js";
import { ProfileMetadata } from "./ProfileMetadata.js";
import axios from 'axios';
import { MessageDestination } from "./MessageDestination.js";
import { NotificationChannelFactory } from './NotificationChannelFactory.js';
import { ProfileRepository } from "./ProfileRepository.js";

export class EventNotification {

    repo: NotificationsRepository;
    profileRepo: ProfileRepository;
    constructor() {
        this.repo = new NotificationsRepository();
        this.profileRepo = new ProfileRepository();
    }


    async push(notification: NotificationData) {
        console.log("pushing notification");
        console.log(notification);

        // store in firebase for web notifications
        this.repo.addNotification(notification.toPlainObject());

        // send omni-channel notifications
        const message = `Your credential ${notification.credentialName} has been issued!`;

        //await this.sendNotification(notification.owner, message);

    }

    async pushIssued(name: string, issuer: string, events: any[]) {

        var owner = "";
        // store in firebase for web notifications
        for (const event of events) {
            if (event.type != "issued") {
                continue;
            }
            console.log("pushing issued notification");
            const eventInfo = JSON.parse(event.data);
            owner = eventInfo.data;
            this.push(new NotificationData(name, issuer, owner, event.type))
        }
    }


    private async sendNotification(address: string, message: string) {
        try {
            let profileData = await this.profileRepo.getProfile(address);
            const channel = NotificationChannelFactory.createChannel(profileData.preferredNotificationChannel);
            const destination = new MessageDestination();
            destination.email = profileData.emailAddress;
            destination.phone = profileData.phoneNumber;
            channel.sendMessage(destination, message);
        } catch (error) {
            console.error('Error occurred while attempting to push notification update', error);
            throw error;
        }
    }
}