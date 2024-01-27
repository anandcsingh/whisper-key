import { CredentialMetadata, CredentialRepository } from "contract-is-key";
import { CronJob } from "node-cron";
import { PublicKey, UInt32 } from "o1js";
import {  randomUUID  } from 'crypto';
import { NotificationData, NotificationsRepository } from "./NotificationsRepository.js";
import { ProfileMetadata } from "./ProfileMetadata.js";
import axios from 'axios';
import { NotificationChannel, NotificationChannel } from './NotificationChannel';

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