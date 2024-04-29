import { Request, Response } from "express";
import { VerificationsRepository } from "../models/VerificationsRepository.js";
import { VerificationData } from "../models/VerificationData.js";

// Get By Id and Payment Status
export const getVerifications = async (req: Request, res: Response) => {
    const walletAddress = req.params.address;

    console.log(walletAddress);
    let verificationRepo = new VerificationsRepository();
    try {
        let result = await verificationRepo.getVerifications(walletAddress);
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(200).send([]);
    }
}

export const addVerificationData = async (req: Request, res: Response) => {
    const verification = req.body as VerificationData;

    try {
    let verificationRepo = new VerificationsRepository();
    verificationRepo.addVerification(verification);
       res.status(200).json(verification);
    } catch (error: any) {
        res.status(500).json(verification);
    }
}
