# Whisper Key

![logo](/ui/public/assets/images/logo-sm.png)

## Privacy enhanced Verifiable Credentials (VC) Hub

A platform where Verifiable Credential Issuers can create new types of credentials or reuse existing standards and issue them to owners with ease. Owners selectively disclose some or all the data in their Verifiable Credential with Verifiers via Zero Knowledge proofs while Verifiers obtain only the information needed.

## Architecture
![architecture](<docs/Whisper Key High Level.png>)

Whisper Key consists of 3 major components: a front-end for visually designing and issuing credentials. An API that generates those credentials in the form of smart contract code and dynamic interaction code. It also provides access to data stored in off-chain storage. An NPM package containing a pipeline for dynamically generating smart contracts, proxy code to dynamically invoke smart contract code and a simple off-chain storage library.

### Whisper UI

The Whisper UI application is the hub of the Whisper Key ecosystem, it allows end users to design credentials capturing the data they need and issue them directly to their customers. Whisper UI generates a form dynamically based on the design of the credential. This allows Issuers to initiate transactions to any type of credential without having to write code. 

#### Features

* Login with Auro Wallet
* Create a new type of credential
* Issue a credential type to Owner
* View created credential types
* View your "Owned" credentials

#### Technology

* NodeJS
* NextJS
* ReactJS
* o1js

#### How to run

Set the following environment variable to point the the api. for example

`NEXT_PUBLIC_CREDENTIALS_API=http://localhost:3001/api/credentials`

Navigate to the ui folder and run the following commands

`npm install && npm run build`

`npm run start` 

### Whisper API

The Whisper API is the workhorse of the Whisper Key ecosystem. The API has 3 major functions

* Generate and Deploy new credential contracts based on user input
* Issue new credentials via invocations of Whisper Key deployed credential contracts
* Retrieve and send data to the off-chain storage solution ZkMentat

The API supports the following endpoints

| VERB | Path                                | Description                                                  |
| ---- | ----------------------------------- | ------------------------------------------------------------ |
| POST | '/api/credentials'                  | Given a contract definition  generates and deploys a new contract based on the data |
| GET  | '/api/credentials/created/:address' | Returns all the credentials generated and deployed by a given wallet address |
| POST | '/api/credentials/issue/:name'      | Issues a new named credential to a given owner with its detail in the body of the request |
| GET  | '/api/credentials/owned/:address'   | Returns all the credentials and Owner has been issued regardless of the Issuer |

#### Technology

* NodeJS
* ExpressJS
* o1js
* ZK Mentat DB

#### How to run

Set the following environment variable to point the the api. for example

`FEE_PAYER=[Private Key of Payer]`

Navigate to the ui folder and run the following commands

`npm install && npm run build`

`npm run start`

#### Known Issues

* Currently only the  FEE_PAYER account can issue credentials, this can be fixed as we go forward. For now set the FEE_PAYER to the Issuer's Private Key

### Whisper Key Core NPM Package

The Whisper Key Core NPM Package is deployed to NPM named `contract-is-key`.  The package brings together several features of Whisper Key that each  have merit on their own. The can be independently developed in the future.

#### ZK Mentat DB

This is a simple Zero Knowledge Database that allows you to store a Merkle Map root on-chain while preserving the data in a data store of your choice. Currently the package has a Firebase backed version of the DB. But you can extend the `ZkMentatStore` abstract class to roll your own implementation. The class structure is below

`export abstract class ZkMentatStore  {`

 `async getMerkleMap(): Promise<MerkleMapState> { ... }`

 `abstract getAll(): Promise<Map<any, IEntity>>;`

 `abstract getAllHashes(): Promise<Map<any, Field>>;`

 `abstract get(key: any): Promise<IEntity | undefined | null>;`

 `abstract upsert(entity: IEntity): Promise<void>;`

 `abstract clearStore(): Promise<void>;`

`}`

