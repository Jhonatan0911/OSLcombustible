import { Component, OnInit } from '@angular/core';
import { CuentaService } from 'src/app/servicios/cuenta.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    public CuentaService: CuentaService,
  ) { }

  ngOnInit(): void {
    this.CuentaService.Verifylogin();
  }

}
