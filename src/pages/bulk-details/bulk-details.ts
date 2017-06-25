import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { AuthService } from '../../providers/auth.service';
import { MyProfilePage } from '../my-profile/my-profile';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import firebase from 'firebase';




/**
 * Generated class for the BulkDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bulk-details',
  templateUrl: 'bulk-details.html',
})
export class BulkDetailsPage {

    	public enquiry: any;
        public userProfile: any;
        public subscription: any



  constructor(public navCtrl: NavController, public navParams: NavParams, private photoViewer: PhotoViewer, public af: AngularFire, public authService: AuthService, public alertCtrl: AlertController, public toastCtrl: ToastController) {

      this.enquiry = navParams.get("enquiry");

        this.subscription = this.authService.getFullProfile(this.enquiry.uid)
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
    console.log('ionViewDidLoad BulkDetailsPage');
      this.af.database.object('/bulkuploads/' + this.enquiry.key).update(
                          {
                              //name: this.user.name,
                              unread: false,
                              //count: 0
                              //timestamp: firebase.database['ServerValue']['TIMESTAMP'],
                              //productImage: this.productImageURL
                          });

  }
    ionViewDidLeave() {
      this.subscription.unsubscribe();
      //this.sub2.unsubscribe();
  }
    viewProfile() {
        this.navCtrl.push(MyProfilePage, { userID: this.enquiry.uid });
    }

    confirmDelete() {
      let alert = this.alertCtrl.create({
          title: 'Delete Enquiry?',
          message: 'Do you want to delete this enquiry?',
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Confirm',
                  handler: data => {
                      
      this.af.database.object('/bulkuploads/' + this.enquiry.key).remove().then(() => {
        
          firebase.storage().ref('bulkProductImages/').child(this.enquiry.key).child('productImage.png').delete().then(() =>{
                    
              let toast = this.toastCtrl.create({
                          message: 'Data deleted',
                          duration: 2000,
                          position: 'middle'
                      });
                      toast.present().then(() => {
                          this.navCtrl.pop();
                      });
          
          });
        
      });
                      
                  }
              }
          ]
      });
      alert.present();
  }

    openImage(){
    this.photoViewer.show( this.enquiry.productImage );

    }

}
