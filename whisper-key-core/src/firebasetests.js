import { CredentialRepository } from "./CredentialRepository.js";

async function GetNumberOfAllCollectionsTest() {
    const credentialRepository = new CredentialRepository();

    console.log('About to get number of verifiable credentials in firebase');
    const credentials = await credentialRepository.GetAllCredentials();
    credentials.forEach(credential => {
        console.log('Credential found:', credential.id);
    });
    console.log("Total number of credentials:", credentials.length);
}

async function GetTotalNumberOfIssuedCredentialsTest() {
    const credentialRepository = new CredentialRepository();

    const issuedCreds = await credentialRepository.GetTotalNumberOfIssuedCredentials();
    console.log('Number of issued credentials are:', issuedCreds.length);

}

async function GetFirstCreatedCredential() {
    const credentialRepository = new CredentialRepository();

    const first = await credentialRepository.GetFirstCreatedCredential();
    console.log(first);
}

async function GetMostRecentCredential() {
    const credentialRepository = new CredentialRepository();

    const last = await credentialRepository.GetMostRecentCredential();
    console.log(last);
}

async function GetCredentialsMostOwnedBy() {
    const credentialRepository = new CredentialRepository();

    let data = await credentialRepository.GroupDocumentsByFieldName('owner');
    console.log(data);
    
    const mostOwned = getKeyWithHighestCount(data);
    console.log(`Most owned:`, mostOwned);
}

function getKeyWithHighestCount(data) {
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

// Get total created
GetNumberOfAllCollectionsTest();
// Get total issued
GetTotalNumberOfIssuedCredentialsTest();
// First credential
GetFirstCreatedCredential();
// Newest credential
GetMostRecentCredential();
// Most owned by
GetCredentialsMostOwnedBy();