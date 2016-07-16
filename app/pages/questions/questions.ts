import {Component} from '@angular/core';
import {Alert, NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/questions/questions.html'
})
export class QuestionsPage {
  constructor(private nav: NavController) {
  }
  private boolean:string = 'boolean'
  private number:string = 'number'
  private answer:string = 'answer'
  public answers = [] 
  public questions = [
    {'text':'Are there any tripping hazards?','answerType':'boolean'},
    {'text':'Do the lights work?','answerType':'boolean'},
    {'text':'Are there FATRTRTE any damage marks on the entrance?', 'answerType':'boolean'},
    {'text':'How wide is the platform?','answerType':'number'},
    {'text':'Do the oyster gates work properly?','answerType':'boolean'}
  ]
  onSave(){
    let alert = Alert.create({
      title: 'All Done!',
      subTitle: 'Your quality assurance report has been submitted to the database.',
      buttons: ['OK']
    });
    this.nav.present(alert);
    console.log(this.answers);    
  }
  onclick(question){
    console.log(question)
  }
}
