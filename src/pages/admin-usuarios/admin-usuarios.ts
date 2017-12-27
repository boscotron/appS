import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {Common} from "../../providers/common";
import { AdminEditarUsuarioPage } from '../admin-editar-usuario/admin-editar-usuario';


/**
 * Generated class for the AdminUsuariosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-admin-usuarios',
  templateUrl: 'admin-usuarios.html',
})
export class AdminUsuariosPage {

  public userDetails : any;
  public resposeData : any;
  public dataSet : any;
  public empresas : any;

  public divs : any;
  public divApis : boolean;
  public divUsuarios : boolean;

  public usuario : any;    
  public apisSelect : any;    
  public permisoSelect	 : any;    
  public listaApis	 : any;   
  public usrdisp : any;
  public listaPermisos : any;
  print = {"empresaApi":"",
          "nombrePermisos":"Nombre de usuario"
			};
  permisos = {	"ID_APK":"",
				"P":""
			};
  formulario = {"id_empresa":"",
          "id_usuario":"",
          "nombre":"",
          "nickname":"",
          "correo":"",
  				"pass":"",
  				"permisos":{},
  			};
  mensajes = {
  		"perm_0":"Oculto al usuario",
  		"perm_1":"Oculto al usuario",
  		"perm_2":"Oculto al usuario",
  		"perm_3":"Oculto al usuario",
  		"perm_4":"Oculto al usuario",
  };
  nivelPermisos = [	{"nombre":"Oculto",
  					 "nivel":"0"
					},
					{"nombre":"Consulta",
  					 "nivel":"1"
					},
					{"nombre":"Autor",
  					 "nivel":"2"
					},
					{"nombre":"Editor",
  					 "nivel":"3"
					},
					{"nombre":"Administrador",
  					 "nivel":"4"
					},
  ];
  guardar : {
  		"usuarios":{},
      "empresas":{},
  		"apis":"",
  		"permisos":"",
  };
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
    this.api_lista();

    this.divs = {	"usuario":true,
    				"empresas":false,
          "apis":false,
          "verPermisos":false,
					"editarUsuario":false,
  	};

    this.print.empresaApi = '';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminUsuariosPage');
  }
   
   push() {
    this.navCtrl.push(AdminEditarUsuarioPage);
  }
   editarUsuario(email) {



      this.userPostData.fn = "verUsrEdit" ;
      this.userPostData.body.usuario = email;
      console.log("verificarUsuario FN");
       console.log(this.userPostData);
      this.common.presentLoading();
      this.authService
        .postData(this.userPostData, "usuarios")
        .then((result) => {
          this.resposeData = result;
          console.log(this.resposeData);
          if (this.resposeData.count>0) {

             this.divs.editarUsuario = true;
             this.formulario.id_usuario=this.resposeData.feedData.user_id;
             this.formulario.nombre=this.resposeData.feedData.name;
             this.formulario.nickname=this.resposeData.feedData.username;
             this.formulario.correo=this.resposeData.feedData.email;
             this.formulario.pass="";


            //this.usrdisp = this.resposeData.feedData;
            //this.guardar.usuarios = this.usrdisp;
            //this.divs.empresas = true;
             
          } else {
            this.alerta("No se encontraron usuarios.");
            this.divs.editarUsuario = false;
          }
        }, (err) => {
          //Connection failed message
        });

        this.common.closeLoading();
    



   this.alerta("editar usuario"+email);
  }

  guardarEditarUsuario(){

    console.log(this.formulario);
     this.userPostData.fn = "guardarUsrEdit" ;
      this.userPostData.body.data = this.formulario;
      console.log("verificarUsuario FN");
       console.log(this.userPostData);
      this.common.presentLoading();
      this.authService
        .postData(this.userPostData, "usuarios")
        .then((result) => {
          this.resposeData = result;
          console.log(this.resposeData);
         /* if (this.resposeData.count>0) {

             this.divs.editarUsuario = true;
             this.formulario.nombre=this.resposeData.feedData.name;
             this.formulario.nickname=this.resposeData.feedData.username;
             this.formulario.correo=this.resposeData.feedData.email;
             this.formulario.pass="";


            //this.usrdisp = this.resposeData.feedData;
            //this.guardar.usuarios = this.usrdisp;
            //this.divs.empresas = true;
             
          } else {
            this.alerta("No se encontraron usuarios.");
            this.divs.editarUsuario = false;
          }*/
        }, (err) => {
          //Connection failed message
        });

        this.common.closeLoading();
    

  }
  verificarUsuario(){
  	if(this.usuario!=undefined){	
    	this.userPostData.fn = "verUsr" ;
    	this.userPostData.body.usuario = this.usuario;
    	console.log("verificarUsuario FN");
	     console.log(this.userPostData);
	    this.common.presentLoading();
	    this.authService
	      .postData(this.userPostData, "usuarios")
	      .then((result) => {
	        this.resposeData = result;
	        console.log(this.resposeData);
	        if (this.resposeData.count>0) {
	        	this.usrdisp = this.resposeData.feedData;
            //this.guardar.usuarios = this.usrdisp;
            this.divs.empresas = true;
	          	console.log(this.usrdisp);
	        } else {
            this.alerta("No se encontraron usuarios.");
            this.divs.empresas = false;
	        }
	      }, (err) => {
	        //Connection failed message
	      });

	      this.common.closeLoading();
    }else{
    	this.alerta("Define un usuario válido");
    }

  }

  asignarEmpresa(){
    console.log(this.formulario.id_empresa);
    
     if(this.formulario.id_empresa==""){
      this.alerta("Se requiere selecionar a la empresa que se editará los usuarios");
     }else{
      //this.guardar.empresas = this.formulario.id_empresa;
      this.divs.empresas = false;
      this.divs.usuario = false;
      this.divs.apis = true;
      console.log(this.guardar);
      //this.verPermisos();
    }
  }


  verPermisos(email){

      this.userPostData.fn = "verPermisos" ;
      this.userPostData.body.usuario = email;
      this.userPostData.body.empresa = this.formulario.id_empresa;
      console.log("verPermisos FN");
       console.log(this.userPostData);
      this.common.presentLoading();
      this.authService
        .postData(this.userPostData, "usuarios")
        .then((result) => {
          this.resposeData = result;
          console.log(this.resposeData);
          if(this.resposeData.count<1){
            this.divs.verPermisos = false;
            this.alerta("No hay resultados de esa cuenta");
            this.listaPermisos = {};
            this.print.nombrePermisos = "Nombre de usuario";
          }else{
            this.listaPermisos = this.resposeData.o;
            this.divs.verPermisos = true;
            this.print.nombrePermisos = this.resposeData.feedData.username;

          }

        }, (err) => {
          //Connection failed message
        });
        this.common.closeLoading();
  }



  asignacion(id,permiso){  	
    this.guardar.apis = id;
    this.guardar.permisos = permiso;
    console.log(this.guardar);  	
  }
  asignarApi(id,permiso){
  	this.divs.empresas = false;
    this.divs.usuario = false;
    this.divs.apis = false;
  }

  verAPIS(){
    this.divApis = true;
    this.print.empresaApi = 'Nombre de la empresa';
  }
  guardarPermisos(){
	  
    this.guardar = {
	  		"usuarios":this.usuario,
        "empresas":this.formulario.id_empresa,
	  		"apis":this.apisSelect,
	  		"permisos":this.permisoSelect,
	  };

    if(this.guardar.apis==undefined)
      this.alerta("Se requiere selecionar almenos una API");

    if(this.guardar.permisos==undefined)
      this.alerta("Se requiere selecionar el nivel de permiso");

     if(this.guardar.apis!=undefined && this.guardar.permisos!=undefined ){
      this.userPostData.fn = "guaPerm" ;
      this.userPostData.body.data = this.guardar;
      console.log("verPermisos FN");
       console.log(this.userPostData);
      this.common.presentLoading();
      this.authService
        .postData(this.userPostData, "usuarios")
        .then((result) => {
          this.resposeData = result;
          console.log(this.resposeData);    
        }, (err) => {
             console.log(err);
          //Connection failed message
        });
        this.common.closeLoading();
  	  console.log(this.guardar);
  	  this.alerta("Permisos de usuario guardado correctamente");
    }
	  
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
          this.listaApis = this.resposeData.feedData;
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



  alerta(men) {
    const toast = this.toastCtrl.create({
      message: men,
      duration: 9000,
      showCloseButton: true,
      closeButtonText: 'X',
      position: 'top'
    });
    toast.present();
   }

}
