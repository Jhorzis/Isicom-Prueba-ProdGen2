import { Component, Inject, OnInit } from '@angular/core';
import { Linea } from '../models/linea';
import { SubLinea } from '../models/subLinea';
import { Admin } from '../models/admin';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioModule} from '@angular/material/radio';
import { ProdGenServices } from '../services/prod-gen.service';
import { dlg_producto } from './prod-ge-dialog.component';


@Component({
  selector: 'prod-gen',
  templateUrl: '../views/prod-gen.html',
  providers: [ProdGenServices]
})
export class ProdGenComponent implements OnInit {
    public titulo: string;
    public mensaje_error: string;
    public admin: Admin;
    public Linea: Linea[];
    public lineaSelect : Linea;
    public lista: any[];
    public lista2: any[];
    public subLinea: SubLinea[];
    public subLineaSelect: SubLinea;

    constructor(public dlg: MatDialog,
        private _prodGenService: ProdGenServices){
        this.titulo = "Producto Genérico";
        this.mensaje_error = "";
        this.lista = [];
        this.lista2 = [];
        this.admin = new Admin("","","","","","","",(new Linea("00","Selecione una Linea")),
        (new SubLinea("00","0","Selecione una SubLinea")),(null));
        this.Linea = [];
        this.lineaSelect = new Linea("00","Selecione una Linea");
        this.subLinea = [];
        this.subLineaSelect = new SubLinea("00","0","Selecione una SubLinea");
    }

    ngOnInit(): void {
        this.Linea.push(new Linea("00","Selecione una Linea"));
        this.subLinea.push(new SubLinea("00","0","Selecione una SubLinea"));
        this.admin.campo2 = 'Nombre';
        this.getLinea();
    }

    getLinea(){
		this._prodGenService.getLineas().subscribe(
			(data: any) => {
				if(data['resultado'] != 1){
					console.log(data);
				}else{
					this.lista = data['datos'];
          for(let lst of this.lista){
            this.Linea.push(new Linea(lst['datos'].split("|")[1],lst['datos'].split("|")[0]));
          }
				}
			},
			(error) => {
				console.log("## ERROR: "); console.log(<any>error);
			}
    );
	}

  getSubLinea(codLinea: string){
    this._prodGenService.getSubLineas(codLinea).subscribe(
      (data: any) => {
				if(data['resultado'] != 1){
					console.log(data);
				}else{
					this.lista = data['datos'];
          for(let lst of this.lista){
            this.subLinea.push(new SubLinea(lst['datos'].split("|")[1],codLinea,lst['datos'].split("|")[0]));
          }
				}
			},
      (error) => {
				console.log("## ERROR: "); console.log(<any>error);
      }
    );
  }

  buscarProducto(){
      console.log("Buscar producto: "+this.admin.campo2);
      var codso = document.getElementById('txt_codSociedad');
      var linea = document.getElementById('cb_linea');
      var sublinea = document.getElementById('cb_sublinea');
      var req = true;
      codso?.classList.remove('input_error'); linea?.classList.remove('input_error'); 
      sublinea?.classList.remove('input_error');
      this.mensaje_error = '';
      if(this.admin.campo1 == ""){ codso?.classList.add('input_error'); req = false;}
      if(this.admin.combo1.id == '00'){ linea?.classList.add('input_error'); req = false; }
      if(this.admin.combo2.id == '00'){ sublinea?.classList.add('input_error'); req = false; }
      if(req){
          this.buscarProd();
          const dialogRef = this.dlg.open(dlg_producto,{
              width: '700px',
              data: {titulo: this.titulo, listaDatos: this.lista2}
          });
      }else{
          this.mensaje_error = 'Ingrese los datos necesarios.';
      }

  }

  buscarProd(){
    let tip = this.admin.campo2;
    var codmat = '';
    var descmat = ''
    if(tip == 'Codigo'){
      codmat = this.admin.campo3; descmat = ''
    }else{
      codmat = ''; descmat = this.admin.campo3
    }
    this._prodGenService.buscarProducto(this.admin.campo1,this.admin.combo1.id,this.admin.combo2.id,
      descmat,codmat).subscribe(
      (data: any) => {
				if(data['resultado'] != 1){
					console.log(data);
				}else{
					this.lista = data['datos'];
          //console.log(this.lista);
          for(let lst of this.lista){
            this.lista2.push(lst['datos']);
          }
          //console.log(this.lista2)
				}
			},
			(error) => {
				console.log("## ERROR: "); console.log(<any>error);
			}
    );
  }

  placeSelect(campo1:any,campo2:any){
      if (campo1==null || campo2==null) {
        return false;
      }
      return campo1.nombre===campo2.nombre;
    }
  
  mostrarSelec(){
      this.subLinea = [];
      this.subLineaSelect = new SubLinea("00","0","Selecione una SubLinea");
      this.subLinea.push(new SubLinea("00","0","Selecione una SubLinea"));
      this.getSubLinea(this.admin.combo1.id);
      console.log(this.admin.combo1);
    }

  onSubmit(){}
}


