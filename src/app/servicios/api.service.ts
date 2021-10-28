import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
  ) { }



  cargaAPI() {
    return 'https://osl-portrack.herokuapp.com/';
  }


}

export class transaccion {
  transaccion: any;
}