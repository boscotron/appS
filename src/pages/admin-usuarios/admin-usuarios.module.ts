import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminUsuariosPage } from './admin-usuarios';

@NgModule({
  declarations: [
    AdminUsuariosPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminUsuariosPage),
  ],
  exports: [
    AdminUsuariosPage
  ]
})
export class AdminUsuariosPageModule {}
