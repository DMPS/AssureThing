import {Component} from '@angular/core';
import {Alert, NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/questions/questions.html'
})
export class QuestionsPage {
  constructor(private nav: NavController) {
  
  }
  onSave(){
    let alert = Alert.create({
      title: 'All Done!',
      subTitle: 'Your quality assurance report has been submitted to the database.',
      buttons: ['OK']
    });
    this.nav.present(alert);    
  }
}
