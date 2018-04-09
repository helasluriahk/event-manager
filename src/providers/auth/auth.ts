//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase'; //ditambahin
import { User } from '@firebase/auth-types' //ditambahin

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor() {
    console.log('Hello AuthProvider Provider');
  }
  //register user bar
  signupuser(email: string, pass: string): Promise<void> {
    return firebase.auth().createUserWithEmailAndPassword(email, pass).then(newuser => {
      firebase.database().ref(`/userprofile/${newuser.uid}/email`).set(email);
    })
      .catch(error => {
        console.error(error);
        throw new error(error);
      });
  }
  //login user
  loginuser(email:string, pass:string): Promise<void>{
    return firebase.auth().signInWithEmailAndPassword(email, pass);
  }
  //resert pass
  resetpass(email:string): Promise<void>{
    return firebase.auth().sendPasswordResetEmail(email);
  }
  //logout user
  logoutuser():Promise<void>{
    const userid: string = firebase.auth().currentUser.uid;
    firebase.database().ref(`/userprofile/${userid}`).off();
    return firebase.auth().signOut();
  }
}
