import { Request, Response } from "express";
import { Payment } from "../models/Payment";
import { PaymentRequirements } from "../models/PaymentRequirements";
import { EscrowPaymentRepository } from "../models/EscrowPaymentRepository";

export const getEscrowPaymentData = async (req: Request, res: Response) => {

}

export const addEscrowPaymentData = async (req: Request, res: Response) => {
    const { walletAddress, payment, paymentReqs } = req.body;

    if (!walletAddress || !paymentReqs || !payment) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    let paymentData = payment as Payment;
    let requirements = paymentReqs as PaymentRequirements;

    try {
        var paymentRepo: EscrowPaymentRepository = new EscrowPaymentRepository();
        paymentRepo.addOrUpdatePayment(paymentData, requirements, walletAddress);
    } catch (error) {
        console.log('Error occured while trying to store escrow payment request', error);
    }
}