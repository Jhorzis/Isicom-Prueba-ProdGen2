import { Component, OnInit } from '@angular/core';
import { Linea } from '../models/linea';
import { SubLinea } from '../models/subLinea';
import { ProdGenServices } from '../services/prod-gen.service';
import { ProductoGenerico } from '../models/productoGenerico';
import { LogService } from '../shared/log.service';

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
  public lista: any[];

  constructor(
		private _prodGenService: ProdGenServices,
    private logger: LogService
    ) {
    this.titulo = 'Producto Genérico';
    this.Linea = [];
    this.lineaSelect = new Linea("00","Selecione una Linea");
    this.subLinea = [];
    this.lista = [];
    this.subLineaSelect = new SubLinea("00","0","Selecione una SubLinea");
    this.prod = '';
    this.prodgen = [];
   }

  ngOnInit(): void {
    this.Linea.push(new Linea("00","Selecione una Linea"));
    this.subLinea.push(new SubLinea("00","0","Selecione una SubLinea"));
    
    this.getLinea();
    this.getProductos('','','','1');
    this.logger.log("Comienzo producto");
  }

  buscarProdgen(){
    console.log(this.lineaSelect.id+' - '+this.subLineaSelect.id+' - '+this.prod)

    this.getProductos((this.lineaSelect.id == '00'? '':this.lineaSelect.id),
    (this.subLineaSelect.id == '00'? '':this.subLineaSelect.id),this.prod,'1');
  }

  clickImg(prod: ProductoGenerico){
    alert(prod.material)
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
          console.log(this.prodgen)
        }
      },
      (error)=>{
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
    this.getSubLinea(this.lineaSelect.id);
    console.log(this.lineaSelect);
  }

}
