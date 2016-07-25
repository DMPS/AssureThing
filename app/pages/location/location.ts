import {Component} from '@angular/core';
import {QuestionsPage} from '../questions/questions'
import {LoginPage} from '../login/login'
import {NavController, NavParams} from 'ionic-angular';
import {AuthData} from '../../providers/auth-data/auth-data'

@Component({
  templateUrl: 'build/pages/location/location.html',
  providers:[AuthData]
})
export class LocationPage {
  private searchQuery: any;
  private items: any;
  private NextPage:any;
  private UserName:string;
  
  constructor(private nav: NavController,public authData: AuthData) {
    this.searchQuery = '';
    this.initializeItems();
    this.NextPage = QuestionsPage
    this.authData = authData
  }
  initializeItems() {
    this.items = [
      'Bond Street',
      'Canary Wharf',
      'Farringdon',
      'Paddington',
      'Tottenham Court Road'      
    ];
  }
  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  locationClicked(event){
    this.nav.push(this.NextPage)
  }
  logOut(){
    this.authData.logoutUser().then(() => {
      this.nav.rootNav.setRoot(LoginPage);
    });
  }
}
