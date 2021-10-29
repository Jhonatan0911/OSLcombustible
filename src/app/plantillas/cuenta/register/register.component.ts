import { Component, OnInit } from '@angular/core';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import { SweetService } from 'src/app/servicios/sweet.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    public CuentaService: CuentaService,
    public SweetService: SweetService,

  ) { }
  name: string = "";
  email: string = "";
  password: string = "";
  datos: any = [];
  usuarios: any = [];
  datosUser: any = [];
  nameselected: any = "";
  emailselected: any = "";
  id: any= "";


  ngOnInit(): void {
    this.CuentaService.Verifylogin();
    this.cargarUSer();
  }
  crear(){
    this.CuentaService.cuenta(this.name, this.email, this.password).subscribe((response) => {
      let datos: any = [];
      datos = response;
      console.log("holap",datos)
      if (datos.status == 404) {
        this.password = " ";
        this.email = " ";
        this.SweetService.sweet({
          message: "Ups, ha ocurrido un error. Intente nuevamente",
          type: "error"
        });
      }

      if (datos.status == true) {
        this.SweetService.sweet({
          message: "Cuenta creada exitosamente",
          type: "success"
        });
      }

    }, error => {
      this.SweetService.sweet({
        message: "Ups, ha ocurrido un error. Intente nuevamente",
        type: "error"
      });
      console.log(error)
    }, () => {
      this.name = "";
      this.password = "";
      this.email = "";
    });
  }
  cargarUSer(){
    this.CuentaService.listarUser().subscribe((response: any) => {
      this.usuarios = response;
      console.log(response);
    })
  }
  cargadatos(user:any){
    this.datosUser = user;
    this.nameselected = this.datosUser.name;
    this.emailselected = this.datosUser.email;
    this.id = this.datosUser._id;
  }
  editar(nameselected:any, emailselected:any){
    this.CuentaService.editar(nameselected,  emailselected, this.id).subscribe((response: any) => {
      this.SweetService.sweet({
        message: "Datos actualizados exitosamente",
        type: "success"
      });
    }, error => {
      this.SweetService.sweet({
        message: "Ups, ha ocurrido un error. Intente nuevamente",
        type: "error"
      });
      console.log(error)
    }, () => {
    });
  }

}
