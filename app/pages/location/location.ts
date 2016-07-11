import {Component} from '@angular/core';
import {QuestionsPage} from '../questions/questions'
import {NavController, NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/location/location.html'
})
export class LocationPage {
  private searchQuery: any;
  private items: any;
  private NextPage:any;
  private UserName:string;

  constructor(private nav: NavController, private navParams: NavParams) {
    this.searchQuery = '';
    this.initializeItems();
    this.NextPage = QuestionsPage
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
}
