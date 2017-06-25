import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { MemberDetailsPage } from '../member-details/member-details';
import { PopoverController } from 'ionic-angular';
import { DirectoryProvider } from '../../providers/directory-provider';

/*
  Generated class for the Directory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-directory',
    templateUrl: 'directory.html'
})
export class DirectoryPage {

    public loadedlist: any;
    public directory: any;
    public directoryRef: any;
    public loadingPopup: any;
    public members: any;


    constructor(public navCtrl: NavController, public directoryData: DirectoryProvider, public navParams: NavParams, public alertCtrl: AlertController, public modalCtrl: ModalController, public popoverCtrl: PopoverController, public loadingCtrl: LoadingController) {

        this.directory = [];
        this.directory = this.directoryData.directory;
        this.loadedlist = this.directoryData.directory;
        this.loadingPopup = this.loadingCtrl.create({
            content: 'Updating...'
        });
        //this.loadingPopup.present();
        //this.directoryRef = firebase.database().ref('/directory');
       // this.directoryRef.on('value', countryList => {
           // let countries = [];

           // countryList.forEach(country => {

            //    countries.push(country.val());
            //});

            //this.directory = countries;
            //this.loadedlist = countries;
            //console.log("here", this.directory);
            //this.loadingPopup.dismiss();


        //});
        //this.getmembers();
        



    }

    getmembers() {
        
        
    }
    
   
    initializeItems(): void {
        this.directory = this.loadedlist;
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectoryPage');
    }

  openAlert() {
      let alert = this.alertCtrl.create({
          title: 'MetBazaar Directory',
          subTitle: 'To update contact info, company details, excise info or to add your company, send us details at contact@metbazaar.com',
          
      });
      alert.present();
  }

  getItems(searchbar) {
      // Reset items back to all of the items
      this.initializeItems();

      // set q to the value of the searchbar
      var q = searchbar.srcElement.value;


      // if the value is an empty string don't filter the items
      if (!q) {
          return;
      }

      this.directory = this.directory.filter((v) => {
          if (v.Name && q) {
              if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                  return true;
              }
              return false;
          }
      });

      console.log(q, this.directory.length);

  }

    addMember(){
    this.navCtrl.push('DirectoryAddPage');
    }

  viewDetails(member) {
      //let profileModal = this.modalCtrl.create(MemberDetailsPage, { member: member });
      //profileModal.present();
      this.navCtrl.push(MemberDetailsPage, { member: member });
      //let popover = this.popoverCtrl.create(MemberDetailsPage, { member: member }, { cssClass: 'contact-popover' });
      //popover.present();
  }

}
