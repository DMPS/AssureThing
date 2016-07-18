import {Component} from '@angular/core'
import {LocationPage} from '../location/location';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  private NextPage: any;
  public params: any;

  constructor(private nav: NavController, navParams: NavParams) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.NextPage = LocationPage;
    this.params = {}
  }
  onTextEntered(value:string, position:number){
    if (position=0) this.params.username = value;
    if (position=1) this.params.password = value;
    console.log(value)
  }
  onButtonClick(event){
    this.nav.setRoot(this.NextPage)
  }
  getLocation() {
    if (navigator.geolocation) {
      let x:string = 'blank';
        navigator.geolocation.getCurrentPosition(function (position:any) {
          console.log(x)
          console.log('Timestamp:'+position.timestamp,'Coordinates:'+position.coords.latitude+','+position.coords.longitude)
        });
    } else {
    }
}
  savePosition(position) {
    
}
}
