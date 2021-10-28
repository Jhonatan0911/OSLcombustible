import { Component, OnInit } from '@angular/core';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    public CuentaService: CuentaService,
  ) { }
  name: string = "";
  email: string = "";
  password: string = "";
  datos: any = [];

  ngOnInit(): void {
    this.CuentaService.Verifylogin();
  }
  crear(){
    this.CuentaService.cuenta(this.name, this.email, this.password).subscribe((response) => {
      let datos: any = [];
      datos = response;
      console.log("holap",datos)
      if (datos.status == 404) {
        this.password = " ";
        this.email = " ";
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Ups, ha ocurrido un error. Intente nuevamente',
          showConfirmButton: false,
          timer: 1500
        })
      }

      if (datos.status == true) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cuenta creada satisfactoriamente',
          showConfirmButton: false,
          timer: 1500
        })
      }

    }, error => {
      console.log(error)
    }, () => {
      this.name = " ";
      this.password = " ";
      this.email = " ";
    });
  }

}
