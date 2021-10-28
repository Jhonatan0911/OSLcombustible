import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CuentaService } from 'src/app/servicios/cuenta.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public CuentaService: CuentaService,

  ) { }
  email: string = "";
  password: string = "";
  datos: any = [];

  ngOnInit(): void {
  }
  login() {
    this.CuentaService.login(this.email, this.password).subscribe((response) => {
      let datos: any = [];
      datos = response;
      console.log("response",datos)
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
        localStorage.setItem("idcuenta", datos._id);
        localStorage.setItem("datos", datos.name);
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
      window.location.href = '/home';
    });

  }
}
