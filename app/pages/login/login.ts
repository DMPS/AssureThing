import {Component} from '@angular/core'
import {LocationPage} from '../location/location';
import {NavController, NavParams,Loading} from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/common';
import {AuthData} from '../../providers/auth-data/auth-data';
import {ResetPasswordPage} from '../reset-password/reset-password';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [AuthData]
})
export class LoginPage {
  private NextPage: any;
  public params: any;
  public loginForm:any;

  constructor(public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder) {
    this.nav = nav;
    this.authData = authData;
    //Creates the angular 2 form for login
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  loginUser(event){
    //Shows loading until login is done
    event.preventDefault();
    this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password);
    let loading = Loading.create({
      dismissOnPageChange: true,
    });
    this.nav.present(loading);
  }
  goToResetPassword(){
    this.nav.push(ResetPasswordPage);
  }
}
