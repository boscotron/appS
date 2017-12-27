import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the AdminApi2Page tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-admin-api2',
  templateUrl: 'admin-api2.html'
})
@IonicPage()
export class AdminApi2Page {

  apiSKeyRoot = 'ApiSKeyPage'
  dataBaseRoot = 'DataBasePage'


  constructor(public navCtrl: NavController) {}

}
