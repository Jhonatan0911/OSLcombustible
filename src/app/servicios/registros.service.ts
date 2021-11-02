import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

  public id: any = '';
  API: string;

  constructor(
    private api: ApiService,
    private http: HttpClient,
  ) { 
    this.API = this.api.cargaAPI();
    this.id = localStorage.getItem('datosUser');
  }
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


  listar(){
    return this.http.get<transaccion>(this.API+'registros');
  }

  crear(cliente: any, vehiculo: any, operacion:any, galones:any, l_inicial:any, l_final:any, valor:any, conductor:any, operario:any, observaciones: any) {
    let parametros = {
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
    }
    let body = {
      data: parametros,
      status: true
    }
    return this.http.post<transaccion>(this.API+'registros',body);
  }

  crearForm(payload: any) {
    let body = {
      data: payload,
      status: true
    }
    return this.http.post<transaccion>(this.API +'registros', body);
  }
}
export class transaccion {
  transaccion: any;
}
