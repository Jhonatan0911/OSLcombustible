import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { CuentaService } from 'src/app/servicios/cuenta.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  clientes: any;

  constructor(
    public ClientesService:ClientesService,
    public CuentaService: CuentaService,
  ) { }

  ngOnInit(): void {
    this.CuentaService.Verifylogin();
    this.cargar();

  }

  cargar(){
    this.ClientesService.listar().subscribe((response: any) => {
      this.clientes = response;
      console.log(response);
    })
  }

}
