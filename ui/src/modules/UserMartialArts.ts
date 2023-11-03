
import { PublicKey } from 'o1js';




export class UserMartialArt {
    hasMartialArt: boolean;
    isInstructor: boolean;
    publicKey: string;
    discipline: string;
    rank: string;
    instructor: string;
    students: Array<any>
    verified: boolean;
}

export class UserMartialArts {

    async getMartialArts(publicKey: string): Promise<Array<UserMartialArt>> {

        let martialArts = new Array<UserMartialArt>();
        let disciples = ["BJJ", "Judo", "Karate"];

        for (let disciple of disciples) {
            let userMartialArt = await this.getMartialArt(publicKey, disciple);
            if (userMartialArt.hasMartialArt) {
                martialArts.push(userMartialArt);
            }
        }
        return martialArts;
    }

    async getMartialArt(publicKey: string, discipline: string): Promise<UserMartialArt> {

        //let backingStore = new FirebaseBackingStore(discipline);

        //let martialArt = await backingStore.get(instructorAddress);
        let practioner = null;//await this.getPractioner(backingStore, publicKey);
        if (practioner == null) {
            return {
                hasMartialArt: false,
                isInstructor: false,
                publicKey: publicKey,
                discipline: discipline,
                rank: "",
                instructor: "",
                students: [],
                verified: false

            };
        }
        else {
            // let students = await backingStore.getAllStudents(publicKey);

            return {
                hasMartialArt: true,
                isInstructor: false,//practioner!.verified && practioner!.rank == "Black Belt",
                publicKey: publicKey,
                discipline: discipline,
                rank: "",//practioner!.rank,
                instructor: "",//practioner!.instructor,
                students: [],//students!,
                verified: false//practioner!.verified
            };
        }
    }



  
}
