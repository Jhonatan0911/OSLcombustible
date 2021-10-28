import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  clientes: any;

  constructor(
    public ClientesService:ClientesService,
  ) { }

  ngOnInit(): void {
    this.cargar();

  }

  cargar(){
    this.ClientesService.listar().subscribe((response: any) => {
      this.clientes = response;
      console.log(response);
    })
  }

}
