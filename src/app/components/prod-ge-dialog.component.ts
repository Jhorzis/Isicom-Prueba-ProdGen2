import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { ProdGenServices } from '../services/prod-gen.service';

export interface DialogData{
    titulo: string;
    listaDatos: string[];
    info: string[];
}

@Component({
    selector: 'prod-gen-dialog',
    templateUrl: '../views/prod-gen-dialog.html',
    providers: [ProdGenServices]
  })
  
  export class dlg_producto {
    listaDatos: string[] = [];
    mensaje_error: string = '';
      constructor(
        public dialogRef: MatDialogRef<dlg_producto>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private _prodGenService: ProdGenServices
      ){
        this.listaDatos = data.listaDatos;
      }

      onNoClick(dat:any){
          this.dialogRef.close({dat});
      }

      right(str:string,chr:number){
        return str.slice(str.length-chr,str.length);
      }

      left(str:string,chr:number){
          return str.slice(0,chr-str.length);
      }

      buscarUM(codm:string){
        this._prodGenService.buscarMedidas(codm.split('¬')[1]).subscribe(
          (data: any) => {
            if(data['resultado'] != 1){
              console.log(data);
              this.mensaje_error = data['mensaje'];
            }else{
              var dat = data['datos']+'¬'+codm;
              this.onNoClick(dat);
            }
          },
          (error) => {
            console.log("## ERROR: "); console.log(<any>error);
          }
        );
      }

      
      
  }