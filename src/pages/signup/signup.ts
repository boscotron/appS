import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import { ToastController } from 'ionic-angular';

import {TabsPage} from '../tabs/tabs';
import {Login} from "../login/login";

/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({selector: 'page-signup', templateUrl: 'signup.html'})
export class Signup {
  resposeData : any;
  tmpBSK : any;
  userData = {"username":"", "password":"","email":"","name":""};
  constructor(public navCtrl : NavController, public authService : AuthService,public toastCtrl: ToastController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }
  presentToast(mensaje: any) {
      let toast = this.toastCtrl.create({
        message: mensaje,
        duration: 10000,
        closeButtonText: 'Ok'
      });
      toast.present();
    }
  signup() {
    if(this.userData.username && this.userData.password && this.userData.email && this.userData.name){
      //Api connections
    this.authService.postData(this.userData, "signup").then((result) =>{
    this.resposeData = result;
    console.log(this.resposeData);
      this.tmpBSK = this.resposeData.userData;
        console.log(this.tmpBSK);
        
     if(this.tmpBSK===undefined ){
         console.log("no se pudo registrar por falta de criterios");
         this.presentToast("Verifica que los datos esten correctos. El usuario requiere de almenos 3 caracteres, la contraseña requiere de al menos 6 caracteres");
      }else{
         console.log(this.resposeData.userData); 
         localStorage.setItem('userData', JSON.stringify(this.resposeData) )
         this.navCtrl.push(TabsPage);
      }

  


    
    }, (err) => {
      this.presentToast("Ocurrio un error de conexión, por favor verifica tu conexión a internet");
    });
  }
  else {
    this.presentToast("Por favor ingresa datos válidos");
    console.log("Give valid information.");
  }
  
  }

  login() {
    this
      .navCtrl
      .push(Login);
  }

}
