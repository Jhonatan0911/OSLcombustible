import { Component, OnInit } from '@angular/core';
import { OperacionesService } from 'src/app/servicios/operaciones.service';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import { SweetService } from 'src/app/servicios/sweet.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-operacion',
  templateUrl: './operacion.component.html',
  styleUrls: ['./operacion.component.css']
})
export class OperacionComponent implements OnInit {

  constructor(
    public OperacionesService: OperacionesService,
    public CuentaService: CuentaService,
    public SweetService: SweetService,
  ) { }

  // Refactor
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    details: new FormControl(''),
    status: new FormControl(true)
  })

  submit() {
    if (this.form.valid) {
      this.OperacionesService.crearForm(this.form.value).subscribe((response: any) => {

        this.operacion.push(response);

        this.SweetService.sweet({
          message: "Operacion creada exitosamente",
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

  nombre: string = "";
  detalle: string = "";
  operacion: any;
  operacionselected: any = [];
  id: any = "";
  detailselected: any = "";
  nameselected: any = "";

  ngOnInit(): void {
    this.CuentaService.Verifylogin();
    this.cargaroperaciones();
  }

  crear() {
    this.OperacionesService.crear(this.nombre, this.detalle).subscribe((response: any) => {
      console.log(response);
      this.SweetService.sweet({
        message: "Operacion creada exitosamente",
        type: "success"
      });
    }, error => {
      this.SweetService.sweet({
        message: "Ups, ha ocurrido un error. Intente nuevamente",
        type: "error"
      });
      console.log(error)
    }, () => {
      this.nombre = " ";
      this.detalle = " ";
    });
  }

  cargaroperaciones() {
    this.OperacionesService.listar().subscribe((response: any) => {
      this.operacion = response;
    })
  }

  cargadatos(operacion: any) {
    this.operacionselected = operacion;
    this.id = this.operacionselected._id;
    this.detailselected = this.operacionselected.details;
    this.nameselected = this.operacionselected.name;
  }
  editar(name: any, detail: any) {
    this.OperacionesService.editar(name, detail, this.id).subscribe((response: any) => {


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
