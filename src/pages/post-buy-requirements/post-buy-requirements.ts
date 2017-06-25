import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';

/*
  Generated class for the PostBuyRequirements page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-post-buy-requirements',
  templateUrl: 'post-buy-requirements.html'
})
export class PostBuyRequirementsPage {

	requirements: FirebaseListObservable<any>;
    currentuser: any;
    public currentuserid: any;
    requirementForm: any;
    public loading: any;
    public gradeList: FirebaseListObservable<any>;
    public selecton: boolean = true;
    public nameon: boolean = true;
    public emptyname: any;
    public selectalloyoff: boolean = true;
    public selectedGrade: any;
    public selectedGradeItem: any;
    public selectedAlloy: any;
    public selectedCat: any;    
    public gradecat: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public formBuilder: FormBuilder, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

        this.emptyname = '';
        //this.currentuser = firebase.auth().currentUser;
        this.currentuserid = navParams.get("userID");
        this.requirements = af.database.list('/requirements');
        //this.gradeList = af.database.list('/grades');
        this.selectedCat = "Stainless Steel Coils";
        this.getGrades();
		this.requirementForm = formBuilder.group({
            category: ['Stainless Steel Coils', Validators.required],
            ptype: ['Hastelloy',],
            grade: ['', Validators.required],
            quantity: ['', Validators.required],
            unit: ['', Validators.required],
            bid: ['',],
            btype: [''],
            sizedetails: ['', Validators.required],
            details: ['', ] ,
            uid: ['', Validators.required],
        });
  }

    getGrades() {
        if (this.selectedCat == "Stainless Steel Coils" || this.selectedCat == "Stainless Steel Sheets" || this.selectedCat == "Stainless Steel Packets" || this.selectedCat === "Stainless Steel Seamless Pipes" || this.selectedCat === "Stainless Steel Welded/ERW Pipes" || this.selectedCat === "Stainless Steel Semi-Welded/ERW Pipes" || this.selectedCat === "Stainless Steel Electropolish Pipes" || this.selectedCat === "Stainless Steel Square & Rectangular Pipes" || this.selectedCat === "Stainless Steel Flats" || this.selectedCat == "Stainless Steel Angles" || this.selectedCat == "Stainless Steel Round Bars" ) {
            this.selecton = true;
            this.nameon = true;
            this.selectalloyoff = true;
            this.gradecat = 1;
        }
        else if (this.selectedCat === "Duplex & Super Duplex Coils" || this.selectedCat === "Duplex & Super Duplex Sheets" || this.selectedCat === "Duplex & Super Duplex Seamless Pipes" || this.selectedCat === "Duplex & Super Duplex Welded/ERW Pipes" || this.selectedCat === "Duplex & Super Duplex Semi-Welded/ERW Pipes" || this.selectedCat === "Duplex & Super Duplex Electropolish Pipes" || this.selectedCat === "Duplex & Super Duplex Sqr. & Rect. Pipes" || this.selectedCat === "Duplex & Super Duplex Round Bars" ) {
            this.selecton = true;
            this.nameon = true;
            this.selectalloyoff = true;
            this.gradecat = 2;
        }
        else if (this.selectedCat === "Nickel Alloys Coils" || this.selectedCat === "Nickel Alloys Sheets" || this.selectedCat === "Nickel Alloys Seamless Pipes" || this.selectedCat === "Nickel Alloys Welded/ERW Pipes" || this.selectedCat === "Nickel Alloys Semi-Welded/ERW Pipes" || this.selectedCat === "Nickel Alloys Electropolish Pipes" || this.selectedCat === "Nickel Alloys Sqr. & Rect. Pipes" || this.selectedCat === "Nickel Alloys Round Bars") {
            this.selecton = true;
            this.nameon = true;
            this.selectalloyoff = false;
            this.selectedAlloy = 'Hastelloy';
            this.gradecat = 3;
        }
        else if (this.selectedCat === "Others") {
            this.selecton = false;
            this.nameon = false;
            
            this.gradecat = 3;
        }
        else {
            this.gradecat = 1;
        }
        this.gradeList = this.af.database.list('/grades/' + this.gradecat);
    }

    alloySelected() {

        if (this.selectedAlloy === 'Hastelloy') {
            this.gradecat = 3;
        }
        else if (this.selectedAlloy === 'Inconel') {
            this.gradecat = 4;
        }
        else if (this.selectedAlloy === 'Monel') {
            this.gradecat = 5;
        }
        else if (this.selectedAlloy === 'Nimonic') {
            this.gradecat = 6;
        }
        else if (this.selectedAlloy === 'Nickel') {
            this.gradecat = 7;
        }
        else if (this.selectedAlloy === 'Titanium') {
            this.gradecat = 8;
        }
        this.gradeList = this.af.database.list('/grades/' + this.gradecat);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostBuyRequirementsPage');
    }
      

  showConfirm(requirementForm) {
      if (this.selectedCat != "Exotic Alloys Coils" || this.selectedCat != "Exotic Alloys Sheets" || this.selectedCat != "Exotic Alloys Seamless Pipes" || this.selectedCat != "Exotic Alloys Welded/ERW Pipes" || this.selectedCat != "Exotic Alloys Electropolish Pipes" || this.selectedCat != "Exotic Alloys Sqr. & Rect. Pipes" || this.selectedCat != "Exotic Alloys Round Bars") {
          requirementForm.value.ptype = null;
      }

      if (!requirementForm.valid) {
          let alert = this.alertCtrl.create({
              title: 'Invalid Entries!',
              subTitle: 'Please fill all required entries',
              buttons: ['OK']
          });
          alert.present();
      }
      else {
          let confirm = this.alertCtrl.create({
              title: 'Post Requirement?',
              message: 'Do you want to post this requirement to the market?',
              buttons: [
                  {
                      text: 'No',

                  },
                  {
                      text: 'Agree',
                      handler: () => {
                          this.submitRequirement();
                      }
                  }
              ]
          });
          confirm.present();
      }
}

  submitRequirement() {
      this.loading = this.loadingCtrl.create({
          content: 'Posting Requirement...'
      });
      this.loading.present().then(() => { 
      console.log(this.requirementForm.value);
      this.requirements.push(this.requirementForm.value).then(data => {

          console.log(data.key);
          this.af.database.object('users/' + this.currentuserid + '/requirements/' + data.key).set(
              {

                  islive: true,
                  details: this.requirementForm.value
              }



          ).then(() => {
              this.loading.dismiss().then(() => {
                  let toast = this.toastCtrl.create({
                      message: 'Requirement posted.',
                      duration: 3500,
                      position: 'middle'
                  });
                  toast.present();
                  this.navCtrl.pop();
              });

          })
              .catch((err) => {
                  this.loading.dismiss().then(() => {
                      console.log(err);
                      let alert = this.alertCtrl.create({
                          message: err.message,
                          buttons: [{ text: "Ok", role: 'cancel' }]
                      });
                      alert.present();
                  });
              
     });




      });
      });
  }

}
