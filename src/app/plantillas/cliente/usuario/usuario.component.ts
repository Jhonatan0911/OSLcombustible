import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  clientes: any;
  clientedata: any = [];
  placa:any = "";
  id: any = "";
  identificacion: any = "";
  name: any = ""; 
  placas:any =[];
  vacioplaca= false;

  constructor(
    public ClientesService:ClientesService,
    public CuentaService: CuentaService,
  ) { }

  ngOnInit(): void {
    this.CuentaService.Verifylogin();
    this.cargar();

  }

  cargar(){
    this.ClientesService.listar().subscribe((response: any) => {
      this.clientes = response;
      console.log(response);
    })
  }
  cargadatos(cliente:any){
    this.vacioplaca = false;
    this.clientedata = cliente;
    this.id = this.clientedata._id;
    this.identificacion = this.clientedata.identification;
    this.name = this.clientedata.name;
    this.placas = this.clientedata.places;
    if (this.placas.length == 0) {
      this.vacioplaca = true;
    };
  }
  agregarplaca(placa:any){
    this.ClientesService.agregarplaca(this.id, placa).subscribe((response: any) => {
      console.log(response);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Nueva placa agregada satisfactoriamente',
        showConfirmButton: false,
        timer: 1500
      })
    }, error => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Ups, ha ocurrido un error. Intente nuevamente',
        showConfirmButton: false,
        timer: 1500
      })
      console.log(error)
    }, () => {
      this.placa = " ";
    });
  }
  editaruser(){
    this.ClientesService.editar(this.name, this.identificacion, this.id).subscribe((response: any) => {
      console.log("response",response);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cambios realizados satisfactoriamente',
        showConfirmButton: false,
        timer: 1500
      })
    }, error => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Ups, ha ocurrido un error. Intente nuevamente',
        showConfirmButton: false,
        timer: 1500
      })
      console.log(error)
    }, () => {
      this.placa = " ";
    });
  }

}
