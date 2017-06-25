import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AddProductPage } from '../add-product/add-product';

/*
  Generated class for the SelectCategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-select-category',
  templateUrl: 'select-category.html'
})
export class SelectCategoryPage {

    categories: FirebaseListObservable<any>;
    public parentcat: any;
    public userID: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
        this.categories = af.database.list('/productcategories',{query: {orderByChild: 'catid'}});
        this.userID = navParams.get("userID");
        console.log(this.userID);

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectCategoryPage');
  }

  detailpage(category) {

      if (category.catid == 4 || category.catid == 8 || category.catid == 9 ) {

          this.categories = this.af.database.list('/productcategories/' + category.$key + '/subcategories/', { query: { orderByChild: 'oid' } });
          this.parentcat = category.$key;
      }
      else if (category.catid === '8c' || category.catid === '9c') {

          this.categories = this.af.database.list('/productcategories/' + this.parentcat + '/subcategories/' + category.$key + '/types/', { query: { orderByChild: 'oid' } });
      }
      else {
          this.navCtrl.push(AddProductPage, { category: category, userID: this.userID });
      }
  }

}
