import {Injectable} from '@angular/core';
// if you've gone with the local installation approach, you'd use the following:
import * as firebase from 'firebase';

@Injectable()
export class QuestionData {
    public db: any;
    public assurers:any;
    public locations:any;
    
    constructor() {
        this.db = firebase.database();
        this.assurers = firebase.database().ref('/assurers/');
        this.locations = firebase.database().ref('/locations/');
    }
}

