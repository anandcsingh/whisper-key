import { MerkleMap, Field, PublicKey } from "o1js"

export class MerkleMapState {
  map: MerkleMap;
  nextID: bigint;
  length: number;
}


export abstract class ZkMentatStore {
  async getMerkleMap(): Promise<MerkleMapState> {
    let map = new MerkleMap();
    let index = 0;

    const all = await this.getAllHashes();
    for (let [key, value] of all) {
      map.set(Field(++index), value);
    }
    return {
      map: map,
      nextID: BigInt(index + 1),
      length: all.size,
    };
  }
  abstract getAll(): Promise<Map<any, any>>;
  abstract getAllHashes(): Promise<Map<any, Field>>;
  abstract get(key: any): Promise<any | undefined | null>;
  abstract upsert(entity: any): Promise<void>;
  abstract clearStore(): Promise<void>;
}