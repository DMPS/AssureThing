import {Component} from '@angular/core';
import {Alert, NavController, Slides,Loading} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import { QuestionData } from '../../providers/question-data/question-data';
import { AuthData } from '../../providers/auth-data/auth-data';

@Component({
  templateUrl: 'build/pages/questions/questions.html',
  providers:[QuestionData,AuthData]
})
export class QuestionsPage {
  @ViewChild('questionsSlider') slider: Slides;
  constructor(public nav: NavController, private questionData:QuestionData,public authData:AuthData) {
    this.nav = nav;
  }

  private location:string = 'Farringdon';
  private boolean:string = 'boolean';
  private number:string = 'number';
  private answer:string = 'answer';
  private latitude:Number;
  private longitude:Number;
  public answers = []; 
  public questions = [];
  public data = [];
  public uid:string = this.authData.fireAuth.currentUser.uid

  onPageWillEnter(){
    var loading = Loading.create({'content':'Just getting ready.','dismissOnPageChange':true})
    this.nav.present(loading)
    //Get questions from firebase
    this.questionData.locations.child(this.location)
      .on('value',
        data=>{
          this.questions = data.val();
        })
    navigator.geolocation.getCurrentPosition(function (position:any) {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      loading.dismiss()
    })
  }

  onSave(){
    //Show done prompt
    let alert = Alert.create({
      title: 'All Done!',
      subTitle: 'Your quality assurance report has been submitted to the database.',
      buttons: ['OK']
    });
    
    this.nav.present(alert);
    //Send metadata and answers to firebase
    this.questionData.assurers.child(this.uid).child(this.location).child('metadata').set(this.data)
    this.questionData.assurers.child(this.uid).child(this.location).child('answers').set(this.answers)
    console.log('Answers:'+this.answers);
    console.log('Data:'+this.data);     
  }
  recordData(){
    var QuestionPage = this
    var currentIndex = QuestionPage.slider.getActiveIndex();
    var previousIndex = QuestionPage.slider.getPreviousIndex();
    if (currentIndex === 1){
      QuestionPage.data = [];
      QuestionPage.data[0] = {
        'duration': Date.now(),
        'latitude': this.latitude,
        'longitude': this.longitude
      } 
    }
    else if (QuestionPage.slider.isEnd()){
      QuestionPage.data[previousIndex-1].duration = Date.now() - QuestionPage.data[previousIndex-1].duration 
    }
    else if (currentIndex>=2 && !QuestionPage.slider.isEnd()){
      QuestionPage.data[currentIndex-1] = {
        'duration': Date.now(),
        'latitude':this.latitude,
        'longitude':this.longitude
      }
      QuestionPage.data[previousIndex-1].duration = Date.now() - QuestionPage.data[previousIndex-1].duration
    }
  }
}