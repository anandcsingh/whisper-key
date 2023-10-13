import {MerkleMap, Field, PublicKey} from "o1js"  

export class MerkleMapDatabase {
  map: MerkleMap;
  nextID: bigint;
  length: number;
}


export abstract class BackingStore {
  async getMerkleMap(): Promise<MerkleMapDatabase> {
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
  abstract getAll(): Promise<Map<PublicKey, any>>;
  abstract getAllHashes(): Promise<Map<PublicKey, Field>>;
  abstract get(publicKey: PublicKey): Promise<any | undefined | null>;
  abstract upsert(martialArtist: any): Promise<void>;
  abstract clearStore(): Promise<void>;
}