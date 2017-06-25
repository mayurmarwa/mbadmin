import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { Platform } from 'ionic-angular';


/*
  Generated class for the MemberDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-member-details',
  templateUrl: 'member-details.html'
})
export class MemberDetailsPage {

    public member: any;
    public callnumber: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private call: CallNumber) {
        console.log(navParams.get('member'));
        this.member = navParams.get('member');
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberDetailsPage');
  }

  callNo(type) {
      if (type == 1) {
          this.callnumber = this.member["Mobile 1"]
      }
      else if (type == 2) {
          this.callnumber = this.member["Mobile 2"]
      }
      else if (type == 3) {
          this.callnumber = this.member["Mobile 3"]
      }
      this.callIt();
  }
  callLand(type) {
      if (this.member["std"]) {
          this.callnumber = this.member["std"].toString();

      }
      else {
          this.callnumber = "022";
            
      }
      if (type == 1) {
          this.callnumber = this.callnumber + this.member["Office 1"]
      }
      else if (type == 2) {
          this.callnumber = this.callnumber + this.member["Office 2"]
      }
      else if (type == 3) {
          this.callnumber = this.callnumber + this.member["Office 3"]
      }

      this.callIt();
  }
    callIt(){
      if (!this.platform.is('cordova')) {
          window.open("tel:" + this.callnumber);
          console.log(this.callnumber);

      }
      else {
          this.call.callNumber(this.callnumber, true)
              .then(() => console.log('Launched dialer!'))
              .catch(() => console.log('Error launching dialer'));
      }
  }

    editMember(){
        this.navCtrl.push('EditMemberPage',{member: this.member })
    }

}
