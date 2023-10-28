# Whisper Key

![logo](/ui/public/assets/images/logo-sm.png)

## Privacy enhanced Verifiable Credentials (VC) Hub

A platform where Verifiable Credential Issuers can create new types of credentials or reuse existing standards and issue them to owners with ease. Owners selectively disclose some or all the data in their Verifiable Credential with Verifiers via Zero Knowledge proofs while Verifiers obtain only the information needed.

### Features can include

- As an Issuer based on user input automatically generate the definition of a credential and the supporting smart contract to create its proof
- Search for existing credential types
- As an Issuer issue a Verifiable Credential to an Owner
- As an Owner store your Verifiable Credential securely
- As an Owner choose what data you are willing to share with which Verifier
- As a Verifier prove an Owner meets criteria outlined in a smart contract
- An API that allows integration of third-party systems acting as any or all actors Issuers, Owners and Verifiers

### API

The API generates verifiable credentials, saves the credentials to a database and deploys the credentials

#### How to run

- navigate to api folder
- npm install
- npm run build
- npm run start
- Invoke API using Postman or the like
- URL will look like: http://localhost:3000/api/credentials
  - Note: The port for the url can be found in the `app.ts` file of the `src` folder of the `api` project

#### Sample json

`{ "name": "License", "fields":[ { "name": "number", "type": "CircuitString"}, { "name": "name", "type": "CircuitString"} ] }`
