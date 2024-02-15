import express from "express";
import { getAllCredentials, getTotalNumberOfIssuedCredentials, getFirstCreatedCredential, getMostRecentCredential, getMostOwnedCredential } from "../controllers/credentialStatsController.js";

export const credsStatsRouter = express.Router();

// Routes
credsStatsRouter.get('/', getAllCredentials);
credsStatsRouter.get('/issued', getTotalNumberOfIssuedCredentials);
credsStatsRouter.get('/first', getFirstCreatedCredential);
credsStatsRouter.get('/recent', getMostRecentCredential);
credsStatsRouter.get('/most-owned', getMostOwnedCredential);