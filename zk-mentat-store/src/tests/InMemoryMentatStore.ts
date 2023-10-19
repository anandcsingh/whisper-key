import { ZkMentatStore } from "../ZkMentatStore";

export class InMemoryMentatStore extends ZkMentatStore {
  async getAllHashes(): Promise<Map<any, any>> {
    let all = await this.getAll();
    let allHashes = new Map<any, any>();
    all.forEach((value, key) => {
      allHashes.set(key, value.hash());
    });
    return allHashes;
  }
  async clearStore(): Promise<void> {
    this.backingStore.clear();
  }
  backingStore: Map<any, any>;
    keyField: any;
  constructor(backingStore: Map<any, any>, keyField: any) {
    super();
    this.backingStore = backingStore;
this.keyField = keyField;
  }

  async getAll(): Promise<Map<any, any>> {
    return this.backingStore;
  }
  async get(publicKey: any): Promise<any | undefined | null> {
    return this.backingStore.get(publicKey);
  }
  async upsert(entity: any): Promise<void> {
    this.backingStore.set(entity[this.keyField], entity);
  }
}
