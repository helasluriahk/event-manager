import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProfileProvider} from '../../providers/profile/profile';
import { AuthProvider} from '../../providers/auth/auth';
import { Alert, AlertController} from 'ionic-angular'


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public authProvider: AuthProvider,
              public profileProvider: ProfileProvider  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    //cek userProfile dari firebase
    this.profileProvider.getUserProfile().on('value', userProfileSnapshot=>{
      this.userProfile = userProfileSnapshot.val();
    });
  
  }

  // proses Logout
  Logout():void{
    this.authProvider.logoutUser().then(()=>{
      this.navCtrl.setRoot('LoginPage');
    });
  }

}
