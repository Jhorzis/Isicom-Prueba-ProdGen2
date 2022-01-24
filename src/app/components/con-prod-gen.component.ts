import { Component, OnInit } from '@angular/core';
import { Linea } from '../models/linea';
import { SubLinea } from '../models/subLinea';
import { ProdGenServices } from '../services/prod-gen.service';

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
  public lista: any[];
  constructor(
		private _prodGenService: ProdGenServices
    ) {
    this.titulo = 'Producto Genérico';
    this.Linea = [];
    this.lineaSelect = new Linea("00","Selecione una Linea");
    this.subLinea = [];
    this.lista = [];
    this.subLineaSelect = new SubLinea("00","0","Selecione una SubLinea");
   }

  ngOnInit(): void {
    this.Linea.push(new Linea("00","Selecione una Linea"));
    /*
    this.Linea.push(new Linea("2","Cemento"));*/

    this.subLinea.push(new SubLinea("00","0","Selecione una SubLinea"));
    
    this.getLinea();
    console.log("Comienzo producto");
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
