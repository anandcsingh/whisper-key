// controllers/profileController.ts
import { Request, Response } from "express";
import { NotificationData, NotificationsRepository } from "../models/NotificationsRepository.js";

const repo: NotificationsRepository = new NotificationsRepository();

export const getInboxCount = async (req: Request, res: Response) => {
    const owner = req.params.owner;
    const count = (await repo.getNotifications(owner)).length;

    res.status(200).send({
        count: count
    });
}

export const getNotifications = async (req: Request, res: Response) => {
    const owner = req.params.owner;
    const notifications = await repo.getNotifications(owner);
    res.status(200).send(notifications);
}

export const setNotifcationsAsSeen = async (req: Request, res: Response) => {
    const seenNotifcations: string[] = req.body;

    for (const notificationId of seenNotifcations) {
        await repo.setNotificationASeen(notificationId);
    }
    
    res.status(200).send({
        success: true
    });
}
