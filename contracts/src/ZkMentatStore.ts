import { MerkleMap, Field, PublicKey } from "o1js"
import { IEntity } from "./IEntity.js";

export class MerkleMapState {
  map: MerkleMap;
  nextID: bigint;
  length: number;

  constructor(map: MerkleMap, nextID: bigint, length: number) {
    this.map = map;
    this.nextID = nextID;
    this.length = length;
  }
}


export abstract class ZkMentatStore  {
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
  abstract getAll(): Promise<Map<any, IEntity>>;
  abstract getAllHashes(): Promise<Map<any, Field>>;
  abstract get(key: any): Promise<IEntity | undefined | null>;
  abstract upsert(entity: IEntity): Promise<void>;
  abstract clearStore(): Promise<void>;
}