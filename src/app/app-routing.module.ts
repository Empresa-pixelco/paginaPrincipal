import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { ReservasComponent } from './reservas/reservas.component';
import { DatosPacienteComponent } from './datos-paciente/datos-paciente.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';
import { HorariosVeterinariosComponent } from './horarios-veterinarios/horarios-veterinarios.component';
import { AsignarHorariosComponent } from './asignar-horarios/asignar-horarios.component';
import { VeterinarioServiceComponent } from './veterinario-service/veterinario-service.component';
import { CalendarioComponent } from './calendario/calendario.component';
import {AuthGuard} from './guards/auth.guard'
import { CitasVeterinariosComponent } from './citas-veterinarios/citas-veterinarios.component';
import { LoginvetComponent } from './auth-vet/loginvet/loginvet.component';
import { RegistervetComponent } from './auth-vet/registervet/registervet.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: PaginaPrincipalComponent },
  { path: 'reserva', component: ReservasComponent },
  { path: 'datos-paciente', component: DatosPacienteComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'confirmacion', component: ConfirmacionComponent, canActivate: [AuthGuard] },
  { path: 'horarios-veterinarios', component: HorariosVeterinariosComponent},
  { path: 'asignar-horarios', component: AsignarHorariosComponent},
  { path: 'veterinario-service', component: VeterinarioServiceComponent},
  { path: 'calendario', component: CalendarioComponent},
  { path: 'citas', component: CitasVeterinariosComponent},
  { path: 'loginvet', component: LoginvetComponent},
  { path: 'register-vet', component: RegistervetComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }