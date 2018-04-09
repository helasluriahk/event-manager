import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase, { Unsubscribe } from 'firebase';
import {firebaseconfig} from './credential'
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {             //promise
        firebase.initializeApp(firebaseconfig); //mempaca API key dari firebase untuk pertama kali app di jalankan
        const unsubscribe: Unsubscribe=firebase.auth().onAuthStateChanged(user=>{
          //cek user sedang login atau tidak
          if(!user){this.rootPage = 'LoginPage';unsubscribe();
          }
          else{
            this.rootPage = HomePage; unsubscribe();
          }
        })
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

