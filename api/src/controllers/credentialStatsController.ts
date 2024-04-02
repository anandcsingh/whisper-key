// controllers/credentialController.ts
import { Request, Response } from "express";
import { CredentialRepository } from "contract-is-key";

const credentialRepository = new CredentialRepository();

export const getAllCredentials = async (req: Request, res: Response) => {
    try {
        const credentials = await credentialRepository.GetAllCredentials();
        res.status(200).json(credentials);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const getTotalNumberOfIssuedCredentials = async (req: Request, res: Response) => {
    try {
        const issuedCreds = await credentialRepository.GetTotalNumberOfIssuedCredentials();
        res.status(200).json({ count: issuedCreds.length });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const getFirstCreatedCredential = async (req: Request, res: Response) => {
    try {
        const first = await credentialRepository.GetFirstCreatedCredential();
        res.status(200).json(first);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const getMostRecentCredential = async (req: Request, res: Response) => {
    try {
        const last = await credentialRepository.GetMostRecentCredential();
        res.status(200).json(last);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const getMostOwnedCredential = async (req: Request, res: Response) => {
    try {
        const data = await credentialRepository.GroupDocumentsByFieldName('owner');
        const mostOwned = getKeyWithHighestCount(data);
        res.status(200).json({ mostOwned });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

function getKeyWithHighestCount(data: any) {
    let maxCount = 0;
    let keyWithMaxCount = null;

    for (const key in data) {
        if (data[key] > maxCount) {
            maxCount = data[key];
            keyWithMaxCount = key;
        }
    }

    return keyWithMaxCount;
}
