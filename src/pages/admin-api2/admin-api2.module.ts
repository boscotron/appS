import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminApi2Page } from './admin-api2';
import { ApiSKeyPage } from '../api-s-key/api-s-key';

@NgModule({
  declarations: [
    AdminApi2Page,
    ApiSKeyPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminApi2Page),
  ]
})
export class AdminApi2PageModule {}
