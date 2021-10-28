import { Component, OnInit } from '@angular/core';
import { CuentaService } from 'src/app/servicios/cuenta.service';


@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent implements OnInit {

  constructor(
    public CuentaService: CuentaService,
  ) { }

  ngOnInit(): void {
    this.CuentaService.Verifylogin();
  }

}
