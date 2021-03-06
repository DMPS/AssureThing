import { Injectable } from '@angular/core';
import {NavController, Alert} from 'ionic-angular';
import * as firebase from 'firebase';
import {LocationPage} from '../../pages/location/location'

@Injectable()
export class AuthData {
    public fireAuth: any;
    public userProfile: any;
    local: Storage;
    
    constructor(public nav: NavController) {
      this.fireAuth = firebase.auth();
      this.userProfile = firebase.database().ref('/userProfile');
    }

    loginUser(email: string, password: string): any {
      return this.fireAuth.signInWithEmailAndPassword(email, password).then((authData) => {
        this.nav.setRoot(LocationPage);
      }, (error) => {
          let prompt = Alert.create({
            message: error.message,
            buttons: [{text: "Ok"}]
          });
          this.nav.present(prompt);
      });
    }

    resetPassword(email: string): any {
      return this.fireAuth.sendPasswordResetEmail(email).then((user) => {
        let prompt = Alert.create({
          message: "We just sent you a reset link to your email",
          buttons: [{text: "Ok"}]
        });
        this.nav.present(prompt);
    
      }, (error) => {
        var errorMessage: string;
        switch (error.code) {
          case "auth/invalid-email":
            errorMessage = "You'll need to write a valid email address";
            break;
          case "auth/user-not-found":
            errorMessage = "That user does not exist";
            break;
          default:
            errorMessage = error.message;
        }
        
        let prompt = Alert.create({
          message: errorMessage,
          buttons: [{text: "Ok"}]
        });
    
        this.nav.present(prompt);
      });
    }
    
    logoutUser(): any {
      return this.fireAuth.signOut();
    }
}
