import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperacionesService {
  API: string;
  constructor(
    private api: ApiService,
    private http: HttpClient,
  ) {
    this.API = this.api.cargaAPI();
  }

  public operacion: any = [];
  public nombre: any = "";
  public detalle: any = "";

  listar() {
    return this.http.get<transaccion>(this.API + 'operaciones');
  }

  editar(name: any, detail: any, id: any) {
    let parametros = {
      name: name,
      details: detail,
      status: true,
    }
    return this.http.put<transaccion>(this.API + 'operaciones/' + id, parametros);
  }

  crear(nombre: any, detalle: any) {
    let parametros = {
      name: nombre,
      details: detalle,
      status: true,
    }
    return this.http.post<transaccion>(this.API + 'operaciones', parametros);
  }

  crearForm(payload: any) {
    return this.http.post<transaccion>(this.API + 'operaciones', payload);
  }

  carga() {
    if (localStorage.getItem('operacion')) {
      this.operacion = localStorage.getItem('operacion');
    } else {
      this.operacion = [];
    }
    return this.operacion;
  }

  agregar(nombre: any, detalle: any) {

    this.carga();
    this.operacion.push({
      nombre: nombre,
      detalle: detalle,
    });
    localStorage.setItem('operacion', JSON.stringify(this.operacion));
  }

  quitar(nombre: any, detalle: any) {

    this.carga();

    localStorage.removeItem('operacion');

  }
}
export class transaccion {
  transaccion: any;
}
