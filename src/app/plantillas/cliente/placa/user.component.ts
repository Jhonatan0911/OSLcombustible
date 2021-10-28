import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    public ClientesService: ClientesService,
  ) { }

  nombre: string = "";
  identificacion: string = "";


  ngOnInit(): void {
  }

  crear(){
    this.ClientesService.crear(this.nombre, this.identificacion).subscribe((response: any) => {
      console.log("console",response);
    })
  }

}
