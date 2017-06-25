import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFire } from 'angularfire2';

/**
 * Generated class for the EditMemberPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-member',
  templateUrl: 'edit-member.html',
})
export class EditMemberPage {

    public member: any;
    memberForm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public formBuilder: FormBuilder, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  
      this.member = navParams.get("member");
      console.log(this.member);

      this.memberForm = formBuilder.group({
            Name: [this.member.Name,],
            Address: [this.member.Address,],
            Email: [this.member.Email,],
            'Mobile 1': [this.member["Mobile 1"],],
            'Mobile 2': [this.member["Mobile 2"],],
            'Mobile 3': [this.member["Mobile 3"],],
            'Office 1': [this.member["Office 1"],],
            'Office 2': [this.member["Office 2"],],
            'Office 3': [this.member["Office 3"],],
            excise: [this.member.excise,],
            comsn: [this.member.comsn,],
            range: [this.member.range,],
            division: [this.member.division,],
            vat: [this.member.vat,],
            pan: [this.member.pan,],
            std: [this.member.std,]
        });
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditMemberPage');
  }

    showConfirm(memberForm) {
     
      if (!memberForm.valid) {
          let alert = this.alertCtrl.create({
              title: 'Invalid Entries!',
              subTitle: 'Please fill all required entries',
              buttons: ['OK']
          });
          alert.present();
      }
      else {
          let confirm = this.alertCtrl.create({
              title: 'Update Member?',
              message: 'Do you want to update the details of this member?',
              buttons: [
                  {
                      text: 'No',

                  },
                  {
                      text: 'Agree',
                      handler: () => {
                          this.updateMember();
                      }
                  }
              ]
          });
          confirm.present();
      }
    }

    updateMember(){
        console.log(this.memberForm);
        this.af.database.object('/directory/' + this.member.key).update(
                        {
                              Name: this.memberForm.value.Name,
                              Address: this.memberForm.value.Address,
                              Email: this.memberForm.value.Email,
                              'Mobile 1': this.memberForm.value["Mobile 1"],
                              'Mobile 2': this.memberForm.value["Mobile 2"],
                              'Mobile 3': this.memberForm.value["Mobile 3"],
                              'Office 1': this.memberForm.value["Office 1"],
                              'Office 2': this.memberForm.value["Office 2"],
                              'Office 3': this.memberForm.value["Office 3"],
                              excise: this.memberForm.value.excise,
                              comsn: this.memberForm.value.comsn,
                              range: this.memberForm.value.range,
                              division: this.memberForm.value.division,
                              vat: this.memberForm.value.vat,
                              pan: this.memberForm.value.pan,
                              std: this.memberForm.value.std,
                              //unread: false,
                              //count: 0
                              //timestamp: firebase.database['ServerValue']['TIMESTAMP'],
                              //productImage: this.productImageURL
                          }).then(() => {
             
                  let toast = this.toastCtrl.create({
                      message: 'Member details updated..',
                      duration: 2000,
                      position: 'middle'
                  });
                  toast.present();
                  this.navCtrl.popToRoot();
              });
    
    }

    confirmDelete() {
      let alert = this.alertCtrl.create({
          title: 'Delete Member?',
          message: 'Do you want to delete this member from directory?',      
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Confirm',
                  handler: data => {
                      this.af.database.object('/directory/' + this.member.key).remove();
                      this.navCtrl.popToRoot();
                  }
              }
          ]
      });
      alert.present();
  }
}
