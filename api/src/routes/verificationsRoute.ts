import express from "express";
import { getVerificationTemplates, addVerificationTemplate, getVerificationByID, getVerifications, addVerificationData } from "../controllers/verificationsController.js";

export const verificationsRouter = express.Router();

//Routes
verificationsRouter.get('/templates/:address', getVerificationTemplates);
verificationsRouter.post('/templates', addVerificationTemplate);
verificationsRouter.get('/:address/:id', getVerificationByID);
verificationsRouter.get('/:address', getVerifications);
verificationsRouter.post('/', addVerificationData);

