import { Component, OnInit } from '@angular/core';
import { CuentaService } from 'src/app/servicios/cuenta.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public CuentaService: CuentaService,
  ) { }

  user: any;

  ngOnInit(): void {
    this.user = localStorage.getItem('datosUser');
    this.user = JSON.parse(this.user);

  }

}
