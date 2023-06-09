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
  horarios: any = ['10:00','10:30','11:00','11:30', '12:00', '12:30',
                   '14:00', '14:30','15:00','15:30','16:00','16:30','17:00','17:30', '18:00']
  horariosEspeciales : any = ['14:00 a 16:00']
  
  horarioVet: any[] = [];
  mesActual: string | any;

  fechaSeleccionada: any | undefined;
  diaTurno: Dia | any;
  diaSelecter: any
  mesVet:string| any;
  horaSeleccionada: string| any;
  idVet: any | any
  idTurno: any;
  month: any
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.route.queryParams.subscribe( async params => {
      this.idVet = params['idVet'], this.month = params['mes'];
      console.log('Código vet:', this.idVet, this.month);
    })

    const respuesta = await this.authService.obtenerTurnos(this.idVet, this.month)
    this.idTurno = respuesta.data.id
    console.log(this.idTurno)
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
  async guardar(){
    const data = {
      "dias": [
          {
              "dia": this.diaSelecter,
              "horas": this.horarioVet
          }
      ]
    }
    console.log(this.idTurno)
    try{
      const respuesta = this.authService.TurnoPorDia(data, this.idTurno)
      window.alert('turnos asignados');
      console.log(respuesta)
    }catch(eerr){
      console.log(eerr)
      window.alert('ya hay turnos asignados');
    }
  }

}
