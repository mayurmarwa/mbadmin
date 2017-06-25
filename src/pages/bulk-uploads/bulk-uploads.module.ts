import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BulkUploadsPage } from './bulk-uploads';

@NgModule({
  declarations: [
    BulkUploadsPage,
  ],
  imports: [
    IonicPageModule.forChild(BulkUploadsPage),
  ],
  exports: [
    BulkUploadsPage
  ]
})
export class BulkUploadsPageModule {}
