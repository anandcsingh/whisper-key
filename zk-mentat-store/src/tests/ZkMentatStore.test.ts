import { CircuitString, Field, PublicKey } from "o1js";
import { FirebaseConfig, FirebaseMentatStore } from "../FirebaseMentatStore";
import { InMemoryMentatStore } from "./InMemoryMentatStore";
import { LicenseEntity } from "./LicenseEntity";
const Config = {
  apiKey: "AIzaSyBIJmplBy5lylYZo9_D7WX18_seBKnzSF0",
  authDomain: "rankproof-cohort1.firebaseapp.com",
  projectId: "rankproof-cohort1",
  storageBucket: "rankproof-cohort1.appspot.com",
  messagingSenderId: "988704691374",
  appId: "1:988704691374:web:e57bebd121bef8b2fdc93f"
};
describe("ZkMentatStore", () => {
  it("should be able to create a new instance and create document", () => {
    let config = {} as FirebaseConfig;
    let store = new FirebaseMentatStore("TestCollection", "publicKey", Config);
    expect(store).toBeTruthy();
  });

  it("should be able to create a new collection", () => {
    let config = {} as FirebaseConfig;
    let store = new FirebaseMentatStore("TestCollection", "publicKey", config);
    store.clearStore();

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

    store.upsert(struct);
    expect(store).toBeTruthy();
  });

});