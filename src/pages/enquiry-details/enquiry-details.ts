import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, Content  } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Storage } from '@ionic/storage';
import { MyProfilePage } from '../my-profile/my-profile';
import { ProductPagePage } from '../product-page/product-page';
import { RequirementDetailsPage } from '../requirement-details/requirement-details';
import firebase from 'firebase';


/*
  Generated class for the EnquiryDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-enquiry-details',
  templateUrl: 'enquiry-details.html'
})
export class EnquiryDetailsPage {

    @ViewChild(Content) content: Content;

	public enquiry: any;
	chatBox: any;
	currentuser: any;
	messageList: any;
    otherUserList: any;
    myenquiries: any;
    otherenquiries: any;
    supcount: any;
    public initialLoad: boolean = false;
   
    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public storage: Storage, public alertCtrl: AlertController, public toastCtrl: ToastController) {
      
        this.supcount = 0;
        //storage.ready().then(() => {
          //storage.get('currentuser').then((val) => {

              

              this.currentuser = firebase.auth().currentUser;
              this.enquiry = navParams.get("enquiry");
              console.log(this.enquiry);
              
              this.messageList = af.database.list('/support/' + this.enquiry.key +'/messgaes/');
              this.otherUserList = af.database.list('/users/' + this.enquiry.key + '/support/');
              
              this.myenquiries = af.database.list('/support/');
              this.otherenquiries = af.database.list('/users/' + this.enquiry.key  + '/support');
          //})
            //  .catch((err) =>
              //    console.log(err));
          
      //}).catch((err) =>
        //  console.log(err)); 
        
      
        //console.log(this.enquiry);
  }

    ionViewWillUnload(){
    
        console.log("unload");
        this.messageList.$ref.off();
        this.otherUserList.$ref.off();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnquiryDetailsPage');

      this.messageList.$ref.on('child_added', (message) => {
               // console.log(message.val());
               if (!this.initialLoad ) return;

        if(this.navCtrl.getActive().name === 'EnquiryDetailsPage'){
        this.af.database.object('support/' + this.enquiry.key).update(
                          {
                              //name: this.user.name,
                              unread: false,
                              //count: 0
                              //timestamp: firebase.database['ServerValue']['TIMESTAMP'],
                              //productImage: this.productImageURL
                          });
        setTimeout(()=>{this.content.scrollToBottom();},100); 
    
                  }
           
        
         });
              this.messageList.$ref.once('value', (messages) => {
           // console.log(messages.val().count);
                //this.supcount = messages.val().count;
                this.initialLoad = true;    
        });


              this.otherUserList.$ref.on('value', (messages) => {
            //console.log(messages.val().count);
                this.supcount = messages.val().count;
                //this.initialLoad = true;    
        });
      //this.content.scrollToBottom();
  }
    ionViewDidEnter() {
    this.content.scrollToBottom();
        this.af.database.object('support/' + this.enquiry.key).update(
                          {
                              //name: this.user.name,
                              unread: false,
                              //timestamp: firebase.database['ServerValue']['TIMESTAMP'],
                              //productImage: this.productImageURL
                          });
  }
  send(chatBox){

      this.af.database.object('/users/' + this.enquiry.key + '/support/').update(
                          {
                              //name: this.user.name,
                              unread: true,
                              count: this.supcount + 1
                              //timestamp: firebase.database['ServerValue']['TIMESTAMP'],
                              //productImage: this.productImageURL
                          });

      console.log(this.enquiry.key);
      console.log(this.enquiry);
			//console.log(chatBox);
			this.messageList.push({
									
				text: this.chatBox,
				type: 'sent'
			})
			this.otherUserList.push({
									
				text: this.chatBox,
				type: 'received'
			})
			this.chatBox = '';
         // this.content.scrollToBottom();


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
                      this.myenquiries.remove(this.enquiry.key);
                      this.otherenquiries.remove(this.enquiry.key);
                      let toast = this.toastCtrl.create({
                          message: 'Enquiry will be deleted',
                          duration: 2000,
                          position: 'middle'
                      });
                      toast.present().then(() => {
                          this.navCtrl.pop();
                      });
                      
                  }
              }
          ]
      });
      alert.present();
  }

  viewProfile() {
      this.navCtrl.push(MyProfilePage, {userID: this.enquiry.key});
  }

  viewProduct() {
      this.navCtrl.push(ProductPagePage, { product: this.enquiry.product });
  }

  viewRequirement() {
      this.navCtrl.push(RequirementDetailsPage, { requirement: this.enquiry.requirement });
  }

}
