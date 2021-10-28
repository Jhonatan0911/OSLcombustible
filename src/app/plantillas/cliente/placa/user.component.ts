import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { CuentaService } from 'src/app/servicios/cuenta.service';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    public ClientesService: ClientesService,
    public CuentaService: CuentaService,
  ) { }

  nombre: string = "";
  identificacion: string = "";


  ngOnInit(): void {
    this.CuentaService.Verifylogin();
  }

  crear(){
    this.ClientesService.crear(this.nombre, this.identificacion).subscribe((response: any) => {
      console.log("console",response);
    })
  }

}
