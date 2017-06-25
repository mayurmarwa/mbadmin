import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController, ToastController  } from 'ionic-angular';
import { SendQuotationPage } from '../send-quotation/send-quotation';
import { MyProfilePage } from '../my-profile/my-profile';
import { Storage } from '@ionic/storage';
import { ProductData } from '../../providers/product-data';

/*
  Generated class for the RequirementDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-requirement-details',
  templateUrl: 'requirement-details.html'
})
export class RequirementDetailsPage {

    public requirement: any;
    public currentuser: any;
    public cur: any;
    

    constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public productData: ProductData, public alertCtrl: AlertController, public storage: Storage, private viewCtrl: ViewController) {

        
        storage.ready().then(() => {
            storage.get('currentuser').then((val) => {

                this.currentuser = JSON.parse(val);
                this.requirement = navParams.get("requirement");
                //console.log(this.product);
                //console.log(this.currentuser);

            })
                .catch((err) =>
                    console.log(err));
        }).catch((err) =>
            console.log(err));
       
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad RequirementDetailsPage');
     // console.log(this.viewCtrl.index);
	//console.log(this.requirement);
    }

  viewProfile(uid) {
      this.navCtrl.push(MyProfilePage, { userID: this.requirement.uid });
  }

  sendQuote(){
	 this.navCtrl.push(SendQuotationPage, {requirement: this.requirement});
		//console.log('Send Quote');
		
  }

  confirmDelete() {
      let alert = this.alertCtrl.create({
          title: 'Delete Requirement?',
          message: 'Do you want to delete this requirement?',
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Confirm',
                  handler: data => {
                      this.productData.deleteRequirement(this.requirement.key);
                      let toast = this.toastCtrl.create({
                          message: 'Requirement Deleted',
                          duration: 2000,
                          position: 'middle'
                      });
                      toast.present().then(() => { this.navCtrl.pop(); });
                      
                      
                  }
              }
          ]
      });
      alert.present();
  }
  

  
}
