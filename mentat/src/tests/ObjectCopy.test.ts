import { CircuitString, Field, PublicKey, Struct } from "o1js";
import { LicenseEntity } from "./LicenseEntity";
import { FirebaseConfig, FirebaseMentatStore } from "../FirebaseMentatStore";

describe("ObjectCopy", () => {
    const Config = {
        apiKey: "AIzaSyBIJmplBy5lylYZo9_D7WX18_seBKnzSF0",
        authDomain: "rankproof-cohort1.firebaseapp.com",
        projectId: "rankproof-cohort1",
        storageBucket: "rankproof-cohort1.appspot.com",
        messagingSenderId: "988704691374",
        appId: "1:988704691374:web:e57bebd121bef8b2fdc93f"
      } as FirebaseConfig;

  it("can copy to new object", async () => {
    let licence = {
        id: Field(1),
        publicKey: PublicKey.empty(),
        firstName: CircuitString.fromString("John"),
        lastName: CircuitString.fromString("Doe"),
        licenceNumber: CircuitString.fromString("123"),
        createdDate: CircuitString.fromString("2021-01-01"),
        expiryDate: CircuitString.fromString("2021-01-01"),
        class: CircuitString.fromString("A"),
      };
      let struct = new LicenseEntity(licence);
      
      console.log(struct.toPlainObject());
      expect(struct).toBeTruthy();
  });

  it("can store plain object in Firebase", async () => {
    let licence = {
        id: Field(2),
        publicKey: PublicKey.empty(),
        firstName: CircuitString.fromString("John"),
        lastName: CircuitString.fromString("Doe"),
        licenceNumber: CircuitString.fromString("123"),
        createdDate: CircuitString.fromString("2021-01-01"),
        expiryDate: CircuitString.fromString("2021-01-01"),
        class: CircuitString.fromString("c"),
      };
      let struct = new LicenseEntity(licence);
      let store = new FirebaseMentatStore("Licenses", "class", Config);
      await store.upsert(struct);
      expect(struct).toBeTruthy();
  });

});