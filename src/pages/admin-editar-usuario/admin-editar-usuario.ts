import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {Common} from "../../providers/common";
/**
 * Generated class for the AdminEditarUsuarioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-admin-editar-usuario',
  templateUrl: 'admin-editar-usuario.html',
})
export class AdminEditarUsuarioPage {

  public userDetails : any;
  public resposeData : any;
  public dataSet : any;
  public empresas : any;
  userPostData = {
    "user_id": "",
    "token": "",
    "body": {"usuario":"",
            "empresa":"",
            "data":{}
          },
    "fn":""
  };
  constructor(public common: Common, public navCtrl: NavController, public authService : AuthService, public navParams: NavParams, public toastCtrl: ToastController) {
  		const data = JSON.parse(localStorage.getItem('userData'));
	    this.userDetails = data.userData;
	    this.userPostData.user_id = this.userDetails.user_id;
	    this.userPostData.token = this.userDetails.token;
	    this.empresas_lista();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminEditarUsuarioPage');
  }
  empresas_lista() {

    console.log("empresas FN");
    this
      .authService
      .postData(this.userPostData, "empresas")
      .then((result) => {
        this.resposeData = result;
        if (this.resposeData.feedData) {
        	this.empresas = this.resposeData.feedData;
         //this.dataSet = 
          console.log(this.dataSet);
          console.log(this.resposeData);
          this.empresas=this.resposeData.feedData;
        } else {
          console.log("No access");
           this.empresas=false;
        }
      }, (err) => {
        //Connection failed message
      });
	}


}
