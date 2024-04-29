import { Request, Response } from "express";
import { Payment } from "../models/Payment";
import { PaymentRequirements } from "../models/PaymentRequirements.js";
import { EscrowPaymentRepository } from "../models/EscrowPaymentRepository.js";

// Get By Id and Payment Status
export const getEscrowPaymentData = async (req: Request, res: Response) => {
    const walletAddress = req.query.walletAddress as string;
    const paymentStatus = req.query.paymentStatus as string;

    let escrowRepo = new EscrowPaymentRepository();
    try {
        let result = await escrowRepo.getPaymentsByStatus(walletAddress, paymentStatus);
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        console.log('Error occurred while getting payment data', error);
        res.send(`Error occurred while getting payment data. ${error}`);
    }
}

export const getPaymentsForAddress = async (req: Request, res: Response) => {
    const walletAddress = req.params.address;

    let escrowRepo = new EscrowPaymentRepository();
    try {
        let result = await escrowRepo.getPaymentsForAddress(walletAddress);
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        console.log('Error occurred while getting payment data', error);
        res.send([]);
    }
}
export const addEscrowPaymentData = async (req: Request, res: Response) => {
    const { walletAddress, payment, paymentReqs, smartContractPublicKey } = req.body;

    if (!walletAddress || !paymentReqs || !payment || !smartContractPublicKey) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    let paymentData = payment as Payment;
    let requirements = paymentReqs as PaymentRequirements;

    try {
        var paymentRepo: EscrowPaymentRepository = new EscrowPaymentRepository();
        paymentRepo.addOrUpdatePayment(paymentData, requirements, walletAddress, smartContractPublicKey);
        res.status(200).json(paymentRepo);
    } catch (error: any) {
        console.log('Error occurred while trying to store escrow payment request', error);
        res.status(error.statusText).send(`Error occurred .....`);
    }
}

export const updatePaymentPublicKey = async (req: Request, res: Response) => {
    const { credentialType, smartContractPublicKey, senderAccount } = req.body;

    let repo = new EscrowPaymentRepository();
    try {
        repo.updatePaymentPublicKey(`${credentialType}${senderAccount}`, smartContractPublicKey);
        res.status(200);
    } catch (error) {

    }
}