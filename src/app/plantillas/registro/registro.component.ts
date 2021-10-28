import { Component, OnInit } from '@angular/core';
import { RegistrosService } from 'src/app/servicios/registros.service';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { OperacionesService } from 'src/app/servicios/operaciones.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(
    public ClientesService:ClientesService,
    public RegistrosService: RegistrosService,
    public OperacionesService: OperacionesService,

  ) { }
  cliente: any;
  vehiculo: any;
  operacion: any;
  galones: any;
  l_inicial: any;
  l_final: any;
  valor: any;
  conductor: any;
  operario: any;
  Observaciones: any;

  ngOnInit(): void {
    this.cargaroperaciones();
    this.cargaclientes();
  }
  cargaroperaciones(){
    this.OperacionesService.listar().subscribe((response: any) => {
      this.operacion = response;
      console.log(response);
    })
  }
  cargaclientes(){
    this.ClientesService.listar().subscribe((response: any) => {
      this.cliente = response;
      console.log(response);
    })
  }

}
