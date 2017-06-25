import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { SelectCategoryPage } from '../select-category/select-category';
import { EditProductPage } from '../edit-product/edit-product';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
/*
  Generated class for the MyProducts page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-products',
  templateUrl: 'my-products.html'
})
export class MyProductsPage {

    public myproducts: any;
    public currentuser: any;
    public productListRev: any;
    public productListref: any;
    public segment: any;
    public loadingPopup: any;
    public keys: any;


    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public loadingCtrl: LoadingController) {
        


       // storage.ready().then(() => {
         //   storage.get('currentuser').then((val) => {

                //this.currentuser = JSON.parse(val);
                
                this.currentuser = navParams.get("userID");
                console.log(this.currentuser);
                this.productListref = firebase.database().ref('/products').orderByChild("uid").equalTo(this.currentuser);
                //this.enquiryList = this.af.database.list('/users/' + this.currentuserid + '/enquiries', {
                //   query: {
                //       orderByChild: "type",
                //       equalTo: this.segment
                //   }
                //});
                this.productListref.on('value', snapshot => {

                    


                    this.myproducts = [];
                    this.keys = [];
                    snapshot.forEach(country => {

                        this.myproducts.push(country.val());
                        this.keys.push(country.key);


                        
                    });

                    for (var i in this.myproducts) {
                        this.myproducts[i].key = this.keys[i];

                    } 
                    this.updateList();
                });
                
            //})
           //     .catch((err) =>
            //        console.log(err));
        //}).catch((err) =>
          //  console.log(err)); 

        //this.currentuser = firebase.auth().currentUser;
        
    }

  ionViewDidLoad() {
      //this.segment = "received";
      //let loading = this.loadingCtrl.create({
      //    content: 'Updating...'
      //});

      //loading.present();

      //setTimeout(() => {
       //   loading.dismiss();
      //}, 3000);
    }
  ionViewDidEnter() {
     
  }
  updateList() {
      //this.myproducts = this.af.database.list('/products', {
      //    query: {
      //        orderByChild: "uid",
      //        equalTo: this.currentuser.uid } });
      //this.productListRev = this.myproducts.map((arr) => { return arr.reverse(); });
      this.productListRev = this.myproducts.reverse();
}

  detailpage(myproduct) {

      this.navCtrl.push(EditProductPage, { myproduct: myproduct });
  }
  selectcat() {

      this.navCtrl.push(SelectCategoryPage, {userID: this.currentuser});
  }
  uploadProduct() {

      if (this.segment === 'add') {
          this.navCtrl.push(SelectCategoryPage, {userID: this.currentuser});
      }
  }

}
