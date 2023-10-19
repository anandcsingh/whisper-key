import { MartialArtist } from "../../../contracts/src/models/MartialArtist";
import { MartialArtistRepository } from "../../../contracts/src/models/MartialArtistRepository";
import { Sender } from "../../../contracts/src/models/Sender";

export class FirebaseProofRepository implements MartialArtistRepository {
    sender: Sender;
    add(martialArtist: MartialArtist): Promise<boolean> {
        console.log('adding martial artist to firebase: ', martialArtist);
        return Promise.resolve(true);
    }
    promoteStudent(studentID: bigint, instructorID: bigint, newRank: string): Promise<boolean> {
        console.log('promoting student to firebase: ', studentID, instructorID, newRank);
        return Promise.resolve(true);
    }
    verifyRank(martialArtist: MartialArtist, rank: string): boolean {
        throw new Error("Method not implemented.");
    }
}