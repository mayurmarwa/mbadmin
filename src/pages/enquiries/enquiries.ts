import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { EnquiryDetailsPage } from '../enquiry-details/enquiry-details';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

/*
  Generated class for the Enquiries page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-enquiries',
  templateUrl: 'enquiries.html'
})
export class EnquiriesPage {

	public enquiryList: any;	
    public enquiryListref: any;
    public supportList: any;	
    public supportListref: any;	
    public sentList: any;
    public sentListref: any;	
    public currentuser: any;
    public currentuserid: any;
    public segment: any;
    public enqListRev: Observable<any>;
    public supportListRev: Observable<any>;
    public sentListRev: Observable<any>;
    public loadingPopup: any;
    public loadingPopup2: any;
    public keys: any;
    public keys2: any;
    public sub1: any;
    public sub2: any;
    public flag: any;



    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public loadingCtrl: LoadingController) {
      
       
       
        //storage.ready().then(() => {
          //storage.get('currentuser').then((val) => {

        this.currentuser = firebase.auth().currentUser;
              
              //this.currentuserid = this.currentuser.uid;
        this.segment = "support";
        //setTimeout(() => {
            this.setData();
        //},3000);
              
      


              //this.enquiryList = af.database.list('/users/' + this.currentuser.uid + '/enquiries');

          //})
            //  .catch((err) =>
              //    console.log(err));
      //}).catch((err) =>
        //  console.log(err));     
       
  }
  

  ionViewDidLoad() {
      console.log('ionViewDidLoad EnquiriesPage');
      this.segment = "received";
      
       
     let loading = this.loadingCtrl.create({
          content: 'Updating...'
      });
     loading.present();

     setTimeout(() => {
         loading.dismiss();
     }, 1500);
      
    
    }


  setData() {

      this.enquiryListref = firebase.database().ref('/users/' + this.currentuser.uid + '/enquiries').orderByChild("type").equalTo("received");
      //this.enquiryList = this.af.database.list('/users/' + this.currentuserid + '/enquiries', {
      //   query: {
      //       orderByChild: "type",
      //       equalTo: this.segment
      //   }
      //});
      this.enquiryListref.on('value', snapshot => {

          //this.enquiryList = this.af.database.list('/users/' + this.currentuserid + '/enquiries', {
          //query: {
          //    orderByChild: "type",
          //    equalTo: this.segment
          // }
          //});
          //console.log("received");
          //this.enqListRev = [];

          this.enquiryList = [];
          this.keys = [];
          snapshot.forEach(country => {

              this.enquiryList.push(country.val());
              this.keys.push(country.key);

          });
          for (var i in this.enquiryList) {
              this.enquiryList[i].key = this.keys[i];

          }

          //this.enqListRev = this.enquiryList.reverse();

          this.enqListRev = Observable.of(this.enquiryList.reverse());
          console.log(this.enqListRev);

          this.flag = true;
      });

      this.supportListref = firebase.database().ref('/support/').orderByChild('timestamp');
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

          this.flag = true;
      });


      this.sentListref = firebase.database().ref('/users/' + this.currentuser.uid + '/enquiries').orderByChild("type").equalTo("sent");
      //this.enquiryList = this.af.database.list('/users/' + this.currentuserid + '/enquiries', {
      //   query: {
      //       orderByChild: "type",
      //       equalTo: this.segment
      //   }
      //});
      this.sentListref.on('value', snapshot => {

          //this.sentListRev = [];
          this.sentList = [];
          this.keys2 = [];
          snapshot.forEach(country => {
              //console.log(country.key);
              this.sentList.push(country.val());
              this.keys2.push(country.key);
          });

          for (var i in this.sentList) {
              this.sentList[i].key = this.keys2[i];

          }
          //this.updateEnquiryList(2);
          this.sentListRev = Observable.of(this.sentList.reverse());
      });


  }


  


  ionViewDidEnter() {
     
  }

  openenquirypage(enquiry){

		this.navCtrl.push(EnquiryDetailsPage, {enquiry: enquiry});  
  }

  updateEnquiryList(type) {

      if (type == 1) {

          this.enqListRev = this.enquiryList.reverse();

          this.enqListRev = Observable.of(this.enqListRev);
      }
      else if (type == 2) {

          this.sentListRev = this.sentList.reverse();
          this.sentListRev = Observable.of(this.sentList.reverse());

      }
     
      
          
     
      
      
  }
}
