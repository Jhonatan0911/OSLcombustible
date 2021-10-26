import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { LoginComponent } from './plantillas/cuenta/login/login.component';
import { RegisterComponent } from './plantillas/cuenta/register/register.component';
import { HomeComponent } from './plantillas/home/home/home.component';


const routes: Routes = [
  //Home
  { path: '', component: LoginComponent},

  //register  
  { path: 'register', component: RegisterComponent},

  //inicio
  { path: 'home', component: HomeComponent}

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
