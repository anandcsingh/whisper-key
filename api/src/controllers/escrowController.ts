import { Request, Response } from "express";
import { Payment } from "../models/Payment";
import { PaymentRequirements } from "../models/PaymentRequirements";
import { EscrowPaymentRepository } from "../models/EscrowPaymentRepository";
import { ContractDeployer } from '../../../whisper-key-core/src/ContractDeployer';

export const getEscrowPaymentData = async (req: Request, res: Response) => {
    res.status(200);
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
        res.status(200).json(paymentRepo);
    } catch (error) {
        console.log('Error occured while trying to store escrow payment request', error);
    }

    // Now, deploy the smart contract 
    let deployer = new ContractDeployer();
    let escrowContractPath = "";
    var transactionUrl = "";
    try {
        let result = await deployer.deployCredential(`${requirements.credentialMeta.name}${walletAddress}`, escrowContractPath);
        transactionUrl = result.transactionUrl;
    } catch (error) {
        console.log(`An error occurred while trying to deploy smart contract: ${requirements.credentialMeta.name} for ${walletAddress}. 
            '/n' ${error} `);
    }
}