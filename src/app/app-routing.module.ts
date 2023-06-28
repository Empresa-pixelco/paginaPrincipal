import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { ReservasComponent } from './reservas/reservas.component';
import { DatosPacienteComponent } from './datos-paciente/datos-paciente.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';
import { AsignarHorariosComponent } from './asignar-horarios/asignar-horarios.component';
import { VeterinarioServiceComponent } from './veterinario-service/veterinario-service.component';
import { CalendarioComponent } from './calendario/calendario.component';

import {AuthGuard} from './guards/auth.guard'
import {AuthGuardVet} from './guards/authVet.guard'

import { CitasVeterinariosComponent } from './citas-veterinarios/citas-veterinarios.component';
import { LoginvetComponent } from './auth-vet/loginvet/loginvet.component';
import { RegistervetComponent } from './auth-vet/registervet/registervet.component';
import { TurnoVetComponent } from './turno-vet/turno-vet.component';
import { TurnosDiasVetComponent } from './turnos-dias-vet/turnos-dias-vet.component';
import { PanelAdminComponent } from './panel-admin/panel-admin.component';
import { EliminarTurnoComponent } from './eliminar-turno/eliminar-turno.component';
import { EliminarTurnoCalendaryComponent } from './eliminar-turno-calendary/eliminar-turno-calendary.component';
import { EliminarcitaComponent } from './eliminarcita/eliminarcita.component';
import { EliminarcitacalendaryComponent } from './eliminarcitacalendary/eliminarcitacalendary.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: PaginaPrincipalComponent },
  { path: 'reserva', component: ReservasComponent },
  { path: 'datos-paciente', component: DatosPacienteComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'confirmacion', component: ConfirmacionComponent, canActivate: [AuthGuard] },
  { path: 'asignar-horarios', component: AsignarHorariosComponent},
  { path: 'veterinario-service', component: VeterinarioServiceComponent},
  { path: 'calendario', component: CalendarioComponent},
  { path: 'citas', component: CitasVeterinariosComponent, canActivate: [AuthGuardVet]},
  { path: 'loginvet', component: LoginvetComponent},
  { path: 'register-vet', component: RegistervetComponent},
  { path: 'turnos', component: TurnoVetComponent, canActivate: [AuthGuardVet]},
  { path: 'turnos-dias-vet', component: TurnosDiasVetComponent, canActivate: [AuthGuardVet]},
  { path: 'panel', component: PanelAdminComponent, canActivate: [AuthGuardVet]},
  { path: 'eliminarturno', component: EliminarTurnoComponent, canActivate: [AuthGuardVet]},
  { path: 'eliminarturnocalendary', component: EliminarTurnoCalendaryComponent, canActivate: [AuthGuardVet]},
  { path: 'eliminarcita', component: EliminarcitaComponent, canActivate: [AuthGuardVet]},
  { path: 'eliminarcitacalendary', component: EliminarcitacalendaryComponent, canActivate: [AuthGuardVet]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }