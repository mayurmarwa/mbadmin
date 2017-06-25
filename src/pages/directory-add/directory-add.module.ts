import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DirectoryAddPage } from './directory-add';

@NgModule({
  declarations: [
    DirectoryAddPage,
  ],
  imports: [
    IonicPageModule.forChild(DirectoryAddPage),
  ],
  exports: [
    DirectoryAddPage
  ]
})
export class DirectoryAddPageModule {}
