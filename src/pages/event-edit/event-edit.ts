import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event'

/**
 * Generated class for the EventEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({segment: 'even-edit/:eventId'})
@Component({
  selector: 'page-event-edit',
  templateUrl: 'event-edit.html',
})
export class EventEditPage {
  public currentEvent: any={};

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventProvider: EventProvider) {
  }
  //Edit event 
    editEvent(
    eventName: string,
    eventDate: string,
    eventPrice: number,
    eventContact: string
  ):void{
    this.eventProvider.editEvent(eventName,eventDate,eventPrice,eventContact).then(newEvent =>{
      this.navCtrl.pop();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');

    // ambil dari firebase
    this.eventProvider.getEventDetail(this.navParams.get('eventId')).on('value', eventSnapshot =>{
      this.currentEvent = eventSnapshot.val();
      this.currentEvent.id = eventSnapshot.key;
    });
  }

}
