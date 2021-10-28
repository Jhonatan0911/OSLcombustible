import { Component, OnInit } from '@angular/core';
import { CuentaService } from 'src/app/servicios/cuenta.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public CuentaService: CuentaService,
  ) { }

  user: any;

  ngOnInit(): void {
    this.user = localStorage.getItem('datosUser');
    this.user = JSON.parse(this.user);
  }
  logout(){
    localStorage.removeItem('idcuenta');
    localStorage.removeItem('datos');
  }

}
