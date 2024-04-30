import { Request, Response } from "express";
import { VerificationsRepository } from "../models/VerificationsRepository.js";
import { VerificationData } from "../models/VerificationData.js";

// Get By Id and Payment Status
export const getVerifications = async (req: Request, res: Response) => {
    const walletAddress = req.params.address;

    console.log(walletAddress);
    let verificationRepo = new VerificationsRepository();
    try {
        console.log("Verifications", walletAddress);
        let result = await verificationRepo.getVerifications(walletAddress);
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(200).send([]);
    }
}

export const getVerificationByID = async (req: Request, res: Response) => {
    const walletAddress = req.params.address;
    const id = req.params.id;

    let verificationRepo = new VerificationsRepository();
    try {
        let result = await verificationRepo.getVerificationByID(id);
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(404).send();
    }
}

export const addVerificationData = async (req: Request, res: Response) => {
    const verification = req.body as VerificationData;

    try {
    let verificationRepo = new VerificationsRepository();
    verificationRepo.addVerification(verification);

    //TODO: verify signature, then send notification to owner
       res.status(200).json(verification);
    } catch (error: any) {
        res.status(500).json(verification);
    }
}

export const addVerificationTemplate = async (req: Request, res: Response) => {
    const verification = req.body as any;

    try {
    let verificationRepo = new VerificationsRepository();
    await verificationRepo.addVerificationTemplate(verification);
    //TODO: deploy verification template to blockchain
       res.status(200).json(verification);
    } catch (error: any) {
        res.status(500).json(verification);
    }
}

export const getVerificationTemplates = async (req: Request, res: Response) => {
    const walletAddress = req.params.address;

    console.log("Veri templates", walletAddress);
    let verificationRepo = new VerificationsRepository();
    try {
        let result = await verificationRepo.getVerificationTemplates(walletAddress);
        console.log("veri", result);
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(200).send([]);
    }
}
