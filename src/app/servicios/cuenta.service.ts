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
    this.id = localStorage.getItem('datosUser');
  }

  Verifylogin() {
    if (!this.id) {
      window.location.href = '/';
    }
  }

  validarLogueo() {
    let token = localStorage.getItem('datosUser');
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

  cuentaForm(payload: any) {
    return this.http.post<transaccion>(this.API + 'usuarios', payload);
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
  listarUser() {
    return this.http.get<transaccion>(this.API+'usuarios');
  }
  editar(payload:any,id:any){
    return this.http.put<transaccion>(this.API+'usuarios/'+id,payload);
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

