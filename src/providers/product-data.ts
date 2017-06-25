import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'; 
import { AngularFire } from 'angularfire2';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';



/*
  Generated class for the ProductData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProductData {

    productList: any;
    requirementList: any;
    currentUser: any;
    myProductList: any;
    recentList: any;
    pricemcxList: any;
    pricelmeList: any;
    count: any;
    counter: any;
    public products;
    public requirements;
    

    constructor(public http: Http, public af: AngularFire, public storage: Storage) {
        this.productList = firebase.database().ref('/products');
        this.pricemcxList = firebase.database().ref('/prices/mcx');
        this.pricelmeList = firebase.database().ref('/prices/lme');



        this.requirementList = firebase.database().ref('/requirements');

        this.requirementList.on('value', memberList => {
            let members = [];
            let keys = [];

            memberList.forEach(country => {
                members.push(country.val());
                keys.push(country.key);
            });

            for (var i in members) {
                members[i].key = keys[i];

            }
            //this.buildRequirementArray(members);
            this.requirements = members.reverse();
            console.log("requirements ready");
        });


        this.productList.on('value', countryList => {
            let countries = [];
            let keys = [];

            countryList.forEach(country => {

                countries.push(country.val());
                keys.push(country.key);
            });
            for (var i in countries) {
                countries[i].key = keys[i];
            } 

            this.buildArray(countries);
            //this.products = countries;
            //this.loadedlist = countries;
            //console.log("here", this.directory);
            //this.loadingPopup.dismiss();


        });
        this.currentUser = firebase.auth().currentUser;
        this.myProductList = firebase.database().ref('/users/' + this.currentUser.uid + '/products');
        this.recentList = firebase.database().ref('/users/' + this.currentUser.uid + '/recent');

        this.count = firebase.database().ref('/users/' + this.currentUser.uid + '/recent');
        this.count.once('value', snapshot => {
            console.log(snapshot);
            if (snapshot.numChildren() > 0) {
                snapshot.forEach(value => {

                    if (value.key === "count") {

                        this.counter = value.val();
                        return
                    }
                    this.counter = 0;

                });
            }
            else {
                this.recentList.set({
                    count: 0
                });
                this.counter = 0;
            }
        });
        this.setUser();



        
    }

    private buildArray(array) {
        return new Promise(resolve => {
            let m = array.length, t, i;

            // While there remain elements to shuffle…
            while (m) {

                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);

                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }

            this.products = array;
            console.log("products ready");
        });
    }

   /**
     private buildRequirementArray(array) {
        return new Promise(resolve => {
            let m = array.length, t, i;

            // While there remain elements to shuffle…
            while (m) {

                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);

                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }

            this.requirements = array;

        });
    }**/
    setUser() {

        this.storage.ready().then(() => {
            // set a key/value

            console.log("storage ready");
            this.storage.set('currentuser', JSON.stringify(this.currentUser)).then(() => {
                //this.currentprofile = user;
                console.log("storage set");
                //this.rootPage = TabsPage;
            })


                .catch((err) =>
                    console.log(err));


            //console.log(this.currentprofile);
            // Or to get a key/value pair
            // this.storage.get('currentuser').then((val) => {
            //     console.log('Current User', JSON.parse(val));
            //})

            //this.loading.dismiss().then(() => {
            //console.log(error);


            //});

        }).catch((err) =>
            console.log(err));
    }

    getProduct(key: any): Observable<any> {
        return this.af.database.object('products/' + key);
    }
  /**getProduct(key: any): any {
      console.log(key);
      return this.productList.child(key);
  }**/

  /**
  * This one takes 2 string parameters, firstName & lastName, it just saves those 2 to the userProfile/uid node
  * for the current user as the firstName & lastName properties.
  */
    updatemcxPrices(key: any, Name: string, Price: any, Type: string): any {

       return this.pricemcxList.child(key).update({

           name: Name,
           time: firebase.database['ServerValue']['TIMESTAMP'],
           price: Price,
           type: Type
        });
       
    }
    addmcxPrices(Name: string, Price: any, Type: string): any {

        return this.pricemcxList.push({

            name: Name,
            time: firebase.database['ServerValue']['TIMESTAMP'],
            price: Price,
            type: Type
        });

    }
    addlmePrices(Name: string, Price: any, Type: string): any {

        return this.pricelmeList.push({

            name: Name,
            time: firebase.database['ServerValue']['TIMESTAMP'],
            price: Price,
            type: Type
        });

    }
    deletemcx(key: any): any {

        this.pricemcxList.child(key).remove();
        
    }

    updatelmePrices(key: any, Name: string, Price: any, Type: string): any {

       return this.pricelmeList.child(key).update({

           name: Name,
           time: firebase.database['ServerValue']['TIMESTAMP'],
           price: Price,
           type: Type
        });
        
    }

    deletelme(key: any): any {

        this.pricelmeList.child(key).remove();

    }

    updateName(key: any, Name: string): any {

        this.myProductList.child(key).update({

            name: Name
        });
      return this.productList.child(key).update({
          name: Name,
          //lastName: lastName,
      });
  }
    updateGrade(key: string, Grade: string): any {

        this.myProductList.child(key).update({

            gradeval: Grade
        });
       this.productList.child(key).update({

          gradeval: Grade
          
      });
  }
  updateFinish(key: any, Finish: string): any {
      return this.productList.child(key).update({
          finish: Finish,
          //lastName: lastName,
      });
  }
  updateThickness(key: any, Thickness: number): any {
      return this.productList.child(key).update({
          thickness: Thickness,
          //lastName: lastName,
      });
  }
  updateWidth(key: any, Width: number): any {
      return this.productList.child(key).update({
          width: Width,
          //lastName: lastName,
      });
  }
  updateLength(key: any, Length: number): any {
      return this.productList.child(key).update({
          length: Length,
          //lastName: lastName,
      });
  }
  updateWeight(key: any, Weight: number): any {
      return this.productList.child(key).update({
          weight: Weight,
          //lastName: lastName,
      });
  }
  updateNos(key: any, Nos: number): any {
      return this.productList.child(key).update({
          nos: Nos,
          //lastName: lastName,
      });
  }
  updateMrate(key: any, Mrate: number): any {

      this.myProductList.child(key).update({

          mrate: Mrate
      });

      return this.productList.child(key).update({
          mrate: Mrate,
          //lastName: lastName,
      });
  }
  updateKrate(key: any, Krate: number): any {
      this.myProductList.child(key).update({

          krate: Krate
      });

      return this.productList.child(key).update({
          krate: Krate,
          //lastName: lastName,
      });
  }
  updateComposition(key: any, Composition: string): any {
      return this.productList.child(key).update({
          composition: Composition,
          //lastName: lastName,
      });
  }
  updateOrigin(key: any, Origin: string): any {
      return this.productList.child(key).update({
          origin: Origin,
          //lastName: lastName,
      });
  }
  updateBrand(key: any, Brand: string): any {
      return this.productList.child(key).update({
          brand: Brand,
          //lastName: lastName,
      });
  } 

  updateCategory(key: any, Category: string): any {
      return this.productList.child(key).update({
          pcategory: Category,
          //lastName: lastName,
      });
  } 
  updatePtype(key: any, Ptype: string): any {
      return this.productList.child(key).update({
          ptype: Ptype,
          //lastName: lastName,
      });
  } 

  updateSizes(key: any, Sizes: string): any {
      return this.productList.child(key).update({
          sizes: Sizes,
          //lastName: lastName,
      });
  } 
  updateType(key: any, Type: string): any {
      return this.productList.child(key).update({
          type: Type,
          //lastName: lastName,
      });
  } 

  updateSwg(key: any, Swg: string): any {
      return this.productList.child(key).update({
          swg: Swg,
          //lastName: lastName,
      });
  } 

  updateSch(key: any, Sch: string): any {
      return this.productList.child(key).update({
          sch: Sch,
          //lastName: lastName,
      });
  } 

  updateMm(key: any, MM: string): any {
      return this.productList.child(key).update({
          mm: MM,
          //lastName: lastName,
      });
  } 

  updateQuantity(key: any, quantity: string): any {
      return this.productList.child(key).update({
          quantity: quantity,
          //lastName: lastName,
      });
  }

  updateUnit(key: any, unit: string): any {
      return this.productList.child(key).update({
          unit: unit,
          //lastName: lastName,
      });
  } 
  updateGuarantee(key: any, guarantee: string): any {
      return this.productList.child(key).update({
          guarantee: guarantee,
          //lastName: lastName,
      });
  } 

  updateQuality(key: any, quality: string): any {
      return this.productList.child(key).update({
          quality: quality,
          //lastName: lastName,
      });
  }

  updateMtc(key: any, mtc: string): any {
      return this.productList.child(key).update({
          mtc: mtc,
          //lastName: lastName,
      });
  } 


  deleteProduct(key: any): any {
      
      this.productList.child(key).remove();
      this.myProductList.child(key).remove();
    
  }
  deleteRequirement(key: any): any {

      this.requirementList.child(key).remove();

  }

  setRecent(product: any) {

      //if (this.count == 4) {
      //    this.counter = 0
      //}
      //else {
      //    this.counter = this.count + 1;
      //}
      if (this.counter == 3) {
          this.counter = 0
      }
      else{
        this.counter = this.counter + 1;
      }
      this.recentList.child(this.counter).set({
          product: product

      });

      this.recentList.update({
          count : this.counter
      });


  }
}
