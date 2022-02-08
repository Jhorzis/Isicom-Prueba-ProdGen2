import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';

import { map, catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()

export class ObraServices{
    public url: string;

	constructor(
		public _http: HttpClient
	){
		this.url = GLOBAL.url;
	}

    
}