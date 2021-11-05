import { Component, OnInit } from '@angular/core';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import { RegistrosService } from 'src/app/servicios/registros.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OperacionesService } from 'src/app/servicios/operaciones.service';
import { SweetService } from 'src/app/servicios/sweet.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { Xliff2 } from '@angular/compiler';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { borderTopRightRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent implements OnInit {
  form = new FormGroup({
    cliente: new FormControl('', [
      Validators.required,
    ]),
    operacion: new FormControl('', []),
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
    operario: new FormControl('', [
      Validators.required,
    ]),
    observaciones: new FormControl('', []),
    status: new FormControl(true)
  })

  fileName = 'TablaInforme.xlsx';
  operacion: any;
  constructor(
    public CuentaService: CuentaService,
    public RegistrosService: RegistrosService,
    public OperacionesService: OperacionesService,
    public SweetService: SweetService,
  ) { }

  registros: any = [];
  id:any;
  userSelected: any;
  operacionSelected: any;
  fech_ini: any;
  fech_fin: any;
  filtro = false;

  ngOnInit(): void {
    this.CuentaService.Verifylogin();
    this.listar();
    this.cargaroperaciones();
  }

  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('excel-table');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_informe.pdf`);
    });
  }



  cargadatos(registro){
    console.log(registro);
    this.id = registro._id;
    this.userSelected = registro.data.cliente.name;
    this.operacionSelected = registro.data.operacion;
    this.form.setValue({
      cliente: registro.data.cliente,
      operacion: '',
      vehiculo: registro.data.vehiculo,
      galones: registro.data.galones,
      l_inicial: registro.data.l_inicial,
      l_final:  registro.data.l_final,
      valor: registro.data.valor,
      conductor: registro.data.conductor,
      operario: registro.data.operario,
      observaciones: registro.data.observaciones,
      status: true
    });
  }
  submit() {
    if (this.form.valid) {
      if(this.form.value.operacion != ''){
        this.form.value.operacion = JSON.parse(this.form.value.operacion);
      }else{
        this.form.value.operacion = this.operacionSelected;
      }
      this.RegistrosService.editarForm(this.form.value, this.id).subscribe((response: any) => {
        console.log(this.form.value)
        this.SweetService.sweet({
          message: "cambios guardados exitosamente",
          type: "success"
        });
      }, error => {
        console.log(error);
        this.SweetService.sweet({
          message: "Ups, ha ocurrido un error. Intente nuevamente",
          type: "error"
        });
      }, () => {
        window.location.reload();
      });
    }
  }
  filtrar(){
    console.log("registros",this.registros)
    let busca = this.registros.filter(n => n.data.fecha > this.fech_ini && n.data.fecha < this.fech_fin);
    console.log(busca);
    this.registros = [];
    this.registros = busca;
    this.filtro = true;
  }

  exportexcel() {
    let table = document.getElementById('tabledownload');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }
  cargaroperaciones() {
    this.OperacionesService.listar().subscribe((response: any) => {
      this.operacion = response;
    })
  }

  createPdf(registro, index){
    registro.data.id = index;
    //formato a la fecha con momentjs
    let now = moment(registro.data.fecha);
    now.locale('es')
    registro.data.fecha = now.format('LLL');

    //formato a el precio
    const formatter = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    })
    registro.data.valor = formatter.format(registro.data.valor);

    const pdfDefinition: any = {
      content: [
        {
          table: {
            heights: [50, 20, 40, 30, 30, 40, 30],
            widths: ['*', '*', '*'],
            body: [
              [
                {
                  text:[
                    {
                      text: 'OSL Combustibles \n Recibo #CB-00'+ registro.data.id,
                      bold: true,
                      fontSize: 22,
                    }
                  ],
                  style: 'tableHeader',
                  colSpan: 2,
                  alignment: 'center',
                  bold: true,
                },{},
                {
                  text: 'Fecha: ',
                  table: {
                    widths: [152],
                    body: [
                      ['Fecha:'],
                      [' '+registro.data.fecha],
                    ]
                  },
                  style: 'tableHeader',
                  alignment: 'center'
                },
              ],
              [
                {
                  text: 'OPERADOR DE SERVICIOS LOGISTICOS S.A.S    OSL COMBUSTIBLE',
                  style: 'tableHeader',
                  colSpan: 3,
                  alignment: 'center'
                }, {},
              ],
              [
                {
                  text:[
                    {
                      text: 'Placa: \n',
                      bold: true
                    },
                    {
                      text: ''+ registro.data.vehiculo,
                    }
                  ],
                  colSpan: 1,
                  alignment: 'center'
                },
                {
                  text:[
                    {
                      text: 'Cliente: \n',
                      bold: true
                    },
                    {
                      text: ''+ registro.data.cliente.name,
                    }
                  ],
                  style: 'tableHeader',
                  colSpan: 2,
                  alignment: 'center'
                }, {}
              ],
              [
                {
                  text:[
                    {
                      text: 'No. de galones: \n',
                      bold: true
                    },
                    {
                      text: ''+ registro.data.galones,
                    }
                  ],
                  colSpan: 2,

                },{},
                {
                  text:[
                    {
                      text: 'Lectura Inicial: \n',
                      bold: true
                    },
                    {
                      text: ''+ registro.data.l_inicial,
                    }
                  ],
                },
              ],
              [
                {
                  text:[
                    {
                      text: 'Valor en $: \n',
                      bold: true
                    },
                    {
                      text: ''+ registro.data.valor,
                    }
                  ],
                  colSpan: 2,
                },{},
                {
                  text:[
                    {
                      text: 'Lectura Final: \n',
                      bold: true
                    },
                    {
                      text: ''+ registro.data.l_final,
                    }
                  ],
                },
              ],
              [
                {
                  text:[
                    {
                      text: 'Observaciones:: \n',
                      bold: true
                    },
                    {
                      text: ''+  registro.data.observaciones,
                    }
                  ],
                  colSpan: 3,
                },{}, {},
              ],
              [
                {
                  text:[
                    {
                      text: 'Conductor: \n',
                      bold: true
                    },
                    {
                      text: ''+ registro.data.conductor,
                    }
                  ],
                  colSpan: 1,
                  width: 200,
                },{
                  text:[
                    {
                      text: 'Operario: \n',
                      bold: true
                    },
                    {
                      text: ''+ registro.data.operario,
                    }
                  ],
                  colSpan: 1,
                }, {},
              ],

            ]
          }

        }
      ]
    }
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }
  quitar(){
    this.fech_ini = '';
    this.fech_fin = '';
    this.filtro = false;
    this.listar();
  }

  listar(){
    this.RegistrosService.listar().subscribe((response: any) => {
      this.registros = response;
      this.registros.forEach(element => {
        const formatter = new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0
        })
        element.data.valor = formatter.format(element.data.valor);


        element.data.fecha  = element.data.fecha.toString();
        let fecha =  element.data.fecha.split('T', 2);
        element.data.fecha = fecha[0];
      });

    })

  }

}
