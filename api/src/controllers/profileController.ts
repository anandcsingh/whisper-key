// controllers/profileController.ts
import { Request, Response } from "express";
import { ProfileRepository } from "../models/ProfileRepository";
import { ProfileMetadata } from "../models/ProfileMetadata";


export const getProfile = async (req: Request, res: Response) => {
    const walletAddress: string | undefined = req.query.walletAddress as string;
    const profileRepository = new ProfileRepository();
    let profile = await profileRepository.getProfile(walletAddress);
    res.status(200).send(profile);
}

export const addOrUpdateProfile = async (req: Request, res: Response) => {
    const { walletAddress, phoneNumber, emailAddress, preferredNotificationChannel } = req.body;

    if (!walletAddress || !phoneNumber || !emailAddress || !preferredNotificationChannel) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    const profileRepository = new ProfileRepository();
    const profileData = new ProfileMetadata(walletAddress, phoneNumber, emailAddress, preferredNotificationChannel);
    profileRepository.addOrUpdateUserProfile(profileData);
    res.status(201).send(profileData);
}
