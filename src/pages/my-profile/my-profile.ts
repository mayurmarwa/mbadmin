import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import { CallNumber } from '@ionic-native/call-number';
import { ProfileData } from '../../providers/profile-data';
import { Platform } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { EnquiryDetailsPage } from '../enquiry-details/enquiry-details';
import { MyProductsPage } from '../my-products/my-products';
import { MyRequirementsPage } from '../my-requirements/my-requirements';



/*
  Generated class for the MyProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html'
})
export class MyProfilePage {

    public userID: any;
    public userProfile: any;
    public subscription: any
    public loadingPopup: any;
    otherenquiries: any;
    messageList: any;
    enquiry:any;


    constructor(public navCtrl: NavController, public profileData: ProfileData, public af: AngularFire, public alertCtrl: AlertController,public navParams: NavParams, public authService: AuthService, private platform: Platform, private callNumber: CallNumber, public loadingCtrl: LoadingController) {

        this.enquiry = [];
        this.userID = navParams.get("userID");
        this.enquiry.key = this.userID;
        
        this.otherenquiries = af.database.list('/users/' + this.userID + '/support/');
        this.messageList = af.database.list('/support/' + this.userID +'/messgaes/');


       

        this.subscription = this.authService.getFullProfile(this.userID)
            .subscribe(user => {
                //loading.dismiss();
                // this.user.displayName = user.displayName;
                //this.user.email = user.email || user.providerData[0].email || 'Not set yet.';
                //this.user.photoURL = user.photoURL || this.user.photoURL;
                this.userProfile = user;
                //console.log(this.userProfile);
               
            }, (error) => {
                //loading.dismiss();
                
                console.log('Error: ' + JSON.stringify(error));
            });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
    }

  ionViewDidLeave() {
      this.subscription.unsubscribe();
      //this.sub2.unsubscribe();
  }


  callNo() {
      if (!this.platform.is('cordova')) {
          window.open("tel:" + this.userProfile.mobile);
          console.log(this.userProfile.mobile);

      }
      else {
          this.callNumber.callNumber(this.userProfile.mobile, true)
              .then(() => console.log('Launched dialer!'))
              .catch(() => console.log('Error launching dialer'));
      }
  }


  updateAccess() {
      let alert = this.alertCtrl.create({
          message: "Change access rights?",
          
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Update',
                  handler: data => {
                      this.profileData.updateAccess(this.userID,!this.userProfile.isApproved);
                  }
              }
          ]
      });
      alert.present();
  }

    sendMessage() {
      let alert = this.alertCtrl.create({
          message: "Send Message",
          inputs: [
              {
                  name: 'message',
                  placeholder: 'Enter Message',
              },
              /**{
                  name: 'lastName',
                  placeholder: 'Your last name',
                  value: this.userProfile.lastName
              },**/
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Send',
                  handler: data => {
                      this.messageList.push({
									
				text: data.message,
				type: 'sent'
			})
                      this.otherenquiries.push({
									
				text: data.message,
				type: 'received'
			})
                  this.navCtrl.push(EnquiryDetailsPage, {enquiry: this.enquiry})
                  }
              }
          ]
      });
      alert.present();
  }

    viewProducts(){
                 this.navCtrl.push(MyProductsPage, {userID: this.userID})

    }

    viewRequirements(){
                 this.navCtrl.push(MyRequirementsPage, {userID: this.userID})

    }
}
