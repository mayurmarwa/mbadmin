import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { MyProfilePage } from '../my-profile/my-profile';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

/**
 * Generated class for the UserList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html',
})
export class UserList {
    public sub1: any;
    public userlist: any;
    public usercount: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {

        
  }

    ionViewWillEnter() {
        this.usercount = 0;
        this.sub1 = this.af.database.list('/users', {
            query: {
                orderByChild: 'createdAt'
                
            }
        })
            .subscribe(data => {
                this.userlist = [];
                data.forEach(obj => {
                    //console.log(obj);
                   
                    this.usercount++;
                    this.userlist.push(obj);
                });
                //this.requests.unsubscribe();
                //console.log(Date.now());
                this.userlist = Observable.of(this.userlist.reverse());
                //console.log(this.lmeList);
            });

    }

    viewProfile(uid) {
        this.navCtrl.push(MyProfilePage, { userID: uid });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserList');
  }

}
