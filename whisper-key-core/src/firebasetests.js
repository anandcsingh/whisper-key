import { CredentialRepository } from "./CredentialRepository";

async function GetNumberOfAllCollectionsTest() {
    const credentialRepository = new CredentialRepository();

    const collectionCount = await credentialRepository.GetNumberOfAllCollections();
    console.log('Number of all collections are:', collectionCount);

}

async function GetTotalNumberOfIssuedCredentialsTest() {
    const credentialRepository = new CredentialRepository();

    const issuedCreds = await credentialRepository.GetTotalNumberOfIssuedCredentials();
    console.log('Number of issued credentials are:', issuedCreds);

}

async function GetIssuedCredentialCountForEachCredentialTypeTest() {
    const credentialRepository = new CredentialRepository();

    const issuedIssuedCredsCountPerType = {};
    issuedIssuedCredsCountPerType = await credentialRepository.GetIssuedCredentialCountForEachCredentialType();
    console.log(issuedIssuedCredsCountPerType);

}

async function CanGroupDocumentsByFieldNameTest() {
    const credentialRepository = new CredentialRepository();

    // Get all documents and group by field name = "issuer", return the groups and the count
    const issuerDocs = credentialRepository.GroupDocumentsByFieldName("DriversPermit", "issuer");
    console.log(issuerDocs);

}

GetNumberOfAllCollectionsTest();
GetTotalNumberOfIssuedCredentialsTest();
GetIssuedCredentialCountForEachCredentialTypeTest();
CanGroupDocumentsByFieldNameTest();

