import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

  constructor() { }
  public registro: any = [];
  public cliente: any = "null";
  public vehiculo: any = "null";
  public operacion: any = "null";
  public galones: any = "null";
  public l_inicial: any = "null";
  public l_final: any = "null";
  public valor: any = "null";
  public conductor: any = "null";
  public operario: any = "null";
  public Observaciones: any = "null";


  carga() {
    if (localStorage.getItem('registro')) {
      this.registro = localStorage.getItem('registro');
    } else {
      this.registro = [];
    }
    return this.registro;
  }

  agregar(cliente: any, vehiculo: any, operacion:any, galones:any, l_inicial:any, l_final:any, valor:any, conductor:any, operario:any, observaciones: any) {

    this.carga();
    this.registro.push({
      cliente: cliente,
      vehiculo: vehiculo,
      operacion: operacion,
      galones: galones,
      l_inicial: l_inicial,
      l_final: l_final,
      valor: valor,
      conductor: conductor,
      operario: operario,
      observaciones: observaciones,
    });
    localStorage.setItem('registro', JSON.stringify(this.registro));
  }

  quitar(cliente: any, vehiculo: any, operacion:any, galones:any, l_inicial:any, l_final:any, valor:any, conductor:any, operario:any, observaciones: any) {

    this.carga();

    localStorage.removeItem('registro');
  
  }
}
