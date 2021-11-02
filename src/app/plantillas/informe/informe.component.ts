import { Component, OnInit } from '@angular/core';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import { RegistrosService } from 'src/app/servicios/registros.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

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
    this.createPdf();
  }

  createPdf(){
    const pdfDefinition: any = {
      content: [
        { 
          text: 'Crear nuevo pdf',
          table: {
            heights: [60, 20, 40, 30, 30, 40, 30],
            widths: ['*', '*', '*'],
            body: [
              [
                {
                  text: 'OSlcombustible',
                  image: 'assets/imagenes/pdf/pdflogo.jpeg', 
                  style: 'tableHeader', 
                  colSpan: 2,
                  alignment: 'center'
                },{}, 
                {
                  text: 'Fecha: ',
                  table: {
                    body: [
                      ['Hora','Día', 'Mes', 'Año'],
                      ['1', '2', '3','4'],
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
                  text: 'Placa: \n'+ this.vehiculoSelected,
                  colSpan: 1,
                  alignment: 'center'
                }, 
                { 
                  text: 'Cliente:\n'+ this.clienteSelected, 
                  style: 'tableHeader',
                  colSpan: 2,
                  alignment: 'center'
                }, {}
              ],
              [
                {
                  text: 'No de galones:\n'+ this.galoneSelected,
                  colSpan: 2,
                },{}, 
                {
                  text: 'Lectura Inicial:\n'+ this.l_inicialSelected,
                },
              ],
              [
                {
                  text: 'Valor en $:\n'+ this.valorSelected,
                  colSpan: 2,
                },{}, 
                {
                  text: 'Lectura Final:\n'+ this.l_FinalSelected,
                },
              ],
              [
                {
                  text: 'Observaciones:\n'+ this.observaciones,
                  colSpan: 3,
                },{}, {},
              ],
              [
                {
                  text: 'Conductor:\n'+ this.conductorSelected,
                  colSpan: 1,
                  width: 200,
                },{
                  text: 'Operario:\n'+ this.operarioSelected,
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
