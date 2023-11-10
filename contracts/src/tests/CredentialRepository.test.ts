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
import { CredentialRepository } from '../CredentialRepository';
import { CredentialMetadata } from '../CredentialMetadata';

let repo = new CredentialRepository();
let credential = new CredentialMetadata(
  'Test',
  'Test',
  'Test',
  '1.0',
  new Date(),
  'Test',
  'Test',
  [],
  'Test',
  'Test',
  'Test',

);
await repo.AddCredential(credential);
