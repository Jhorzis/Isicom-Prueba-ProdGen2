import { Component, Inject, OnInit } from '@angular/core';
import { Linea } from '../models/linea';
import { SubLinea } from '../models/subLinea';
import { Admin } from '../models/admin';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProdGenServices } from '../services/prod-gen.service';
import { dlg_producto } from './prod-ge-dialog.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DialogoConfirmacionComponent } from './confirmation-dialog.component';
import { ProductoGenerico } from '../models/productoGenerico';

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
    public estado:string;

    constructor(public dlg: MatDialog,
        private _prodGenService: ProdGenServices,
        public dialogo: MatDialog,
        private _router: Router){
        this.mensaje_error = ""; this.estado = '';
        this.lista = []; this.lista2 = [];
        this.titulo = "";
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
      this.admin.combo3 = 'ACTIVO';

      var pg = sessionStorage.getItem('producto');
      var prod:ProductoGenerico = new ProductoGenerico(0,'','','','','','','','','','','');
      if(pg) prod = JSON.parse(pg) as ProductoGenerico;
      sessionStorage.removeItem('producto');
      console.log(prod);
      if(prod){
        this.admin.id = prod.id_producto_generico.toString();
        this.admin.campo1 = prod.codigo_sociedad;
        this.admin.combo1 = new Linea(prod.cod_linea,prod.linea);
        this.getSubLinea(prod.cod_linea);
        this.admin.combo2 = new SubLinea(prod.cod_sublinea,prod.cod_linea,prod.sublinea);
        this.admin.campo4 = prod.codigo_material;
        this.admin.campo5 = prod.material;
        this.admin.campo6 = prod.unimed;
        this.admin.combo3 = prod.estado;
      }

      if(this.admin.id != '0'){
        this.titulo = 'Actualizar Producto Genérico';
        this.estado = 'actualizar';
      }else{
        this.titulo = 'Nuevo Producto Genérico';
        this.estado = 'guardar';
      }
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

          dialogRef.afterClosed().subscribe(
            result=>{
              console.log(result);
              if(result){
                if(result['dat']){
                  var dato = result['dat'].split('¬');
                  this.admin.campo4 = dato[2];
                  this.admin.campo5 = dato[1];
                  this.admin.campo6 = dato[0];
                }
              }
            },
            error=>{
              console.log(error);
            }
          );
      }else{
          this.mensaje_error = 'Ingrese los datos necesarios.';
      }

  }

  buscarProd(){
    let tip = this.admin.campo2;
    var codmat = '';
    var descmat = ''
    this.lista2 = [];
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
          for(let lst of this.lista){
            this.lista2.push(lst['datos']);
          }
				}
			},
			(error) => {
				console.log("## ERROR: "); console.log(<any>error);
			}
    );
  }

  guardarProducto(){
    this._prodGenService.guardarProducto(this.admin.campo1,this.admin.combo1.id,this.admin.combo1.nombre,
      this.admin.combo2.id,this.admin.combo2.nombre,this.admin.campo4,this.admin.campo5,this.admin.campo6)
      .subscribe(
      (data: any) => {
				if(data['resultado'] != 1){
					console.log(data);
				}else{
					console.log(data['datos']);
          this._router.navigate(['/ConsultaProdGenerico']);
				}
			},
			(error) => {
				console.log("## ERROR: "); console.log(<any>error);
			}
    );
  }

  actualizarProducto(){
    this._prodGenService.actualizarProducto(parseInt(this.admin.id),this.admin.campo1,this.admin.combo1.id,this.admin.combo1.nombre,
      this.admin.combo2.id,this.admin.combo2.nombre,this.admin.campo4,this.admin.campo5,this.admin.campo6).subscribe(
      (data: any) => {
      if(data['resultado'] != 1){
        console.log(data);
      }else{
        console.log(data['datos']);
        this._router.navigate(['/ConsultaProdGenerico']);
      }
			},
			(error) => {
				console.log("## ERROR: "); console.log(<any>error);
			} 
    );
  }

  onSubmit(){
    console.log('CLick submit');
    this.dialogo.open(DialogoConfirmacionComponent, {
      data: '¿Desea '+this.estado+' el registro?'
    }).afterClosed().subscribe((confirmado: Boolean) => {
      if (confirmado) {
        if(this.admin.id){
          this.actualizarProducto();
        }else{ this.guardarProducto(); }
      } else { }
    });
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
  }

  right(str:string,chr:number){
    if(str){
      return str.slice(str.length-chr,str.length);
    }else{return '';}
  }

  left(str:string,chr:number){
    if(str){
      return str.slice(0,chr-str.length);
    }else{return '';}
  }
}


