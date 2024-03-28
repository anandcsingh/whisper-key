import express from "express";
import { getEscrowPaymentData, addEscrowPaymentData } from "../controllers/escrowController.js";

export const escrowRouter = express.Router();

//Routes
escrowRouter.get('/', getEscrowPaymentData);
escrowRouter.post('/data', addEscrowPaymentData);