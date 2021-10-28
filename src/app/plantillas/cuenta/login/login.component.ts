import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import { SweetService } from 'src/app/servicios/sweet.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public CuentaService: CuentaService,
    public SweetService: SweetService
  ) { }
  email: string = "";
  password: string = "";
  datos: any = [];

  ngOnInit(): void {
    if (this.CuentaService.validarLogueo() == true) {
      window.location.href = '/home';
    }
  }

  login() {
    this.CuentaService.login(this.email, this.password).subscribe((response: any) => {

      localStorage.setItem("datosUser", JSON.stringify(response));

    }, error => {

      this.SweetService.sweet({
        message: "Ups, ha ocurrido un error. Intente nuevamente",
        type: "error"
      });

    }, () => {

      this.SweetService.sweet({
        message: "Bienvenido",
        type: "success"
      });

      setTimeout(() => {
        window.location.href = '/home';
      }, 1000);

    });

  }
}
