import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './plantillas/cuenta/login/login.component';
import { RegisterComponent } from './plantillas/cuenta/register/register.component';
import { HomeComponent } from './plantillas/home/home.component';
import { HeaderComponent } from './componentes/header/header/header.component';
import { FooterComponent } from './componentes/footer/footer/footer.component';
import { InformeComponent } from './plantillas/informe/informe.component';
import { OperacionComponent } from './plantillas/operacion/operacion.component';
import { RegistroComponent } from './plantillas/registro/registro.component';
import { UsuarioComponent } from './plantillas/cliente/usuario/usuario.component';
import { UserComponent } from './plantillas/cliente/placa/user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    InformeComponent,
    OperacionComponent,
    RegistroComponent,
    UsuarioComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
