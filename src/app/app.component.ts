import { Component } from '@angular/core';
import { CuentaService } from 'src/app/servicios/cuenta.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public CuentaService: CuentaService,
  ) { }
  title = 'OSLcombustible';
}
