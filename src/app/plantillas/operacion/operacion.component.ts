import { Component, OnInit } from '@angular/core';
import { OperacionesService } from 'src/app/servicios/operaciones.service';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-operacion',
  templateUrl: './operacion.component.html',
  styleUrls: ['./operacion.component.css']
})
export class OperacionComponent implements OnInit {

  constructor(
    public OperacionesService: OperacionesService,
    public CuentaService: CuentaService,
  ) { }
  
  nombre: string ="";
  detalle:  string ="";

  ngOnInit(): void {
    this.CuentaService.Verifylogin();
  }
  crear(){
    this.OperacionesService.crear(this.nombre, this.detalle).subscribe((response: any) => {
      console.log(response);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Operacion creada satisfactoriamente',
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
      this.detalle = " ";
    });
  }

}
