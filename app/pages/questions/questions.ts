import {Component} from '@angular/core';
import {Alert, NavController, Slides} from 'ionic-angular';
import {ViewChild} from '@angular/core';

@Component({
  templateUrl: 'build/pages/questions/questions.html'
})
export class QuestionsPage {
  @ViewChild('questionsSlider') slider: Slides;
  constructor(private nav: NavController) {
  }
  private boolean:string = 'boolean'
  private number:string = 'number'
  private answer:string = 'answer'
  public answers = [] 
  public questions = [
    {'text':'Are there any tripping hazards?','answerType':'boolean'},
    {'text':'Do the lights work?','answerType':'boolean'},
    {'text':'Are there any damage marks on the entrance?', 'answerType':'boolean'},
    {'text':'How wide is the platform?','answerType':'number'},
    {'text':'Do the oyster gates work properly?','answerType':'boolean'}
  ]
  public data = [];
  //Intialize data recording
  // ngAfterViewInit() {
  //   this.recordData()
  // }
  onSave(){
    let alert = Alert.create({
      title: 'All Done!',
      subTitle: 'Your quality assurance report has been submitted to the database.',
      buttons: ['OK']
    });
    this.nav.present(alert);
    console.log('Answers:'+this.answers);
    console.log('Data:'+this.data);     
  }
  recordData(){
    var QuestionPage = this
    var currentIndex = QuestionPage.slider.getActiveIndex();
    var previousIndex = QuestionPage.slider.getPreviousIndex();
    console.log(currentIndex,previousIndex)
    console.log(QuestionPage.data);
    navigator.geolocation.getCurrentPosition(
      function (position){
        console.log('called',position);
        if (currentIndex === 1){
          console.log('beginning');
          QuestionPage.data = [];
          QuestionPage.data[0] = {
            'duration': position.timestamp,
            'latitude': position.coords.latitude,
            'longitude': position.coords.longitude
          } 
        }
        else if (QuestionPage.slider.isEnd()){
          console.log('end');
          QuestionPage.data[previousIndex-1].duration = position.timestamp - QuestionPage.data[previousIndex-1].duration 
        }
        else {
          console.log('middle');
          QuestionPage.data[currentIndex-1] = {
            'duration': position.timestamp,
            'latitude':position.coords.latitude,
            'longitude':position.coords.longitude
          }
          QuestionPage.data[previousIndex-1].duration = position.timestamp - QuestionPage.data[previousIndex-1].duration
        } 
      }
    );
  }
}