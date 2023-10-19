import {
    Bool,
    CircuitString,
    Field,
    MerkleMap,
    MerkleTree,
    Mina,
    Poseidon,
    Proof,
    PublicKey,
    Struct,
} from 'snarkyjs';

import type { ProofOfRank } from '../../../contracts/src/ProofOfRank';
import { MartialArtist } from '../../../contracts/src/models/MartialArtist';
import { Sender } from '../../../contracts/src/models/Sender';
import { MartialArtistRepository } from '../../../contracts/src/models/MartialArtistRepository';


export class ProofWebInMemoryRepository implements MartialArtistRepository {
    sender: Sender;
    contract: ProofOfRank;
    merkleMap: MerkleMap;
    backingStore: Map<bigint, MartialArtist>;
    merkleTree: MerkleTree;
    zkClient: any;

    constructor(sender: Sender, contract: ProofOfRank, zkClient: any);
    constructor(
        sender: Sender,
        contract: ProofOfRank,
        zkClient: any,
        merkleMap?: MerkleMap,
        backingStore?: Map<bigint, MartialArtist>
    ) {
        this.sender = sender;
        this.contract = contract;
        this.zkClient = zkClient;
        this.merkleMap = merkleMap ? merkleMap : new MerkleMap();
        this.backingStore = backingStore
            ? backingStore
            : new Map<bigint, MartialArtist>();
    }

    async get(id: bigint): Promise<any> {
        const ma = this.backingStore.get(id);
        const onChainRoot = await this.zkClient.getStorageRoot();
        if (ma) {
            const witness = this.merkleMap.getWitness(ma?.id ?? Field(0));
            const [currentRoot, _] = witness.computeRootAndKey(
                ma?.hash() ?? Field(0)
            );
            console.log('witness: ', currentRoot.toString());
            if (onChainRoot.toString() == currentRoot.toString()) {
                return ma;
            } else {
                return undefined;
            }
        }
    }

    async add(martialArtist: MartialArtist): Promise<boolean> {
        const currentRoot = this.merkleMap.getRoot();
        this.merkleMap.set(martialArtist.id, martialArtist.hash());
        const witness = this.merkleMap.getWitness(martialArtist.id);

        this.zkClient.addPractitioner(martialArtist, witness, currentRoot);
        this.zkClient.proveUpdateTransaction();
        const txhHash = this.zkClient.sendTransaction();
        return true;
    }

    async promoteStudent(
        studentID: bigint,
        instructorID: bigint,
        newRank: string
    ): Promise<boolean> {
        const student = await this.get(studentID);
        const instructor = await this.get(instructorID);
        if (student != null && instructor != null) {
            const witness = this.merkleMap.getWitness(student?.id ?? Field(0));
            const txn1 = await Mina.transaction(this.sender.publicKey, () => {
                this.contract.promoteStudent(
                    student,
                    instructor,
                    CircuitString.fromString(newRank),
                    witness
                );
            });

            this.zkClient.proveUpdateTransaction();
            const txhHash = this.zkClient.sendTransaction();
            student.rank = CircuitString.fromString(newRank);
            this.backingStore.set(studentID, student);
            this.merkleMap.set(Field(studentID), student.hash());
            return true;
        } else {
            return false;
        }
    }
    verifyRank(martialArtist: MartialArtist, rank: string): boolean {
        throw new Error('Method not implemented.');
    }
}
