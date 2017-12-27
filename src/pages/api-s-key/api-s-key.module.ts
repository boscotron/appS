import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApiSKeyPage } from './api-s-key';

@NgModule({
  declarations: [
    ApiSKeyPage,
  ],
  imports: [
    IonicPageModule.forChild(ApiSKeyPage),
  ],
  exports: [
    ApiSKeyPage
  ]
})
export class ApiSKeyPageModule {}
