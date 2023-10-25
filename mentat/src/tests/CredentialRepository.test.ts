
import { InMemoryMentatStore } from "./InMemoryMentatStore";
import { CircuitString, Field, PublicKey } from "o1js";
import { LicenseEntity } from "./LicenseEntity";
import * as crypto from "crypto";

import { CredentialRepository } from '../CredentialRepository';
import { CredentialField, CredentialMetadata } from '../CredentialMetadata';
const Config = {
  apiKey: "AIzaSyBIJmplBy5lylYZo9_D7WX18_seBKnzSF0",
  authDomain: "rankproof-cohort1.firebaseapp.com",
  projectId: "rankproof-cohort1",
  storageBucket: "rankproof-cohort1.appspot.com",
  messagingSenderId: "988704691374",
  appId: "1:988704691374:web:e57bebd121bef8b2fdc93f"
};
describe("CredentialRepository", () => {
  it("should create new credential metadata", async () => {
    let repo = new CredentialRepository();
    await repo.clearMetadataStore();

    let credential = new CredentialMetadata(
      crypto.randomBytes(16).toString("hex"),
      'Test' + Math.random().toString(36).substring(7),
      'Test',
      '1.0',
      new Date(),
      'Test',
      [],
    );
    await repo.AddCredential(credential);
  }, 60000);

  it("should get all credentials metadata", async () => {
    let repo = new CredentialRepository();
    await repo.clearMetadataStore();

    let credential = new CredentialMetadata(
      crypto.randomBytes(16).toString("hex"),
      'Test' + Math.random().toString(36).substring(7),
      'Test',
      '1.0',
      new Date(),
      'Test',
      [
        new CredentialField("First Name", "", "CircuitString"),
        new CredentialField("Last Name", "", "CircuitString"),
        new CredentialField("Licence Number", "", "Field"),
        new CredentialField("Verified", "", "Bool"),
    ],
    );
    await repo.AddCredential(credential);
    credential.id = crypto.randomBytes(16).toString("hex");
    await repo.AddCredential(credential);

    let credentials = await repo.GetCredentials();
    expect(credentials.length).toBe(2);
  });

});