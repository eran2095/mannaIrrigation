import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MannaApi } from '../../shared/shared';
import {HomePage} from '../pages';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  objUserLogin :any= { "email": "", "password": "" };
  showPass:boolean = false;
  public type = 'password';

  constructor(public navCtrl: NavController, public navParams: NavParams ,public mannaApi:MannaApi ,public loadingController:LoadingController ,
    public alertCtrl:AlertController) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email ]),
      password: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
  }

  showAlert(strMsg) {
    let alert = this.alertCtrl.create({
      title: 'Note !',
      subTitle: strMsg,
      buttons: ['Ok']
    });
    alert.present();
  }

  getFarmsAndGoToHome()
  {
    let loader = this.loadingController.create({
      content: 'Loading Data ...'
    });
    loader.present().then(() => {
      this.mannaApi.getFarms( ).subscribe(data => {
        this.navCtrl.setRoot(HomePage,data);
        loader.dismiss();
      }, err => {
        loader.dismiss();
        this.showAlert(err.json().message);
      });
    });
  }

  btnLogin()
  {
    let loader = this.loadingController.create({
      content: 'Signing In ...'
    });
    loader.present().then(() => {
      this.mannaApi.doLogin(this.objUserLogin.email,this.objUserLogin.password).subscribe(data => {
        this.getFarmsAndGoToHome();
        loader.dismiss();
      }, err => {
        loader.dismiss();
        this.showAlert(err.json().message);
      });
    });
  }

  showPassword() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    
  }

}
