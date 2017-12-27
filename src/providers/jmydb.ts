import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import {AuthService} from "../providers/auth-service";
import {Common} from "../providers/common";

/*
  Generated class for the Common provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class JMYDB {
  public userDetails : any;
  public resposeData : any;
  public resultado : any;
  userPostData = {
    "user_id": "",
    "token": "",
    "head": {},
    "body": {},
    "fn":""
  };
  //public loader: any;

  constructor(public loadingCtrl: LoadingController,public toastCtrl: ToastController, public authService : AuthService,public common: Common) {
    console.log('jmydb inc');
    
  } 
  /*
    jmy({
          "fn":"ver", // ver, guardar
          "head":{
            "tabla":"DBINDEX", // *obligatorio ver, guardar
            //"ID_F":"DBINDEX", // opcional ver, guardar
            //"COL":{"nombre_db","nombre"}, // opcional ver
            //"SALIDA":{"nombre_db","nombre"}, // opcional ver
            //"ID_V":{}, // opcional ver
            //"ID_S":{}, // opcional ver
            //"LIKE_V":{"angora","luciernaga"}, // opcional ver
            //"LIKE_V_OPER":"OR", // opcional ver
            //"resultado" : "api_menu", // 
          }, 
          "body":{
            "varialbe1":"guardar uno",
            "varialbe2":{"guardar uno","guardar dos"},
          }, //  guardar
    });
  */
  public jmy(datos){

      //var 
      var data = JSON.parse(localStorage.getItem('userData'));
      if(data!=undefined){


        
            this.userDetails = data.userData;
            this.userPostData.user_id = this.userDetails.user_id;
            this.userPostData.token = this.userDetails.token;
            this.userPostData.fn = datos.fn;       
            this.userPostData.head = datos.head;
            this.userPostData.body = datos.body;

            console.log(this.userPostData);
            //this.common.presentLoading();
            this
              .authService
              .postData(this.userPostData, "jmydb")
              .then((result) => {
                this.resultado=result;
                //if(datos.titulo!=undefined)
                  console.log(datos.titulo);
                  
                console.log(this.resultado);
              }, (err) => {
                //Connection failed message
              });
       }
  }

  public jmyUsuarios(datos){
    /*
      jmyUsuarios({"fn":"lista"}); // lista de usuarios
      jmyUsuarios({"fn":"ver","id_user":"1"}); // ver usuario
      jmyUsuarios({"fn":"guardar","id_user":"1", "body":{"var1":"var1"}}); // Guardar configuraciones del usuario
    */

      //var 
      const data = JSON.parse(localStorage.getItem('userData'));
      this.userDetails = data.userData;
      this.userPostData.user_id = this.userDetails.user_id;
      this.userPostData.token = this.userDetails.token;
      console.log(this.userPostData);
      //this.common.presentLoading();
      this
        .authService
        .postData(this.userPostData, "listaUsuarios")
        .then((result) => {
          this.resultado=result;       
          console.log(this.resultado);
        }, (err) => {
          //Connection failed message
        });
  }

  alerta(men) {
    const toast = this.toastCtrl.create({
      message: men,
      duration: 9000,
      position: 'top'
    });
    toast.present();
   }

}
