import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';

//import 'rxjs/add/operator/map';
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
}