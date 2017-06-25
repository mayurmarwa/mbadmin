import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';
import { QuickFilterPage } from '../quick-filter/quick-filter';
import { UserList } from '../user-list/user-list';
import { PricesPage } from '../prices/prices';
import { DirectoryPage } from '../directory/directory';
import { SearchCategoriesPage } from '../search-categories/search-categories';
import { BrowseRequirementsPage } from '../browse-requirements/browse-requirements';
import { PostBuyRequirementsPage } from '../post-buy-requirements/post-buy-requirements';
import { CategoryProductsPage } from '../category-products/category-products';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ProductPagePage } from '../product-page/product-page';
import { SelectSubcatPage} from '../select-subcat/select-subcat';
import { ProductData } from '../../providers/product-data';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';





/*
  Generated class for the Market page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-market',
  templateUrl: 'market.html'
})
export class MarketPage {

    productList: FirebaseListObservable<any>;
    productListRev: Observable<any>;
    categories: FirebaseListObservable<any>;
    recentList: any;
    recentListRef: any;
    recentl: any;
    flag: any;
    currentUser: any;
    public currentuser: any;
    public viewall: boolean = false;
    public selectedCat: any;
    public selectedGrade: any;
    public gradecat: any;
    public gradeList: any;
    public gradeListRef: any;
    public selectalloyoff: boolean = true;
    public selectedAlloy: any;


    constructor(public navCtrl: NavController, public toastCtrl: ToastController, public productData: ProductData, public navParams: NavParams, public modalCtrl: ModalController, public af: AngularFire, public storage: Storage) {


	 //this.productList = af.database.list('/products',{query: {orderByChild: 'timestamp' }});
        this.currentUser = firebase.auth().currentUser;
     //this.categories = af.database.list('/productcategories', { query: { orderByChild: 'catid' } });
       // storage.ready().then(() => {
         //   storage.get('currentuser').then((val) => {

           //     this.currentuser = JSON.parse(val);

                //this.recentList = this.af.database.list();
                
            /*    this.recentListRef = firebase.database().ref('/users/' + this.currentUser.uid + '/recent');
                //this.enquiryList = this.af.database.list('/users/' + this.currentuserid + '/enquiries', {
                //   query: {
                //       orderByChild: "type",
                //       equalTo: this.segment
                //   }
                //});
                this.recentListRef.on('value', snapshot => {

                    //this.enquiryList = this.af.database.list('/users/' + this.currentuserid + '/enquiries', {
                    //query: {
                    //    orderByChild: "type",
                    //    equalTo: this.segment
                    // }
                    //});
                    //console.log("received");
                    //this.enqListRev = [];
                    //console.log(snapshot.numChildren());
                    if (snapshot.numChildren() > 1) {
                        this.recentl = [];
                        //this.keys = [];
                        snapshot.forEach(country => {


                            this.recentl.push(country.val());
                            this.flag = true;

                            //this.keys.push(country.key);

                        });
                    } else {
                        this.flag = false;
                    }

                    
                    //this.enqListRev = this.enquiryList.reverse();
                    if (this.flag ==  true){
                        this.recentList = Observable.of(this.recentl);
                        //console.log(this.recentList);
                    }

                    //console.log(this.flag);
                    
                });


            });
        });*/


    }



  ionViewDidLoad() {
      console.log('ionViewDidLoad MarketPage');
      
    }
  //ionViewDidEnter() {
  //    this.reverseList();
  //}

  //reverseList() {
   //   this.productList = this.af.database.list('/products', { query: { orderByChild: 'timestamp' } });
   //   this.productListRev = this.productList.map((arr) => { return arr.reverse(); });
 // }

