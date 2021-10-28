import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    public ClientesService: ClientesService,
    public CuentaService: CuentaService,
  ) { }

  nombre: string = "";
  identificacion: string = "";


  ngOnInit(): void {
    this.CuentaService.Verifylogin();
  }

  crear(){
    this.ClientesService.crear(this.nombre, this.identificacion).subscribe((response: any) => {
      console.log("console",response);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Nuevo cliente satisfactoriamente',
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
      this.nombre = " ";
      this.identificacion = " ";
    });
  }

}
