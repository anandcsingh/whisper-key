

import { PublicKey } from 'snarkyjs';

export class AlertRepository {
    
    alertInstructor(studentID: string, instructorID: string, martialArt: string, newRank: string): Promise<boolean> {
        // store alert in firebase
        // on log in, check for alerts for instructor
        console.log('alerting instructor: ', studentID, instructorID, martialArt, newRank);
        return Promise.resolve(true);
    }   

}
