import { Component, OnInit } from '@angular/core';
import { RegistrosService } from 'src/app/servicios/registros.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(
    public RegistrosService: RegistrosService,
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
  }

}
