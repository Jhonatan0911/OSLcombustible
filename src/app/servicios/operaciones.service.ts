import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OperacionesService {

  constructor() { }
  public operacion: any = [];
  public nombre: any = "null";
  public detalle: any = "null";

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
