import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BulkDetailsPage } from './bulk-details';

@NgModule({
  declarations: [
    BulkDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BulkDetailsPage),
  ],
  exports: [
    BulkDetailsPage
  ]
})
export class BulkDetailsPageModule {}
