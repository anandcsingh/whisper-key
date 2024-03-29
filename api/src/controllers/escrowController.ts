import { Request, Response } from "express";
import { Payment } from "../models/Payment";
import { PaymentRequirements } from "../models/PaymentRequirements.js";
import { EscrowPaymentRepository } from "../models/EscrowPaymentRepository.js";
import path from 'path';

export const getEscrowPaymentData = async (req: Request, res: Response) => {
    res.status(200).send({
        success: true
    });
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
    } catch (error) {
        console.log('Error occurred while trying to store escrow payment request', error);
    }
}