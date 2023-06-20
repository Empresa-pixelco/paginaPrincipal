import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './auth/register/register.component';
import { AsignarHorariosComponent } from './asignar-horarios/asignar-horarios.component';
import { VeterinarioServiceComponent } from './veterinario-service/veterinario-service.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { DatosPacienteComponent } from './datos-paciente/datos-paciente.component';
import { CitasVeterinariosComponent } from './citas-veterinarios/citas-veterinarios.component';
import { LoginvetComponent } from './auth-vet/loginvet/loginvet.component';
import { RegistervetComponent } from './auth-vet/registervet/registervet.component';
import jwt_decode from 'jwt-decode';
import { TurnoVetComponent } from './turno-vet/turno-vet.component';
import { TurnosDiasVetComponent } from './turnos-dias-vet/turnos-dias-vet.component';
import { PanelAdminComponent } from './panel-admin/panel-admin.component';
import { EliminarTurnoComponent } from './eliminar-turno/eliminar-turno.component';
import { EliminarTurnoCalendaryComponent } from './eliminar-turno-calendary/eliminar-turno-calendary.component';
@NgModule({
  declarations: [
    AppComponent,
    PaginaPrincipalComponent,
    LoginComponent,
    RegisterComponent,
    AsignarHorariosComponent,
    VeterinarioServiceComponent,
    CalendarioComponent,
    DatosPacienteComponent,
    CitasVeterinariosComponent,
    LoginvetComponent,
    RegistervetComponent,
    TurnoVetComponent,
    TurnosDiasVetComponent,
    PanelAdminComponent,
    EliminarTurnoComponent,
    EliminarTurnoCalendaryComponent,

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
