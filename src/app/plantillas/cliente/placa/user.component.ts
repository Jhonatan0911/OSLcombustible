import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SweetService } from 'src/app/servicios/sweet.service';





@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    public ClientesService: ClientesService,
    public CuentaService: CuentaService,
    public SweetService: SweetService,
  ) { }

  nombre: string = "";
  identificacion: string = "";

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    identification: new FormControl('', [
      Validators.required,
    ]),
    status: new FormControl(true)
  })
  submit() {
    if (this.form.valid) {
      this.ClientesService.crearForm(this.form.value).subscribe((response: any) => {

        this.SweetService.sweet({
          message: "Nuevo cliente creado exitosamente",
          type: "success"
        });
      }, error => {
        this.SweetService.sweet({
          message: "Ups, ha ocurrido un error. Intente nuevamente",
          type: "error"
        });
      }, () => {
        this.form.reset();
      });
    }
  }

  ngOnInit(): void {
    this.CuentaService.Verifylogin();
  }

  // crear(){
  //   this.ClientesService.crear(this.nombre, this.identificacion).subscribe((response: any) => {
  //     console.log("console",response);
  //     Swal.fire({
  //       position: 'top-end',
  //       icon: 'success',
  //       title: 'Nuevo cliente creado satisfactoriamente',
  //       showConfirmButton: false,
  //       timer: 1500
  //     })
  //   }, error => {
  //     Swal.fire({
  //       position: 'top-end',
  //       icon: 'error',
  //       title: 'Ups, ha ocurrido un error. Intente nuevamente',
  //       showConfirmButton: false,
  //       timer: 1500
  //     })
  //     console.log(error)
  //   }, () => {
  //     this.nombre = " ";
  //     this.identificacion = " ";
  //   });
  // }

}
