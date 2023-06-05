import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import * as CryptoJS from 'crypto-js';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './auth/register/register.component';
import { HorariosVeterinariosComponent } from './horarios-veterinarios/horarios-veterinarios.component';
import { AsignarHorariosComponent } from './asignar-horarios/asignar-horarios.component';
import { VeterinarioServiceComponent } from './veterinario-service/veterinario-service.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { DatosPacienteComponent } from './datos-paciente/datos-paciente.component';
import { CitasVeterinariosComponent } from './citas-veterinarios/citas-veterinarios.component';


@NgModule({
  declarations: [
    AppComponent,
    PaginaPrincipalComponent,
    LoginComponent,
    RegisterComponent,
    HorariosVeterinariosComponent,
    AsignarHorariosComponent,
    VeterinarioServiceComponent,
    CalendarioComponent,
    DatosPacienteComponent,
    CitasVeterinariosComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    IonicModule.forRoot(),
  ],
  providers: [
    { provide: AuthService, useClass: AuthService },
    {
      provide: CryptoJS,
      useValue: CryptoJS
    }],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
