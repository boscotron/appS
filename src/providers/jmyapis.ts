import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { AuthService } from "../providers/auth-service";
import { Common } from "../providers/common";
import { JMYDB } from "../providers/jmydb";
import 'rxjs/add/operator/map';

@Injectable()
export class jmyapis {
  public hostApisList:any;
  public userDetails : any;
  public resposeData : any;
  public dataSet : any;
  public test : any;
  public resultado : any;
  tb:any;
  /* variables de session */
   uPD = {
    "user_id": "",
    "token": "",
    "api": "",
    "empresa": "",
    "head": {},
    "body": {},
    "fn":""
  };
  json_head = {
    "nombre":""
  };
  constructor(public http: Http,public authService : AuthService,public jmyDB: JMYDB,public common: Common,public toastCtrl: ToastController) {
    /* Colocar las API´s o Modulos disponibles en esta aplicación */
    this.hostApisList = {"938a6b38e5092f1ccaede78f57665fdc":{
                             "nombre":"Modulo",
                             "version":"1.0"
                           },
                        "8936a70da4c53e42de93a427d7a82fab":{
                             "nombre":"Directorio",
                             "version":"1.0"
                           }

                         };
  }
  /* NO EDITAR A PARTIR DE AQUI */
  /* funciones para alta, baja y cambios de registros por apis, empresas y permisos */
  borrar(datos){
    return new Promise((resolve, reject) =>{
      datos.head.borrar = true;
      this.resultado = this.guardar(datos);
      if(this.resultado!=undefined){
          resolve(this.resultado);
      }else{
          reject({error:'no data user'});
        } 
    });
  }
  guardar(datos){
    return new Promise((resolve, reject) =>{
      var data = JSON.parse(localStorage.getItem('userData'));
      if(data!=undefined){
            this.userDetails=data.userData;
            this.uPD.user_id=this.userDetails.user_id;
            this.uPD.token=this.userDetails.token;
            this.uPD.head=datos.head;
            this.uPD.body=datos.body;
            this.uPD.api=datos.head.API;
            this.uPD.fn=(datos.head.borrar)?"borrar":"guardar";
            this.uPD.empresa=this.empresaactual();
            this.common.presentLoading();
            this.authService.postData(this.uPD,"apibd")
              .then((result)=>{
                this.resultado=result;
                console.log(this.resultado);
                
                resolve(this.resultado);
              },(err)=>{
                this.resultado=err;
                reject({error:'send',err:err});
              });
            this.common.closeLoading();
       }else{reject({error:'no data user'});}
    });
  }
  ver(datos){
    return new Promise((resolve, reject) =>{
      var data = JSON.parse(localStorage.getItem('userData'));
      if(data!=undefined){
            this.userDetails = data.userData;
            this.uPD.user_id = this.userDetails.user_id;
            this.uPD.token = this.userDetails.token;
            this.uPD.head = datos.head;
            this.uPD.body = datos.body;
            this.uPD.api = datos.head.API;
            this.uPD.fn = "ver";
            this.uPD.empresa =  this.empresaactual();
            //this.common.presentLoading();
            console.log(this.uPD);
            
            this.authService.postData(this.uPD, "apibd")
              .then((result) => {
                this.resultado=result;
                  
                  if(this.resultado!=undefined){
                    if(this.resultado.error=='ninguno' && this.resultado.ver.otKey!=null){

                          resolve(this.resultado);

                    }else { this.alerta("Error al conectar con el servidor Error:"+this.resultado.error);}
                  }else{reject({error:'no data user'});}


              }, (err) => {
                this.resultado=err;
               reject({error:'send',err:err});
              });
       }else{reject({error:'no data user'});}
    });
  }
  empresaactual(){
    var d = JSON.parse(localStorage.getItem('jmyData'));
     if(d!=undefined)
       return d.primerempresa;
  }


  alerta(men) {
    const toast = this.toastCtrl.create({
      message: men,
      duration: 9000,
      position: 'top'
    });
    toast.present();
   }
  /* funciones para el menu */
  vermenu(idEmpresa){
     var data = JSON.parse(localStorage.getItem('jmyData'));
     return (data.menu[idEmpresa]!=undefined) ? data.menu[idEmpresa]:[];} 
  verempresas(){
     var data = JSON.parse(localStorage.getItem('jmyData'));
     return (data!=null) ? data.empresaDisp:[];} 
  verempresasapis(idEmpresa){
     const data = JSON.parse(localStorage.getItem('jmyData'));
     return (data!=undefined)? data.empresasApis[idEmpresa]:0;}
  empresaapi(idEmpresa){
    var data = JSON.parse(localStorage.getItem('jmyData'));
    if(data!=undefined){
    this.cambiarempresa(idEmpresa);  
    if(data.empresaApi[idEmpresa]!=undefined){
      return data.empresaApi[idEmpresa].api;
    }else{return null;}}}
   cambiarempresa(idEmpresa){
    var data = JSON.parse(localStorage.getItem('jmyData'));
    if(data!=undefined){
        data.primerempresa=idEmpresa;
        localStorage.removeItem("jmyData");
        localStorage.setItem('jmyData',JSON.stringify(data));}}
  empresadefault(){
     var data = JSON.parse(localStorage.getItem('jmyData'));
     return (data!=undefined)? data.primerempresa:0;}
}
