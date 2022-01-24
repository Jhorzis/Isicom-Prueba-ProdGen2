import { Component, Inject, OnInit } from '@angular/core';
import { Linea } from '../models/linea';
import { SubLinea } from '../models/subLinea';
import { Admin } from '../models/admin';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioModule} from '@angular/material/radio';


export interface DialogData{
    titulo: string;
}
@Component({
  selector: 'prod-gen',
  templateUrl: '../views/prod-gen.html'
})
export class ProdGenComponent implements OnInit {
    public titulo: string;
    public mensaje_error: string;
    public admin: Admin;
    public Linea: Linea[];
    public subLinea: SubLinea[];

    constructor(public dlg: MatDialog){
        this.titulo = "Producto Genérico";
        this.mensaje_error = "";
        this.admin = new Admin("","","","","","","",(new Linea("00","Selecione una Linea")),
        (new SubLinea("00","0","Selecione una SubLinea")),(null));
        this.Linea = [];
        this.subLinea = [];
    }

    ngOnInit(): void {
        this.Linea.push(new Linea("00","Selecione una Linea"));
        /*this.Linea.push(new Linea("1","Concreto"));
        this.Linea.push(new Linea("2","Cemento"));*/
        this.subLinea.push(new SubLinea("00","0","Selecione una SubLinea"));
        
    }

    buscarProducto(){
        console.log("Buscar producto: "+this.admin.campo2);
        const dialogRef = this.dlg.open(dlg_producto,{
            width: '700px',
            data: {titulo: this.titulo}
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
    this.admin.combo2 = new SubLinea("00","0","Selecione una SubLinea");
    this.subLinea.push(new SubLinea("00","0","Selecione una SubLinea"));
    if(this.admin.combo1.id == "1"){
        
        this.subLinea.push(new SubLinea("1","1","Concreto1"));
        this.subLinea.push(new SubLinea("2","1","Concreto2"));
    }else{
        this.subLinea.push(new SubLinea("1","2","Cemento1"));
        this.subLinea.push(new SubLinea("2","2","Cemento2"));
    }
    console.log(this.admin.combo1);
    }

    onSubmit(){}
}

@Component({
    selector: 'prod-gen-dialog',
    templateUrl: '../views/prod-gen-dialog.html',
  })
  export class dlg_producto {
      constructor(
        public dialogRef: MatDialogRef<dlg_producto>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData 
      ){}

      onNoClick(){
          this.dialogRef.close();
      }
  }
