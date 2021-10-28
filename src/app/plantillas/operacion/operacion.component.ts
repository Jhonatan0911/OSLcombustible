import { Component, OnInit } from '@angular/core';
import { OperacionesService } from 'src/app/servicios/operaciones.service';
import { CuentaService } from 'src/app/servicios/cuenta.service';


@Component({
  selector: 'app-operacion',
  templateUrl: './operacion.component.html',
  styleUrls: ['./operacion.component.css']
})
export class OperacionComponent implements OnInit {

  constructor(
    public OperacionesService: OperacionesService,
    public CuentaService: CuentaService,
  ) { }
  
  nombre: string ="";
  detalle:  string ="";

  ngOnInit(): void {
    this.CuentaService.Verifylogin();
  }
  crear(){
    this.OperacionesService.crear(this.nombre, this.detalle).subscribe((response: any) => {
      console.log(response);
    })
  }

}
