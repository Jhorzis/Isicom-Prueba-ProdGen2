import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ProdGenServices } from '../services/prod-gen.service';

export interface DialogData{
    titulo: string;
    listaDatos: string[];
}

@Component({
    selector: 'prod-gen-dialog',
    templateUrl: '../views/prod-gen-dialog.html',
  })
  
  export class dlg_producto {
    listaDatos: string[] = [];
      constructor(
        public dialogRef: MatDialogRef<dlg_producto>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData 
      ){
        this.listaDatos = data.listaDatos;
      }

      onNoClick(){
          this.dialogRef.close();
      }

      right(str:string,chr:number){
        return str.slice(str.length-chr,str.length);
      }

      left(str:string,chr:number){
          return str.slice(0,chr-str.length);
      }
  }