import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SweetService } from 'src/app/servicios/sweet.service';
import { Router } from '@angular/router';
import { CuentaService } from '../cuenta.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private SweetService: SweetService,
    private CuentaService: CuentaService,
  ) { }

  canActivate(){
    if(!this.CuentaService.validarLogueo()){
      this.SweetService.sweet({
        message: "No estas logueado",
        type: "error"
      });
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}
