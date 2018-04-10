import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  Alert, AlertController,
  Loading, LoadingController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../../pages/home/home';
import { AuthProvider } from '../../providers/auth/auth';


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public signupForm: FormGroup;
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder) {

      // validasi form
    this.signupForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)])
      ]
    });

  }

  signupUser(): void{
      // cek apakah email dan password sudah valid
    if (!this.signupForm.valid) {
      console.log(`Form tidak valid: ${this.signupForm.value}`);
    } else {
      // baca formControlName dahulu
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;

      // cek dari firebase
      this.authProvider.signupUser(email, password).then(
        authData => {       // resolve
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(HomePage);
          });
        },
        error => {          // reject
          this.loading.dismiss().then(() => {
            const alert: Alert = this.alertCtrl.create({
              message: error.message,
              buttons: [{
                text: 'Ok',
                role: 'cancel'
              }]
            });
            alert.present();
          });
        }
      );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  } 
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
