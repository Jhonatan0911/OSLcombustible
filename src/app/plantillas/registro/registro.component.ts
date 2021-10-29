import { Component, OnInit } from '@angular/core';
import { RegistrosService } from 'src/app/servicios/registros.service';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { OperacionesService } from 'src/app/servicios/operaciones.service';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import { SweetService } from 'src/app/servicios/sweet.service';



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
    public CuentaService: CuentaService,
    public SweetService: SweetService,


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
    this.CuentaService.Verifylogin();
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
  crear(cliente:any, vehiculo:any, operacion:any, galones:any, l_inicial:any, l_final:any, valor:any, conductor:any, operario:any, Observaciones:any,){

    this.RegistrosService.crear(cliente, vehiculo, operacion, galones, l_inicial, l_final, valor, conductor, operario, Observaciones).subscribe((response: any) => {
      console.log(response);
      this.SweetService.sweet({
        message: "Registro creado exitosamente",
        type: "success"
      });
    }, error => {
      this.SweetService.sweet({
        message: "Ups, ha ocurrido un error. Intente nuevamente",
        type: "error"
      });
      console.log(error)
    }, () => {
      this.cliente= "";
      this.vehiculo= "";
      this.operacion= "";
      this.galones= "";
      this.l_inicial= "";
      this.l_final= "";
      this.valor= "";
      this.conductor= "";
      this.operario= "";
      this.Observaciones= "";
    });
    
  }

}
