import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import { SweetService } from 'src/app/servicios/sweet.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    public SweetService: SweetService,
  ) { }

  ngOnInit(): void {
    this.CuentaService.Verifylogin();
    this.cargar();

  }
  formEditar = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    identification: new FormControl('', [
      Validators.required,
    ]),
    status: new FormControl(true)
  })

  formPlaca = new FormGroup({
    placa: new FormControl('', [
      Validators.required,
    ]),
    status: new FormControl(true)
  })

  submitPlaca() {
    if (this.formPlaca.valid) {
      this.ClientesService.agregarplaca(this.id, this.formPlaca.value).subscribe((response: any) => {

        this.SweetService.sweet({
          message: "Nueva placa agregada exitosamente",
          type: "success"
        });
      }, error => {
        this.SweetService.sweet({
          message: "Ups, ha ocurrido un error. Intente nuevamente",
          type: "error"
        });
      }, () => {
        this.formPlaca.reset();
        this.cargar();
      });
    }
  }
  submitEditar() {
    if (this.formEditar.valid) {
      this.ClientesService.editar(this.id, this.formEditar.value).subscribe((response: any) => {

        this.SweetService.sweet({
          message: "Cambios realizados satisfactoriamente",
          type: "success"
        });
      }, error => {
        this.SweetService.sweet({
          message: "Ups, ha ocurrido un error. Intente nuevamente",
          type: "error"
        });
      }, () => {
        this.cargar();
      });
    }
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
    this.formEditar.setValue({
      name: this.name,
      identification: this.identificacion,
      status: true
    });
  }

  // editaruser(){
  //   this.ClientesService.editar(this.name, this.identificacion, this.id).subscribe((response: any) => {
  //     console.log("response",response);
  //     this.SweetService.sweet({
  //       message: "Cambios realizados satisfactoriamente",
  //       type: "success"
  //     });
  //   }, error => {
  //     this.SweetService.sweet({
  //       message: "Ups, ha ocurrido un error. Intente nuevamente",
  //       type: "error"
  //     });
  //     console.log(error)
  //   }, () => {
  //     this.placa = " ";
  //     this.cargar();
  //   });
  // }

}
