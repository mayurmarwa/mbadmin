import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFire } from 'angularfire2';


/**
 * Generated class for the DirectoryAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-directory-add',
  templateUrl: 'directory-add.html',
})
export class DirectoryAddPage {

    memberForm: any;
    directory: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public formBuilder: FormBuilder, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  
      this.directory = af.database.list('/directory');
      this.memberForm = formBuilder.group({
            Name: ['', Validators.required],
            Address: ['', Validators.required],
            Email: ['', Validators.required],
            'Mobile 1': ['',],
            'Mobile 2': ['',],
            'Mobile 3': ['',],
            'Office 1': ['',],
            'Office 2': ['',],
            'Office 3': ['',],
            excise: ['',],
            comsn: ['',],
            range: ['',],
            division: ['',],
            vat: ['',],
            pan: ['',],
            std: ['',]
        });
        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectoryAddPage');
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
              title: 'Add Member?',
              message: 'Do you want to add this memeber to the directory?',
              buttons: [
                  {
                      text: 'No',

                  },
                  {
                      text: 'Agree',
                      handler: () => {
                          this.addMember();
                      }
                  }
              ]
          });
          confirm.present();
      }
    }

    addMember(){
        console.log(this.memberForm);
        this.directory.push(this.memberForm.value).then(() => {
             
                  let toast = this.toastCtrl.create({
                      message: 'Member added to directory..',
                      duration: 2000,
                      position: 'middle'
                  });
                  toast.present();
                  this.navCtrl.popToRoot();
              });
    
    }
}
