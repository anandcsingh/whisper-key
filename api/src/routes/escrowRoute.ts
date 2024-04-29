import express from "express";
import { getPaymentsForAddress, getEscrowPaymentData, addEscrowPaymentData, updatePaymentPublicKey } from "../controllers/escrowController.js";

export const escrowRouter = express.Router();

//Routes
escrowRouter.get('/', getEscrowPaymentData);
escrowRouter.post('/data', addEscrowPaymentData);
escrowRouter.post('/updatepubkey', updatePaymentPublicKey);
escrowRouter.get('/owner/:address', getPaymentsForAddress);
