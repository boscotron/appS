import {Component} from '@angular/core';
import {IonicPage,NavController, App, AlertController,ToastController } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {Common} from "../../providers/common";


/**
 * Generated class for the ApiSKeyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-api-s-key',
  templateUrl: 'api-s-key.html',
})
export class ApiSKeyPage {

   public userDetails : any;
  public resposeData : any;
  public dataSet : any;
  userPostData = {
    "user_id": "",
    "token": "",
    "nombre": "",
    "json_body": {},
    "fn":""
  };
  json_head = {
  	"nombre":""
  };
  constructor(public common: Common, private alertCtrl: AlertController,public navCtrl : NavController, public app : App, public authService : AuthService,public toastCtrl: ToastController) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

    this.empresas_lista();

  }



  empresas_lista() {
    console.log("empresas FN");
    console.log(this.userPostData);
   // this.common.presentLoading();
    this
      .authService
      .postData(this.userPostData, "api")
      .then((result) => {
        this.resposeData = result;
        if (this.resposeData.feedData) {
          this.dataSet = this.resposeData.feedData;
          console.log(this.dataSet);

          console.log(this.resposeData);
        } else {
          console.log("No access");
        }

      }, (err) => {
        //Connection failed message
      });
  }





  empresas_guardar() {
    

    this.userPostData.nombre = this.json_head.nombre;
    if(this.userPostData.nombre !=""){
	    this.userPostData.fn = 'guardar'; 
	    console.log(this.userPostData);
	    //this.common.presentLoading();
	    this
	      .authService
	      .postData(this.userPostData, "api")
	      .then((result) => {
	      	console.log(result);
	        this.resposeData = result;
	        this.alerta(this.resposeData.guardado);
	        if (this.resposeData.feedData) {
	           this.dataSet = this.resposeData.feedData;
	           this.json_head.nombre = "";
	          console.log(this.resposeData);
	        } else {
	          console.log("No access");
	        }this.common.closeLoading();

	      }, (err) => {
	        //Connection failed message
	      });
	  }else{
	  	  this.alerta("Debe ingresar almenos 3 caracteres");
	  }
  }

  alerta(men) {
    const toast = this.toastCtrl.create({
      message: men,
      duration: 9000,
      position: 'top'
    });
    toast.present();
   }
  converTime(time) {
    let a = new Date(time * 1000);
    return a;
  }

  backToWelcome() {
    const root = this
      .app
      .getRootNav();
    root.popToRoot();
  }

  logout() {
    //Api Token Logout

    localStorage.clear();
    setTimeout(() => this.backToWelcome(), 1000);

  }

}
