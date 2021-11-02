import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  API: string;

  constructor(
    private api: ApiService,
    private http: HttpClient,
  ) { 
    this.API = this.api.cargaAPI();
  }


  public cliente: any = [];
  public nombre: any = "null";
  public identificacion: any = "null";


  listar(){
    return this.http.get<transaccion>(this.API+'clientes');
  }

  crear(nombre: any, identificacion: any){
    let parametros = {
      name: nombre,
      identification: identificacion,
      status: true,
    }
    return this.http.post<transaccion>(this.API+'clientes',parametros);
  }

  crearForm(payload: any) {
    return this.http.post<transaccion>(this.API + 'clientes', payload);
  }

  editar(id:any, payload:any){
    return this.http.put<transaccion>(this.API+'clientes/'+id,payload);
  }

  agregarplaca(id: any, placa:any){
    return this.http.post<transaccion>(this.API+'clientes/'+id+'/placa',placa);
  }

  carga() {
    if (localStorage.getItem('cliente')) {
      this.cliente = localStorage.getItem('cliente');
    } else {
      this.cliente = [];
    }
    return this.cliente;
  }

  agregar(nombre: any, identificacion: any) {

    this.carga();
    this.cliente.push({
      nombre: nombre,
      identificacion: identificacion,
    });
    localStorage.setItem('cliente', JSON.stringify(this.cliente));
  }

  quitar(nombre: any, identificacion: any) {

    this.carga();

    localStorage.removeItem('cliente');
  
  }
}
export class transaccion {
  transaccion: any;
}
