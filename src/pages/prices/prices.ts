import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { ProductData } from '../../providers/product-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

/*
  Generated class for the Prices page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-prices',
  templateUrl: 'prices.html'
})
export class PricesPage {
    public segment: any;
    public lmeRef: any;
    public mcxRef: any;
    public lmeList: any;
    public mcxList: any;
    public sub1: any;
    public sub2: any;

    

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public alertCtrl: AlertController, public productData: ProductData) {
        this.segment = "mcx";


        
}

    updatelme(key,name,price,type) {
        let alert = this.alertCtrl.create({
            message: "Edit",
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Name',
                    value: name
                },
                {
                    name: 'price',
                    placeholder: 'Price',
                    value: price
                },
                {
                    name: 'type',
                    placeholder: 'up or down',
                    value: type
                }               
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: data => {
                        this.productData.updatelmePrices(key, data.name, data.price, data.type);
                    }
                }
            ]
        });
        alert.present();
    }

    addlme() {
        let alert = this.alertCtrl.create({
            message: "Edit",
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Name',
                    //value: name
                },
                {
                    name: 'price',
                    placeholder: 'Price',
                    //value: price
                },
                {
                    name: 'type',
                    placeholder: 'up or down',
                    //value: type
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: data => {
                        this.productData.addlmePrices(data.name, data.price, data.type);
                    }
                }
            ]
        });
        alert.present();
    }

    addmcx() {
        let alert = this.alertCtrl.create({
            message: "Edit",
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Name',
                    //value: name
                },
                {
                    name: 'price',
                    placeholder: 'Price',
                    //value: price
                },
                {
                    name: 'type',
                    placeholder: 'Type',
                    //value: type
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: data => {
                        this.productData.addmcxPrices(data.name, data.price, data.type);
                    }
                }
            ]
        });
        alert.present();
    }

    updatemcx(key, name, price, type) {
        let alert = this.alertCtrl.create({
            message: "Edit",
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Name',
                    value: name
                },
                {
                    name: 'price',
                    placeholder: 'Price',
                    value: price
                },
                {
                    name: 'type',
                    placeholder: 'Type',
                    value: type
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: data => {
                        this.productData.updatemcxPrices(key, data.name, data.price, data.type);
                    }
                }
            ]
        });
        alert.present();
    }

    deletelme(key: any) {
        let alert = this.alertCtrl.create({
            title: 'Delete Price?',
            message: 'Do you want to delete ?',
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Confirm',
                    handler: data => {
                        this.productData.deletelme(key);
                        //this.navCtrl.pop();
                    }
                }
            ]
        });
        alert.present();
    }

    deletemcx (key: any) {
        let alert = this.alertCtrl.create({
            title: 'Delete Price?',
            message: 'Do you want to delete ?',
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Confirm',
                    handler: data => {
                        this.productData.deletemcx(key);
                        //this.navCtrl.pop();
                    }
                }
            ]
        });
        alert.present();
    }



  ionViewDidLoad() {
    console.log('ionViewDidLoad PricesPage');
  }
  

  ionViewWillEnter() {
      console.log("prices will enter");

      this.sub1 = this.af.database.list('/prices/lme',{
          query: {
              orderByChild: 'time'

          }
      })
          .subscribe(data => {
              this.lmeList = [];
              data.forEach(obj => {
                  //console.log(obj.$key);
                  this.lmeList.push(obj);
              });
              //this.requests.unsubscribe();
              this.lmeList = Observable.of(this.lmeList.reverse());
              //console.log(this.lmeList);
          });


      this.sub2 = this.af.database.list('/prices/mcx', {
          query: {
              orderByChild: 'time'

          }
      })
          .subscribe(data => {
              this.mcxList = [];
              data.forEach(obj => {
                  //console.log(obj);
                  this.mcxList.push(obj);
              });
              //this.requests.unsubscribe();
              this.mcxList = Observable.of(this.mcxList.reverse());
              //console.log(this.mcxList);
          });
  }

  ionViewWillLeave() {
      //this.lme
      //this.
      //console.log("price will unload");
      this.sub1.unsubscribe();
      this.sub2.unsubscribe();
  }
}
