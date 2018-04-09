import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Alert, AlertController, Loading, LoadingController} from 'ionic-angular';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HomePage} from '../home/home';
import {AuthProvider} from '../../providers/auth/auth'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginform: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertctrl: AlertController, 
              public loadingctrl: LoadingController,
              public authprovider: AuthProvider,
              public formbuilder: FormBuilder) {
  }

  //proses login user
  loginuser(){
    const email = this.loginform.value.email;
    const pass = this.loginform.value.pass;

    this.authprovider.loginuser(email, pass).then(authdata=>{
      this.loading.dismiss().then(()=> {
        this.navCtrl.setRoot(HomePage);
      });
    },
    error => {
      this.loading.dismiss().then(()=>{
        const alert: Alert = this.alertctrl.create({
          message: error.message,
          buttons: [{
            text:'OK',
            role:'Cancel'
          }]
        });
        alert.present();
      });
    }
  );
  this.loading = this.loadingctrl.create();
  this.loading.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
