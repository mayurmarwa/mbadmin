import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RequirementDetailsPage } from '../requirement-details/requirement-details';
import { PostBuyRequirementsPage  } from '../post-buy-requirements/post-buy-requirements';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';

/*
  Generated class for the MyRequirements page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-requirements',
  templateUrl: 'my-requirements.html'
})
export class MyRequirementsPage {

    public requirementList: any;
    public requirementListRev: any;
    public requirementListref: any;
    public currentuser: any;
    public keys: any;



    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

        //storage.ready().then(() => {
            //storage.get('currentuser').then((val) => {

                //this.currentuser = JSON.parse(val);
                this.currentuser = navParams.get("userID");
                this.requirementListref = firebase.database().ref('/requirements').orderByChild("uid").equalTo(this.currentuser);
                //this.enquiryList = this.af.database.list('/users/' + this.currentuserid + '/enquiries', {
                //   query: {
                //       orderByChild: "type",
                //       equalTo: this.segment
                //   }
                //});
                this.requirementListref.on('value', snapshot => {

                    


                    this.requirementList = [];
                    this.keys = [];
                    snapshot.forEach(country => {

                        this.requirementList.push(country.val());
                        this.keys.push(country.key);



                    });

                    for (var i in this.requirementList) {
                        this.requirementList[i].key = this.keys[i];

                    }
                    this.updateList();
                });

            //})
              //  .catch((err) =>
               //     console.log(err));
        //}).catch((err) =>
          //  console.log(err)); 



    }

    openrequirementpage(requirement) {

        this.navCtrl.push(RequirementDetailsPage, { requirement: requirement });
    }

    updateList() {
        //this.myproducts = this.af.database.list('/products', {
        //    query: {
        //        orderByChild: "uid",
        //        equalTo: this.currentuser.uid } });
        //this.productListRev = this.myproducts.map((arr) => { return arr.reverse(); });
        this.requirementListRev = this.requirementList.reverse();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyRequirementsPage');
  }
    addNew(){
        this.navCtrl.push(PostBuyRequirementsPage, {userID: this.currentuser})
    }
}
