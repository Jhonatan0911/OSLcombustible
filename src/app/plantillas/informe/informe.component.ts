import { Component, OnInit } from '@angular/core';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import { RegistrosService } from 'src/app/servicios/registros.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent implements OnInit {

  constructor(
    public CuentaService: CuentaService,
    public RegistrosService: RegistrosService,
  ) { }

  registros: any = [];
  vehiculoSelected: any; 
  clienteSelected: any; 
  galoneSelected: any; 
  l_inicialSelected: any; 
  l_FinalSelected: any;
  valorSelected: any;
  conductorSelected: any; 
  operarioSelected: any; 
  observaciones: any;
  fecha: any; 

  ngOnInit(): void {
    this.CuentaService.Verifylogin();
    this.listar();
  }
  cargadatos(registro){
    this.vehiculoSelected = registro.data.vehiculo;
    this.clienteSelected  = registro.data.cliente.name;
    this.galoneSelected  = registro.data.galones;
    this.l_inicialSelected = registro.data.l_inicial
    this.l_FinalSelected = registro.data.l_final;
    this.valorSelected = registro.data.valor;
    this.conductorSelected = registro.data.conductor;
    this.operarioSelected = registro.data.operario;
    this.observaciones = registro.data.observaciones;
    this.fecha = registro.data.fecha;

    //formato a la fecha con momentjs
    let now = moment(this.fecha);
    this.fecha = now.format('LLL');

    //formato a el precio
    const formatter = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    })
    this.valorSelected = formatter.format(this.valorSelected);

    //crear pdf
    this.createPdf();
  }

  createPdf(){
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
                      text: 'OSL Combustibles \n', 
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
                      [' '+this.fecha],
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
                      text: ''+ this.vehiculoSelected,
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
                      text: ''+ this.clienteSelected,
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
                      text: ''+ this.galoneSelected,
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
                      text: ''+ this.l_inicialSelected,
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
                      text: ''+ this.valorSelected,
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
                      text: ''+ this.l_FinalSelected,
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
                      text: ''+ this.observaciones,
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
                      text: ''+ this.conductorSelected,
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
                      text: ''+ this.operarioSelected,
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

  listar(){
    this.RegistrosService.listar().subscribe((response: any) => {
      this.registros = response;
      console.log(this.registros);
    })
   
  }

}
