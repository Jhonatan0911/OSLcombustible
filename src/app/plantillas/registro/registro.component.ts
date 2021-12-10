import { Component, OnInit } from '@angular/core';
import { RegistrosService } from 'src/app/servicios/registros.service';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { OperacionesService } from 'src/app/servicios/operaciones.service';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import { SweetService } from 'src/app/servicios/sweet.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(
    public ClientesService: ClientesService,
    public RegistrosService: RegistrosService,
    public OperacionesService: OperacionesService,
    public CuentaService: CuentaService,
    public SweetService: SweetService,
  ) { }

  cliente: any = [];
  vehiculo: any = "";
  operacion: any = "";
  galones: any = "";
  l_inicial: any = "";
  l_final: any = "";
  valor: any = "";
  conductor: any = "";
  user: any;
  operario: any = "";
  Observaciones: any = "";
  clienteObject: any;
  operacionObject: any = "";
  vehiculoObject: any = "";
  placesObject: any = "";
  fecha: any;
  hora: any;


  places: any = [];
  viewplace = false;

  form = new FormGroup({
    cliente: new FormControl('', [
      Validators.required,
    ]),
    operacion: new FormControl(''),
    vehiculo: new FormControl(''),
    galones: new FormControl('', [
      Validators.required,
    ]),
    l_inicial: new FormControl('', [
      Validators.required,
    ]),
    l_final: new FormControl('', [
      Validators.required,
    ]),
    valor: new FormControl('', []),
    conductor: new FormControl('', [
      Validators.required,
    ]),
    operario: new FormControl(this.operario, [
      Validators.required,
    ]),
    observaciones: new FormControl('', []),
    status: new FormControl(true)
  })

  ngOnInit(): void {
    this.CuentaService.Verifylogin();
    this.cargaroperaciones();
    this.cargaclientes();
    this.user = localStorage.getItem('datosUser');
    this.user = JSON.parse(this.user);
    this.operario = this.user.name;
    this.form.setValue({
      cliente: '',
      operacion: '',
      vehiculo: '',
      galones: '',
      l_inicial: '',
      l_final: '',
      valor: '',
      conductor: '',
      operario: this.operario,
      observaciones: '',
      status: true
    });
  }

  submit() {
    if (this.form.valid) {
      this.form.value.cliente = JSON.parse(this.form.value.cliente);
      this.form.value.operacion = this.form.value.operacion ? JSON.parse(this.form.value.operacion) : null;


      this.RegistrosService.crearForm(this.form.value).subscribe((response: any) => {
        console.log(this.form.value)
        Swal.fire({
          title: "Nuevo registro creado exitosamente",
          icon: 'success',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Imprimir",
          confirmButtonColor: '#B3404A',
          cancelButtonColor: '#3085d6',
          denyButtonColor: '#282C34',
          denyButtonText: "Ver tickets",
          cancelButtonText: "Crear otro",
        }).then((result) => {
          if (result.isConfirmed) {
            let now = moment(this.fecha);
            now.locale('es')
            this.fecha = now.format('LL');
            this.hora = now.format('LT');
            this.cliente = this.form.value.cliente.name;
            this.createPdf();
          } else if (result.isDenied) {
            window.location.href = '/informe';
          }
        })
      }, error => {
        console.log(error);
        this.SweetService.sweet({
          message: "Ups, ha ocurrido un error. Intente nuevamente",
          type: "error"
        });
      }, () => {
      });
    }
  }


  onChange() {
    this.viewplace = false;
    this.places = JSON.parse(this.form.value.cliente).places;
    console.log(this.places)
    if (this.places.length != 0) {
      this.viewplace = true;
    } else {
      this.SweetService.sweet({
        message: "Este usuario no tiene vehiculos registrados",
        type: "error"
      });
      this.clienteObject = "";


    }
  }
  cargaroperaciones() {
    this.OperacionesService.listar().subscribe((response: any) => {
      this.operacion = response;
    })
  }
  cargaclientes() {
    this.ClientesService.listar().subscribe((response: any) => {
      response.forEach((element: any) => {
        if (element.status == true && element.places.length != 0) {
          this.cliente.push(element);
        }
      });
    })
  }


  createPdf() {
    const pdfDefinition: any = {
      pageSize: 'C8',
      pageMargins: [5, 0, 5, 0],
      content: [
        {
          text: [
            {
              text: 'Sistema OSL \nCombustibles',
              bold: true,
              style: 'header',
              alignment: 'center'
            }
          ],
        },
        {
          text: [
            {
              text: 'Fecha: ',
              fontSize: 10,
              bold: true,
            },
            {
              text: ' ' + this.fecha,
              fontSize: 10,
            }
          ],
        },
        {
          text: [
            {
              text: 'Hora:',
              fontSize: 10,
              bold: true,
            },
            {
              text: ' ' + this.hora,
              fontSize: 10,
            }
          ],
        },
        {
          text: [
            {
              text: 'Cliente: ',
              fontSize: 10,
              bold: true,
            },
            {
              text: ' ' + this.cliente,
              fontSize: 10,
            }
          ],
        },
        {
          text: [
            {
              text: 'Placa: ',
              fontSize: 10,
              bold: true,
            },
            {
              text: ' ' + this.form.value.vehiculo,
              fontSize: 10,
            },
            {
              text: '\n --------------------------------------------',
              fontSize: 10,
              bold: true,
            }
          ],
        },
        {
          text: [
            {
              text: '#Galones: ',
              fontSize: 10,
              bold: true,
            },
            {
              text: ' ' + this.form.value.galones,
              fontSize: 10,
            }
          ],
        },
        {
          text: [
            {
              text: 'L. Inicial: ',
              fontSize: 10,
              bold: true,
            },
            {
              text: ' ' + this.form.value.l_inicial,
              fontSize: 10,
            }
          ],
        },
        {
          text: [
            {
              text: 'L. Final: ',
              fontSize: 10,
              bold: true,
            },
            {
              text: ' ' + this.form.value.l_final,
              fontSize: 10,
            }
          ],
        },
        {
          text: [
            {
              text: 'Valor: ',
              fontSize: 10,
              bold: true,
            },
            {
              text: ' ' + this.form.value.valor,
              fontSize: 10,
            },
            {
              text: '\n --------------------------------------------',
              fontSize: 10,
              bold: true,
            }
          ],
        },
        {
          text: [
            {
              text: 'Observaciones:\n',
              fontSize: 10,
              bold: true,
            },
            {
              text: ' ' + this.form.value.observaciones,
              fontSize: 10,
            },
            {
              text: '\n --------------------------------------------',
              fontSize: 10,
              bold: true,
            }
          ],
        },
        {
          text: [
            {
              text: 'Conductor: ',
              fontSize: 10,
              bold: true,
            },
            {
              text: ' ' + this.form.value.conductor,
              fontSize: 10,
            }
          ],
        },
        {
          text: [
            {
              text: 'Operario: ',
              fontSize: 10,
              bold: true,
            },
            {
              text: '' + this.form.value.operario,
              fontSize: 10,
            }
          ],
        }
      ]
    }
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
    this.form.reset();
  }

}