/*  getGrades() {
      this.selectedGrade = "";
      if (this.selectedCat == 1 || this.selectedCat == 2 || this.selectedCat == 3 || this.selectedCat === '4a' || this.selectedCat === '4b' || this.selectedCat === '4c' || this.selectedCat === '4d' || this.selectedCat === '4e' || this.selectedCat == 5 || this.selectedCat == 6 || this.selectedCat == 7) {
          
          if (this.selectedCat == 1 || this.selectedCat == 2 || this.selectedCat == 3 || this.selectedCat == 5 || this.selectedCat == 6 || this.selectedCat == 7) {
              this.selectedCat = parseInt(this.selectedCat);
              
          }
          this.gradecat = 1;
          this.selectalloyoff = true;
      }
      else if (this.selectedCat === '8a' || this.selectedCat === '8b' || this.selectedCat === '8c1' || this.selectedCat === '8c2' || this.selectedCat === '8c3' || this.selectedCat === '8c4' || this.selectedCat === '8c5' || this.selectedCat === '8d') {
          this.gradecat = 2;
          this.selectalloyoff = true;
      }
      else if (this.selectedCat === '9a' || this.selectedCat === '9b' || this.selectedCat === '9c1' || this.selectedCat === '9c2' || this.selectedCat === '9c3' || this.selectedCat === '9c4' || this.selectedCat === '9c5' || this.selectedCat === '9d') {
          
          this.selectalloyoff = false;
          this.selectedAlloy = 'Hastelloy';
          this.gradecat = 3;
      }
      else {
          this.gradecat = 1;
      }
      //this.gradeList = this.af.database.list('/grades/' + this.gradecat);
      this.gradeListRef = firebase.database().ref('/grades/' + this.gradecat );
     
      this.gradeListRef.on('value', snapshot => {
          this.gradeList = [];
          
          //this.keys = [];
          snapshot.forEach(country => {

              this.gradeList.push(country.val().Grade);
              //this.keys.push(country.key);

          });

          //this.enqListRev = this.enquiryList.reverse();

          this.gradeList = Observable.of(this.gradeList);
          
      });
  }

  alloySelected() {
      this.selectedGrade = "";

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
      this.gradeListRef = firebase.database().ref('/grades/' + this.gradecat);

      this.gradeListRef.on('value', snapshot => {
          this.gradeList = [];

          //this.keys = [];
          snapshot.forEach(country => {

              this.gradeList.push(country.val().Grade);
              //this.keys.push(country.key);

          });

          //this.enqListRev = this.enquiryList.reverse();

          this.gradeList = Observable.of(this.gradeList);

      });
  }

  quickFilter() {
      
      if (!this.selectedCat || !this.selectedGrade || this.selectedGrade === "") {
          let toast = this.toastCtrl.create({
              message: 'Select All Filters',
              duration: 2000,
              position: 'middle'
          });
          toast.present();
      }

      else {
          
          this.navCtrl.push(QuickFilterPage, { catid: this.selectedCat, grade: this.selectedGrade, alloy: this.selectedAlloy });
      }

  }*/

  openproductpage(product) {

      this.navCtrl.push(ProductPagePage, {product: product});
  }

/*  opennotificationsPage(product) {

      this.navCtrl.push(NotificationsPage);
  }
 
  selectSub(catid) {
      this.navCtrl.push(SelectSubcatPage, { catid: catid });
  }
 
  categoryProducts(catid: string, title: string) {
      //console.log(category);
      this.navCtrl.push(CategoryProductsPage, { catid: catid, cattitle: title });
  }
  openNotificationsPage() {
      this.navCtrl.push(NotificationsPage);
  }
  */
    openDirectory() {
      this.navCtrl.push(DirectoryPage);
  }
    openBulkPage() {
      this.navCtrl.push('BulkUploadsPage');
  }
  openSearchPage() {
      this.navCtrl.push(SearchCategoriesPage);
  }
  openRequirementPage() {
      this.navCtrl.push(BrowseRequirementsPage);
  }
  openUserList() {
      this.navCtrl.push(UserList);
  }
  openPrices() {
      this.navCtrl.push(PricesPage);
  }

   openNotificationsPage() {
      this.navCtrl.push(NotificationsPage);
  }
}
