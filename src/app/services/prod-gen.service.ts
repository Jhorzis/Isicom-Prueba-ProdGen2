import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';

import { map, catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Linea } from '../models/linea';
import { GLOBAL } from './global';

@Injectable()
export class ProdGenServices{
	public url: string;

	constructor(
		public _http: HttpClient
	){
		this.url = GLOBAL.url;
	}

    getLineas(): Observable<any>{
        return this._http.get(this.url+'listarLinea',{responseType: 'json'});
	}

    getSubLineas(codlinea:string): Observable<any>{
        return this._http.get(this.url+'listarSubLinea?cod_linea='+codlinea,{responseType: 'json'});
	}

	getProductos(codLinea:string,codSubLinea:string,material:string,pagina:string): Observable<any>{
		
		let body = {
			cod_linea: codLinea,
			cod_sublinea: codSubLinea,
			material: material,
			cantidad_filas: '20',
			pagina: pagina
		};
		console.log("## DATOS: ");
		console.log(body);
		return this._http.post(this.url+'buscar',body,{responseType: 'json'});
	}

	activar(id:number,estado:string): Observable<any>{
		let body = {
			estado: estado
		};
		return this._http.patch(this.url+'actualizarEstado/'+id.toString(),body,{responseType: 'json'});
	}

	buscarProducto(codSociedad:string,codLinea:string,codSublinea:string,matDesc:string,codMate:string): Observable<any>{
        let param = 'material_sociedad='+codSociedad+'&cod_linea='+codLinea+'&cod_sublinea='+codSublinea;
		param+='&material_des='+matDesc+'&codigo_material='+codMate;
		console.log(param)
		return this._http.get(this.url+'buscarMaterial?'+param,{responseType: 'json'});
	}

	buscarMedidas(codMate:string){
		let param = 'codigo_material='+codMate;
		return this._http.get(this.url+'buscarUnidadMedida?'+param,{responseType: 'json'});
	}

	guardarProducto(codSoc:string,codLinea:string,linea:string,codSubLinea:string,
		subLinea:string,codMaterial:string,mat:string,UM:string){
		let body = {
			codigo_sociedad: codSoc,
			cod_linea: codLinea,
			linea: linea,
			cod_sublinea: codSubLinea,
			sublinea: subLinea,
			codigo_material: codMaterial,
			material: mat,
			creado_por: null,
			unimed: UM,
			estado: 'ACTIVO'
		};
		console.log("## DATOS GUARDAR: "); console.log(body);
		return this._http.post(this.url+'crear',body,{responseType: 'json'});
	}

	actualizarProducto(idprodge:number,codSoc:string,codLinea:string,linea:string,codSubLinea:string,
		subLinea:string,codMaterial:string,mat:string,UM:string){
		let body = {
			id_producto_generico: idprodge,
			codigo_sociedad: codSoc,
			cod_linea: codLinea,
			linea: linea,
			cod_sublinea: codSubLinea,
			sublinea: subLinea,
			codigo_material: codMaterial,
			material: mat,
			unimed: UM,
			estado: 'ACTIVO'
		};
		console.log("## DATOS ACTUALIZAR: "); console.log(body);
		return this._http.post(this.url+'actualizar',body,{responseType: 'json'});
	}
}