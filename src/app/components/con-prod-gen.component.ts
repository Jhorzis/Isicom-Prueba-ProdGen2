import { Component, OnInit } from '@angular/core';
import { Linea } from '../models/linea';
import { SubLinea } from '../models/subLinea';
import { ProdGenServices } from '../services/prod-gen.service';
import { ProductoGenerico } from '../models/productoGenerico';

@Component({
  selector: 'con-prod-gen',
  templateUrl: '../views/con-prod-gen.html',
	providers: [ProdGenServices]
})
export class ConProdGenComponent implements OnInit {
  public titulo: string;
  public Linea: Linea[];
  public lineaSelect : Linea;
  public subLinea: SubLinea[];
  public subLineaSelect: SubLinea;
  public prod:string;
  public prodgen: ProductoGenerico[];
  public cantlistprod: number;
  public lista: any[];
  public paginas: number;
  public lstpaginas: number[];
  public idx: number;

  constructor(
		private _prodGenService: ProdGenServices
    ) {
    this.titulo = 'Producto Genérico';
    this.Linea = [];
    this.lineaSelect = new Linea("00","Selecione una Linea");
    this.subLinea = [];
    this.lista = [];
    this.subLineaSelect = new SubLinea("00","0","Selecione una SubLinea");
    this.prod = '';
    this.prodgen = [];
    this.cantlistprod = 0;
    this.paginas = 0;
    this.lstpaginas = [];
    this.idx = 1;
   }

  ngOnInit(): void {
    this.Linea.push(new Linea("00","Selecione una Linea"));
    this.subLinea.push(new SubLinea("00","0","Selecione una SubLinea"));
    
    this.getLinea();
    this.getProductos('','','','1');
    console.log("Comienzo producto");
  }

  refresh(): void {
    window.location.reload();
  }

  paginacion(pag:number){
    this.idx = pag;
    this.getProductos((this.lineaSelect.id == '00'? '':this.lineaSelect.id),
    (this.subLineaSelect.id == '00'? '':this.subLineaSelect.id),this.prod,pag.toString());
  }

  buscarProdgen(){
    
    this.getProductos((this.lineaSelect.id == '00'? '':this.lineaSelect.id),
    (this.subLineaSelect.id == '00'? '':this.subLineaSelect.id),this.prod,'1');
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

  getProductos(codLinea:string,codSubLinea:string,material:string,pagina:string){
    this._prodGenService.getProductos(codLinea,codSubLinea,material,pagina).subscribe(
      (data: any) =>{
        if(data['resultado'] != 1){
					console.log(data);
				}else{
          this.prodgen = data['datos']['lista'];
          this.cantlistprod = data['datos']['total_filas']
          this.paginas = Math.ceil(this.cantlistprod / 20);
          this.lstpaginas = [];
          for(var i = 1;i<=this.paginas;i++){
            this.lstpaginas.push(i);
          }
        }
      },
      (error)=>{
        console.log("## ERROR: "); console.log(<any>error);
      }
    );
  }

  activar(prod:ProductoGenerico){
    let est = prod.estado == 'ACTIVO'? 'INACTIVO':'ACTIVO';
    let esta = prod.estado == 'ACTIVO'? 'inactivar':'activar';
    if(window.confirm('¿Desea '+esta+' el registro?')){
      this._prodGenService.activar(prod.id_producto_generico,est).subscribe(
        (data: any) =>{
          if(data['resultado'] != 1){
            console.log(data);
          }else{
            this.paginacion(this.idx);
          }
        },
        (error)=>{
          console.log("## ERROR: "); console.log(<any>error);
        }
      );
    }
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
    this.getSubLinea(this.lineaSelect.id);
    console.log(this.lineaSelect);
  }

}
