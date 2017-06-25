import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SendEnquiryPage } from '../send-enquiry/send-enquiry';
import { ProductData } from '../../providers/product-data';
import { Storage } from '@ionic/storage';
import { MyProfilePage } from '../my-profile/my-profile';


/*
  Generated class for the ProductPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-product-page',
  templateUrl: 'product-page.html'
})
export class ProductPagePage {

    public product: any;
    public currentuser: any;
    public cur: any;
    public prodImg: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public productData: ProductData, public storage: Storage) {
       
      this.prodImg = "";
      storage.ready().then(() => {
          storage.get('currentuser').then((val) => {

              this.currentuser = JSON.parse(val);
              this.product = navParams.get("product");
              console.log(this.product.catid);

              if (this.product.catid == 1 || this.product.catid === "8a" || this.product.catid === "9a") {
                  this.prodImg = "assets/img/1.png";
              }
              else if (this.product.catid == 2 || this.product.catid === "8b" || this.product.catid === "9b") {
                  this.prodImg = "assets/img/2.png";
              }
              else if (this.product.catid == 3 ) {
                  this.prodImg = "assets/img/3.png";
              }
              else if (this.product.catid == 4 || this.product.catid === "4a" || this.product.catid === "4b" || this.product.catid === "4c" || this.product.catid === "4d" || this.product.catid === "4e" || this.product.catid === "8c" || this.product.catid === "8c1" || this.product.catid === "8c2" || this.product.catid === "8c3" || this.product.catid === "8c4" || this.product.catid === "8c5" || this.product.catid === "9c" || this.product.catid === "9c1" || this.product.catid === "9c2" || this.product.catid === "9c3" || this.product.catid === "9c4" || this.product.catid === "9c5") {
                  this.prodImg = "assets/img/4.png";
              }
              else if (this.product.catid == 5) {
                  this.prodImg = "assets/img/5.png";
              }
              else if (this.product.catid == 6) {
                  this.prodImg = "assets/img/6.png";
              }
              else if (this.product.catid == 7 || this.product.catid === "8d" || this.product.catid === "9d") {
                  this.prodImg = "assets/img/7.png";
              }
              else if (this.product.catid == 10) {
                  this.prodImg = "assets/img/10.png";
              }

              this.productData.setRecent(this.product);
              
              //console.log(this.currentuser);

          })
              .catch((err) =>
                  console.log(err));
      }).catch((err) =>
          console.log(err));
      
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad ProductPagePage');
     
    }

  viewProfile(uid) {
      this.navCtrl.push(MyProfilePage, { userID: this.product.uid });
  }

  sendEnquiry(){
	 this.navCtrl.push(SendEnquiryPage, {product: this.product});
	

  }
}
