import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminEditarUsuarioPage } from './admin-editar-usuario';

@NgModule({
  declarations: [
    AdminEditarUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminEditarUsuarioPage),
  ],
  exports: [
    AdminEditarUsuarioPage
  ]
})
export class AdminEditarUsuarioPageModule {}
