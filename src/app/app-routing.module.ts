import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { LoginComponent } from './plantillas/cuenta/login/login.component';
import { RegisterComponent } from './plantillas/cuenta/register/register.component';
import { HomeComponent } from './plantillas/home/home.component';
//vistas
import { InformeComponent } from './plantillas/informe/informe.component';
import { OperacionComponent } from './plantillas/operacion/operacion.component';
import { RegistroComponent } from './plantillas/registro/registro.component';
import { UsuarioComponent } from './plantillas/cliente/usuario/usuario.component';
import { UserComponent } from './plantillas/cliente/placa/user.component';


const routes: Routes = [
  //Home
  { path: '', component: LoginComponent},

  //register  
  { path: 'signup', component: RegisterComponent},

  //inicio
  { path: 'home', component: HomeComponent},

  //vista en la que se decarga el pdf
  { path: 'informe', component: InformeComponent},

  //vista en la que se crea una nueva operacion
  { path: 'operacion', component: OperacionComponent},

  //vista en la que se crea un registro nuevo
  { path: 'registro', component: RegistroComponent},

  //vista en la que se osbservan los usuarios
  { path: 'usuarios', component: UsuarioComponent},

  //vista en la que se crean los usuarios
  { path: 'user', component: UsuarioComponent},


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    })  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
