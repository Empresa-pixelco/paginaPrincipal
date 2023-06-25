import { Component } from '@angular/core';
import * as moment from 'moment';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Calendario, Dia, Horario } from '../interfaces/calendario.model';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {
  idTurno: string | undefined;
  tsveterinarios: Calendario | any;
  mesActual: string | any;
  horas: any;
  fechaSeleccionada: any | undefined;
  diaTurno: Dia | any;
  diaSelecter: any;
  mesVet: string | any;
  horaSeleccionada: string | any;
  servicio: any | any;
  ecografia: any | any;
  diaSelecterClass: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private dataStorageService: StorageService
  ) {}

  async ngOnInit() {
    this.servicio = this.dataStorageService.getHorarioServicioSeleccionado();

    this.ecografia = this.dataStorageService.getnombreServicioSeleccionado();
    console.log(this.servicio)
    this.route.queryParams.subscribe(async (params) => {
      const codigoCategoria = params['codigoCategoria'];
      console.log('Código de vetrinario recibido:', codigoCategoria);

      const data: Calendario = await this.authService.calendary(codigoCategoria);
      this.tsveterinarios = data;
      this.idTurno = data.id;
      this.dataStorageService.setTurnoSeleccionado(this.idTurno);
      if (this.servicio){
        const diasConHorarios = this.tsveterinarios.dias.filter((dia: Dia) => {
          return dia.horarios.some((horario: Horario) => horario.hora === this.servicio.duracion && horario.enable)
        });
        const dias = diasConHorarios.map((horario: any) => horario.dia)
        window.alert('Días con horarios disponibles: ' + dias);
      
      }else if (this.ecografia == 'Ecografia'){
        const diaTurno = this.tsveterinarios.dias.filter(
          (dia: Dia) => dia.dia
        )[0];
        window.alert('Días con horarios disponibles: ' + diaTurno);
      }else{
        window.alert('Días con horarios disponibles: ');
      }
      
    });
  }

  datosPacientes() {
    // Obtener la fecha de ionic calendar
    const fecha = new Date(this.fechaSeleccionada);

    // Dejar la fecha en español
    moment.locale('es');

    // Obtener el mes de ionic calendar en español
    const mesEnEspanol = moment(fecha).format('MMMM').toUpperCase();

    this.diaSelecter = fecha.getDate();
    this.mesActual = moment(this.mesActual).format('MMMM').toUpperCase();
    // Filtrar el objeto diaTurno según el día seleccionado y el mes actual
    this.diaTurno = this.tsveterinarios.dias.filter(
      (dia: Dia) => dia.dia == this.diaSelecter && mesEnEspanol == this.tsveterinarios.mes
    )[0];
    console.log(this.diaTurno)
    // Determinar si el día tiene turnos o no
    const tieneTurnos = this.tieneTurnos(this.diaTurno);

    // Asignar la clase dinámica al contenedor del día en el calendario
    this.diaSelecterClass = tieneTurnos ? '' : 'day-without-turns';

    if (this.servicio) {

      // Filtrar los horarios según el servicio seleccionado y obtener las horas correspondientes
      console.log(this.diaTurno)
      this.horas = this.diaTurno.horarios
        .filter(
          (horario: Horario) => horario.enable && horario.hora == this.servicio.duracion
        )
        .map((horario: Horario) => horario.hora);

      console.log(this.horas)
      const fechaActual = new Date();
      
      const horaActual = fechaActual.getHours();
      console.log(horaActual);
      
      const minutosActual = fechaActual.getMinutes();
      console.log(minutosActual);
      
      const diaActual = fechaActual.getDate();
      console.log(diaActual);
      
      const horasInferiores = this.horas.filter((hora: string) => {
        const horasEnTurno = hora.split('a');
        const [horas, minutos] = horasEnTurno[0].split(':');
        console.log(horas);
        console.log(minutos);
        const minutosTotalesTurno = parseInt(horas) * 60 + parseInt(minutos);
        const minutosTotalesActual = horaActual * 60 + minutosActual;
        console.log()
        console.log(minutosTotalesTurno, minutosTotalesActual)
        return minutosTotalesActual > minutosTotalesTurno;
      });
      
      console.log(horasInferiores);

      if (horasInferiores.length > 0 && diaActual >= this.diaSelecter) {
        window.alert('Solo hay horas anteriores a la hora actual. Por favor, selecciona una fecha y hora válidas.');
        this.horas = ''
        return;
      }
    
      
    } else if (this.ecografia == 'Ecografia') {
      // Filtrar los horarios según la ecografía seleccionada y obtener las horas correspondientes
      this.horas = this.diaTurno.horarios
        .filter((horario: Horario) => horario.enable && horario.hora !== '14:00 a 16:00')
        .map((horario: Horario) => horario.hora);

      // Ordenar las horas de forma ascendente
      this.horas.sort((a: any, b: any) => {
        const horaA = new Date(`2000-01-01T${a}`);
        const horaB = new Date(`2000-01-01T${b}`);
        return horaA.getTime() - horaB.getTime();
      });
    } else {
      // Filtrar los horarios y obtener las horas correspondientes
      this.horas = this.diaTurno.horarios
        .filter((horario: Horario) => horario.enable && horario.hora !== '14:00 a 16:00')
        .map((horario: Horario) => horario.hora);
    }
  }

  tieneTurnos(dia: Dia): boolean {
    return dia && dia.horarios && dia.horarios.length > 0;
  }

  seleccionarHora(hora: string): void {
    if (this.horaSeleccionada === hora) {
      this.horaSeleccionada = '';
    } else {
      this.horaSeleccionada = hora;
    }

    const horaSeleccionadaMoment = moment(`2000-01-01T${hora}`);
    const siguienteHoraMoment = horaSeleccionadaMoment.add(30, 'minutes');
    const siguienteHora = siguienteHoraMoment.format('HH:mm');

    if (this.ecografia == 'Ecografia') {
      // Filtrar las horas y eliminar la siguiente hora de la lista
      this.horas = this.horas.filter((hora: string) => hora !== siguienteHora);
    }

    this.dataStorageService.setHoraSeleccionado(this.horaSeleccionada);
  }

  back() {
    this.router.navigate(['reserva']);
  }

  siguiente() {
    this.dataStorageService.setDiaSeleccionado(this.diaSelecter);
    this.router.navigate(['datos-paciente'], {
      queryParams: { diaTurno: this.diaSelecter },
    });
  }
}
