import {Component} from '@angular/core';
import {ionicBootstrap, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LocationPage} from './pages/location/location';
import {LoginPage} from './pages/login/login';
import * as firebase from 'firebase';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform) {
    var config = {
      apiKey: "AIzaSyABOUCttHClIfbbQha7TAKxDxN4pjk5Wt4",
      authDomain: "crossraildemo-6d202.firebaseapp.com",
      databaseURL: "https://crossraildemo-6d202.firebaseio.com",
      storageBucket: "crossraildemo-6d202.appspot.com",
    };
    
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // If there's a user take him to the home page.
        this.rootPage = LocationPage;
      } else {
        // If there's no user logged in send him to the LoginPage
        this.rootPage = LoginPage;
      }
    });    
    
    platform.ready().then(() => {

      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);