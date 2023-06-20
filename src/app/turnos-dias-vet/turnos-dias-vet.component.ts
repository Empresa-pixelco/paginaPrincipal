import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Calendario, Dia } from '../interfaces/calendario.model';

@Component({
  selector: 'app-turnos-dias-vet',
  templateUrl: './turnos-dias-vet.component.html',
  styleUrls: ['./turnos-dias-vet.component.scss']
})
export class TurnosDiasVetComponent {
  horarios: any = ['08:00', '09:00','10:00','11:00','12:00','15:00','16:00','17:00','18:00']
  horarioVet: any[] = [];
  mesActual: string | any;

  fechaSeleccionada: any | undefined;
  diaTurno: Dia | any;
  diaSelecter: any
  mesVet:string| any;
  horaSeleccionada: string| any;

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) { }

  async ngOnInit() {

  }

  datosPacientes() {
    const fecha = new Date(this.fechaSeleccionada);
    console.log(fecha)
    this.diaSelecter = fecha.getDate();
    console.log(this.diaSelecter)
  }

  seleccionarHora(hora: string): void{
    if (this.horaSeleccionada === hora) {
      this.horaSeleccionada = '';
      const index = this.horarioVet.indexOf(hora);
      if (index > -1) {
        this.horarioVet.splice(index, 1);
      }
    } else {
      this.horaSeleccionada = hora;
      const existe = this.horarioVet.includes(hora);
      if (!existe) {
        this.horarioVet.push(hora);
      }
    }
    console.log(this.horaSeleccionada);
    console.log(this.horarioVet);
  }

  seleccionarSubservicio(subservicio: string): any {
    console.log('ReservasComponent - seleccionarSubservicio()', subservicio);
  }
  back(){
    this.router.navigate(['turnos']);
  }
  siguiente(){
  }

}
