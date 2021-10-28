import { Component, OnInit } from '@angular/core';
import { OperacionesService } from 'src/app/servicios/operaciones.service';

@Component({
  selector: 'app-operacion',
  templateUrl: './operacion.component.html',
  styleUrls: ['./operacion.component.css']
})
export class OperacionComponent implements OnInit {

  constructor(
    public OperacionesService: OperacionesService,
  ) { }
  
  nombre: string ="";
  detalle:  string ="";

  ngOnInit(): void {
  }
  crear(){
    this.OperacionesService.crear(this.nombre, this.detalle).subscribe((response: any) => {
      console.log(response);
    })
  }

}
