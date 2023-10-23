
import { InMemoryMentatStore } from "./InMemoryMentatStore";
import { CircuitString, Field, PublicKey } from "o1js";
import { LicenseEntity } from "./LicenseEntity";

import { CredentialRepository } from '../CredentialRepository';
import { CredentialMetadata } from '../CredentialMetadata';
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
 
    let credential = new CredentialMetadata(
      'Test' + Math.random().toString(36).substring(7),
      'Test',
      '1.0',
      new Date(),
      'Test',
      'Test',
      'Test'
    );
    await repo.AddCredential(credential);
  });


});