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
    if(this.CuentaService.validarLogueo() == true){
      window.location.href = '/home';
    } 
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
          position: 'center',
          icon: 'error',
          title: 'Ups, ha ocurrido un error. Intente nuevamente',
          showConfirmButton: false,
          timer: 1500
        })
      }

      if (datos.status == true) {
        let information: any = {
          id: datos._id,
          name: datos.name,
        }
        localStorage.setItem("datosUser", JSON.stringify(information));
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Bienvenido a OSLcombustibles',
          showConfirmButton: false,
          timer: 1500
        })
      }

    }, error => {
      console.log(error)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ups, ha ocurrido un error. Intente nuevamente',
        showConfirmButton: false,
        timer: 2000
      })
    }, () => {
      window.location.href = '/home';
    });

  }
}
