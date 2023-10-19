import { InMemoryMentatStore } from "./InMemoryMentatStore";

describe("ZkMentatStore", () => {
  it("should be able to create a new instance", () => {
    let store = new InMemoryMentatStore(new Map(), "publicKey");
    expect(store).toBeTruthy();
  });
});