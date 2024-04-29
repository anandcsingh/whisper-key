import express from "express";
import { getVerifications, addVerificationData } from "../controllers/verificationsController.js";

export const verificationsRouter = express.Router();

//Routes
verificationsRouter.get('/:address', getVerifications);
verificationsRouter.post('/', addVerificationData);
