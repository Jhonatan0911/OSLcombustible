import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  public id: any = '';
  API: string;

  constructor(
    private api: ApiService,
    private http: HttpClient,
  ) { 
    this.API = this.api.cargaAPI();
    this.id = localStorage.getItem('idcuenta');
  }

  Verifylogin() {
    if (!this.id) {
      window.location.href = '/';
    }
  }

  validarLogueo() {
    let token = localStorage.getItem('idcuenta');
    if(token){
      return true;
    }else{
      return false;
    }
  }


  login(email: any, password: any){
    let parametros = {
      email: email,
      password: password,
    }
    return this.http.post<transaccion>(this.API+'usuarios/login',parametros);
  }

  cuenta( name:any, email: any, password: any) {
    let parametros = {
      name: name,
      email: email,
      password: password,
      status: true,
    }
    return this.http.post<transaccion>(this.API+'usuarios', parametros);
  }
  

  crear(nombre: any, identificacion: any){
    let parametros = {
      email: nombre,
      identification: identificacion,
      status: true,
    }
    return this.http.post<transaccion>(this.API+'clientes',parametros);
  }
}
export class transaccion {
  transaccion: any;
}

