import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

/**
 * Generated class for the BulkUploadsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bulk-uploads',
  templateUrl: 'bulk-uploads.html',
})
export class BulkUploadsPage {
        public supportList: any;	
        public supportListref: any;
        public supportListRev: Observable<any>;	
        public keys: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

      this.supportListref = firebase.database().ref('/bulkuploads/').orderByChild('timestamp');
      //this.enquiryList = this.af.database.list('/users/' + this.currentuserid + '/enquiries', {
      //   query: {
      //       orderByChild: "type",
      //       equalTo: this.segment
      //   }
      //});
      this.supportListref.on('value', snapshot => {

          //this.enquiryList = this.af.database.list('/users/' + this.currentuserid + '/enquiries', {
          //query: {
          //    orderByChild: "type",
          //    equalTo: this.segment
          // }
          //});
          //console.log("received");
          //this.enqListRev = [];

          this.supportList = [];
          this.keys = [];
          snapshot.forEach(country => {

              console.log(country.key)
              this.supportList.push(country.val());
              this.keys.push(country.key);

          });
          for (var i in this.supportList) {
              this.supportList[i].key = this.keys[i];

          }

          //this.enqListRev = this.enquiryList.reverse();

          this.supportListRev = Observable.of(this.supportList.reverse());
          //console.log(this.enqListRev);

          //this.flag = true;
      });

  }
    openenquirypage(enquiry){

		this.navCtrl.push('BulkDetailsPage', {enquiry: enquiry});  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BulkUploadsPage');
  }

}
