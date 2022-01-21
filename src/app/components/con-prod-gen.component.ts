import { Component, OnInit } from '@angular/core';
import { Linea } from '../models/linea';
import { SubLinea } from '../models/subLinea';

@Component({
  selector: 'con-prod-gen',
  templateUrl: '../views/con-prod-gen.html'
})
export class ConProdGenComponent implements OnInit {
  public titulo: string;
  public Linea: Linea[];
  public lineaSelect : Linea;
  public subLinea: SubLinea[];
  public subLineaSelect: SubLinea;
  constructor() {
    this.titulo = 'Producto Genérico';
    this.Linea = [];
    this.lineaSelect = new Linea("00","Selecione una Linea");
    this.subLinea = [];
    this.subLineaSelect = new SubLinea("00","0","Selecione una SubLinea");
   }

  ngOnInit(): void {
    this.Linea.push(new Linea("00","Selecione una Linea"));
    this.Linea.push(new Linea("1","Concreto"));
    this.Linea.push(new Linea("2","Cemento"));

    this.subLinea.push(new SubLinea("00","0","Selecione una SubLinea"));
    
    
    console.log("Comienzo producto");
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
    if(this.lineaSelect.id == "1"){
      
      this.subLinea.push(new SubLinea("1","1","Concreto1"));
      this.subLinea.push(new SubLinea("2","1","Concreto2"));
    }else{
      this.subLinea.push(new SubLinea("1","2","Cemento1"));
      this.subLinea.push(new SubLinea("2","2","Cemento2"));
    }
    console.log(this.lineaSelect);
  }

}
