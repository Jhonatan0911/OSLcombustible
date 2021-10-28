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
    this.CuentaService.Verifylogin();
    this.user = localStorage.getItem("datos");
  }

}
