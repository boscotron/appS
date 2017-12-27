import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminApiPage } from './admin-api';

@NgModule({
  declarations: [
    AdminApiPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminApiPage),
  ],
  exports: [
    AdminApiPage
  ]
})
export class AdminEmpresasPageModule {}
