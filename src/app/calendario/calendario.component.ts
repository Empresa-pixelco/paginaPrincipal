import { Component } from '@angular/core';
import * as moment from 'moment';
import { OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Veterinarios } from '../interfaces/veterinarios.model';
import { Calendario, Dia, Horario } from '../interfaces/calendario.model';
import 'moment/locale/es';
import { StorageService } from '../services/storage.service';
import { isThisISOWeek } from 'date-fns';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent {
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

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private dataStorageService: StorageService
  ) {}

  async ngOnInit() {
    this.servicio = this.dataStorageService.getHorarioServicioSeleccionado();
    this.ecografia = this.dataStorageService.getnombreServicioSeleccionado();
    console.log(this.servicio);
    console.log(this.ecografia);

    this.route.queryParams.subscribe(async (params) => {
      const codigoCategoria = params['codigoCategoria'];
      console.log('Código de vetrinario recibido:', codigoCategoria);

      const data: Calendario = await this.authService.calendary(codigoCategoria);
      this.tsveterinarios = data;
      this.idTurno = data.id;
      this.dataStorageService.setTurnoSeleccionado(this.idTurno);
      console.log(data);
    });
  }

  datosPacientes() {
    // Meses que tiene turno veterinario
    this.mesVet = this.tsveterinarios.mes;

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
      (dia: Dia) => dia.dia == this.diaSelecter && mesEnEspanol == this.mesVet
    )[0];
    console.log(this.diaTurno);

    if (this.servicio) {
      // Filtrar los horarios según el servicio seleccionado y obtener las horas correspondientes
      this.horas = this.diaTurno.horarios
        .filter(
          (horario: Horario) => horario.enable && horario.hora == this.servicio.duracion
        )
        .map((horario: Horario) => horario.hora);
      console.log(this.horas);
    }

    if (this.ecografia) {
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
      console.log(this.horas);
    } else {
      // Filtrar los horarios y obtener las horas correspondientes
      this.horas = this.diaTurno.horarios
        .filter((horario: Horario) => horario.enable && horario.hora !== '14:00 a 16:00')
        .map((horario: Horario) => horario.hora);
      console.log(this.horas);
    }

    if (this.diaTurno) {
      const horas = this.diaTurno.horarios.filter((horario: Horario) => horario.hora);
      console.log(horas);
    }
  }

  seleccionarHora(hora: string): void {
    if (this.horaSeleccionada === hora) {
      this.horaSeleccionada = '';
    } else {
      this.horaSeleccionada = hora;
    }
//La primera línea crea un objeto moment a partir de una cadena de fecha y hora en formato ISO 8601. La cadena de fecha y hora se forma concatenando la fecha 
//"2000-01-01T" con el valor de la variable hora. 
//Por ejemplo, si hora es "08:00", la cadena resultante será "2000-01-01T08:00". El objeto moment resultante representa la hora seleccionada.
    const horaSeleccionadaMoment = moment(`2000-01-01T${hora}`);
//La segunda línea utiliza el método add() de Moment.js para agregar 30 minutos al objeto moment anterior. 
//Esto crea un nuevo objeto moment que representa la hora siguiente a la hora seleccionada. El segundo argumento del método add() especifica la 
//cantidad de tiempo que se debe agregar y la unidad de tiempo en la que se expresa, en este caso, "30" y "minutes" respectivamente.
    const siguienteHoraMoment = horaSeleccionadaMoment.add(30, 'minutes');
    const siguienteHora = siguienteHoraMoment.format('HH:mm');
    console.log(siguienteHora);

    if (this.ecografia) {
      // Filtrar las horas y eliminar la siguiente hora de la lista
      this.horas = this.horas.filter((hora: string) => hora !== siguienteHora);
    }
    console.log(this.horas);

    this.dataStorageService.setHoraSeleccionado(this.horaSeleccionada);
  }

  servicioSeleccionado: number = -1;

  toggleSubservicios(servicio: number): void {
    console.log('ReservasComponent - toggleSubservicios()', servicio);

    if (this.servicioSeleccionado === servicio) {
      this.servicioSeleccionado = -1;
    } else {
      this.servicioSeleccionado = servicio;
    }

    console.log('ReservasComponent - servicioSeleccionado', this.servicioSeleccionado);
  }

  seleccionarSubservicio(subservicio: string): any {
    console.log('ReservasComponent - seleccionarSubservicio()', subservicio);
  }

  back() {
    this.router.navigate(['reserva']);
  }

  siguiente() {
    this.dataStorageService.setDiaSeleccionado(this.diaSelecter);
    this.router.navigate(['datos-paciente'], {
      queryParams: { diaTurno: this.diaSelecter }, // Pasa el parámetro como queryParams
    });
  }
}
