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
  pais: any = [];
  datos: any = [];

  ngOnInit(): void {
  }
  login() {
    this.CuentaService.login(this.email, this.password).subscribe((response) => {
      let datos: any = [];
      datos = response;
      console.log("holap",datos)
      if (datos.status == 404) {
        this.password = " ";
        this.email = " ";
        Swal.fire({
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          showConfirmButton: false,
          title: 'El correo electrónico o la contraseña son incorrectos. Por favor verifique e inténtelo nuevamente',
          showCancelButton:false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
      }

      if (datos.status == true) {
        localStorage.setItem("idcuenta", datos._id);
        localStorage.setItem("datos", datos.name);
        Swal.fire({
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          showConfirmButton: false,
          title: 'Bienvenido a OSLcombustibles',
          showCancelButton:false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
        
      
        
      }

    }, error => {
      console.log(error)
    }, () => {
      this.CuentaService.cuenta().subscribe((response) => {
        this.datos = response.transaccion.data;
        console.log("datos",this.datos)
      });
      window.location.href = '/home';
      
    });

  }
}
