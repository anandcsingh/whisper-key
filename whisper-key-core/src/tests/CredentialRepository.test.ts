import {
  Field,
  Mina,
  PrivateKey,
  PublicKey,
  AccountUpdate,
  CircuitString,
  Encryption,
  Encoding,
} from 'o1js';
import * as fs from 'fs';
import { CredentialRepository } from '../CredentialRepository.js';
import { CredentialMetadata } from '../CredentialMetadata.js';

let repo = new CredentialRepository();
let credential = await repo.GetCredential('Whisper');
console.log("credential:", credential);
// let credential = new CredentialMetadata(
//   'Test',
//   'Test',
//   'Test',
//   '1.0',
//   new Date(),
//   'Test',
//   'Test',
//   [],
//   'Test',
//   'Test',
//   'Test',

// );
// await repo.AddCredential(credential);
