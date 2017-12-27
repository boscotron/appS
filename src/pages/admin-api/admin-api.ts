import {Component} from '@angular/core';
import {NavController, App, AlertController,ToastController } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {Common} from "../../providers/common";
import {jmyapis} from "../../providers/jmyapis";


@Component({
  selector: 'page-admin-api',
  templateUrl: 'admin-api.html',
})
export class AdminApiPage {

  public userDetails : any;
  public resposeData : any;
  public dataSet : any;
  public out : any;
  public empresas : any;
  public nomEmpresa : any;
  public apis : any;
  public listaDB : any;
  tb:any;
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
  form_nueva_db = {
    "user_id": "",
    "token": "",
    "id_empresa":"",
    "apk_key":"",
    "nombre_db":"",
    "fn":""
  };
  constructor(public common: Common, private alertCtrl: AlertController,public navCtrl : NavController, public app : App, public authService : AuthService,public toastCtrl: ToastController, public jmyApis: jmyapis) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

    this.api_lista();
    this.empresas_lista();
    this.lista_base_de_datos();
    this.nomEmpresa = this.jmyApis.verempresas();
  }

  nombreEmpresa(id){
    var d = this.nomEmpresa;
    for(var i=0;i<d.length;i++){
      this.tb = d[i];
      if(this.tb.id_empresa==id){
        return this.tb.nombre;
      }}
  }

  nombreApi(id){
    var d = this.dataSet;
    for(var i=0;i<d.length;i++){
      this.tb = d[i];
      if(this.tb.apk_key==id){
        return this.tb.nombre;
      }}
  }

  generar_base_de_datos(){
   
    this.userPostData.json_body = this.form_nueva_db;
    if(this.form_nueva_db.nombre_db !="" && this.form_nueva_db.id_empresa !="" && this.form_nueva_db.apk_key !=""  ){
      this.userPostData.fn = 'nuevaDB'; 
      //this.common.presentLoading();
      this
        .authService
        .postData(this.userPostData, "api")
        .then((result) => {
          console.log(result);
          
          this.lista_base_de_datos();
          this.form_nueva_db.nombre_db ="";
          this.form_nueva_db.id_empresa ="";
          this.form_nueva_db.apk_key =""; 
          this.alerta("Nueva base de datos generada");

        }, (err) => {
          //Connection failed message
        });
    }else{
        this.alerta("Debe ingresar almenos 3 caracteres");
    }
    
  }

  
  lista_base_de_datos(){
   
   
    
      this.userPostData.fn = 'listaDB'; 
      console.log(this.userPostData);
      console.log("lista_base_de_datos");
      
      //this.common.presentLoading();
      this
        .authService
        .postData(this.userPostData, "api")
        .then((result) => {
          console.log(result);
            this.listaDB = result;
            this.listaDB = this.listaDB.listaDB.otFm;
            console.log(this.listaDB);
             
          /*this.alerta(this.resposeData.guardado);
          if (this.resposeData.feedData) {
             this.json_head.nombre = "";
            console.log(this.resposeData);
          } else {
            console.log("Ion - No access");
          }//this.common.closeLoading();
        */
        }, (err) => {
          //Connection failed message
        });
  }

  empresas_lista() {

    console.log("empresas FN");
    this
      .authService
      .postData(this.userPostData, "empresas")
      .then((result) => {
        this.resposeData = result;
        if (this.resposeData.feedData) {
         //this.dataSet = this.resposeData.feedData;
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
    console.log(this.empresas);
  }


  api_lista() {
    console.log("api FN");
    console.log(this.userPostData);
    this.common.presentLoading();
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

      this.common.closeLoading();
  }





  api_guardar() {
    

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
