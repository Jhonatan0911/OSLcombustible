import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './plantillas/cuenta/login/login.component';
import { RegisterComponent } from './plantillas/cuenta/register/register.component';
import { HomeComponent } from './plantillas/home/home/home.component';
import { HeaderComponent } from './componentes/header/header/header.component';
import { FooterComponent } from './componentes/footer/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
