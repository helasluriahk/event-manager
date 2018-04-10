import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  // melihat profile
  goToProfile():void{
    this.navCtrl.push('ProfilePage')
  }
  // membuat event
  gotoCreate():void{
    this.navCtrl.push('EventcreatePage')
  }
  // melihat daftar event
  gotoList():void{
    this.navCtrl.push('EventlistPage')
  }
}
