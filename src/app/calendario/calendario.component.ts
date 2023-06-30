// Importaciones
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
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
  // Propiedades
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
  ConHorarios: any

  // Constructor
  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private dataStorageService: StorageService
  ) {}

  // Método de inicialización
  async ngOnInit() {
    const fechaActual = new Date();
    const diaActual = fechaActual.getDate();

    // Obtener el servicio y la ecografía seleccionados del almacenamiento
    this.servicio = this.dataStorageService.getHorarioServicioSeleccionado();
    this.ecografia = this.dataStorageService.getnombreServicioSeleccionado();

    console.log(this.servicio)

    // Suscribirse a los parámetros de la ruta
    this.route.queryParams.subscribe(async (params) => {
      const codigoCategoria = params['codigoCategoria'];
      console.log('Código de veterinario recibido:', codigoCategoria);

      // Obtener el calendario del servidor
      const data: Calendario = await this.authService.calendary(codigoCategoria);
      this.tsveterinarios = data;
      this.idTurno = data.id;
      this.dataStorageService.setTurnoSeleccionado(this.idTurno);

      // Filtrar los días habilitados y obtener los días con horarios disponibles
      const diasHabilitados = this.tsveterinarios.dias.filter((dia: Dia) => {
        return dia.horarios.some((horario: Horario) => horario.enable && horario.hora !== '14:00 a 16:00')
      });
      console.log(diasHabilitados)
      this.ConHorarios = diasHabilitados.filter((horarios: any) => diaActual <= horarios.dia)
        .map((horarios: any) => horarios.dia);

      if (this.servicio) {
        // Filtrar los días con horarios correspondientes al servicio seleccionado
        const diasConHorarios = this.tsveterinarios.dias.filter((dia: Dia) => {
          return dia.horarios.some((horario: Horario) => horario.hora === this.servicio.duracion && horario.enable)
        });

        const dias = diasConHorarios.map((horario: any) => horario.dia)
        window.alert('Días con horarios disponibles: ' + dias);
      } else {
        window.alert('Días con horarios disponibles: ' + this.ConHorarios);
      }
    });
  }

  // Método para obtener los datos de los pacientes
  datosPacientes() {
    console.log('hola')
    // Obtener la fecha de Ionic Calendar
    const fecha = new Date(this.fechaSeleccionada);

    // Establecer el idioma en español para las fechas
    moment.locale('es');

    // Obtener el mes de Ionic Calendar en español
    const mesEnEspanol = moment(fecha).format('MMMM').toUpperCase();

    this.diaSelecter = fecha.getDate();
    this.mesActual = moment(this.mesActual).format('MMMM').toUpperCase();

    // Filtrar el objeto diaTurno según el día seleccionado y el mes actual
    console.log(this.tsveterinarios)
    this.diaTurno = this.tsveterinarios.dias.filter(
      (dia: Dia) => dia.dia == this.diaSelecter
    )[0];
    console.log(this.diaTurno)

    // Determinar si el día tiene turnos o no
    const tieneTurnos = this.tieneTurnos(this.diaTurno);

    // Asignar la clase dinámica al contenedor del día en el calendario
    this.diaSelecterClass = tieneTurnos ? '' : 'day-without-turns';

    if (this.servicio) {
      console.log('peluqueria')
      const fechaActual = new Date();
      const horaActual = fechaActual.getHours();
      const minutosActual = fechaActual.getMinutes();
      const diaActual = fechaActual.getDate();
      console.log(diaActual, this.diaSelecter);

      // Filtrar los horarios según el servicio seleccionado y obtener las horas correspondientes
      console.log(this.diaTurno);
      this.horas = this.diaTurno.horarios.filter(
        (horario: Horario) =>
          horario.enable && horario.hora === this.servicio.duracion
          // && diaActual <= this.diaSelecter
      ).map((horario: Horario) => horario.hora);

      

      const horasInferiores = this.horas.filter((hora: string) => {
        const horasEnTurno = hora.split('a');
        const [horas, minutos] = horasEnTurno[0].split(':');
        console.log(horas);
        console.log(minutos);
        const minutosTotalesTurno = parseInt(horas) * 60 + parseInt(minutos);
        const minutosTotalesActual = horaActual * 60 + minutosActual;
        console.log(minutosTotalesTurno, minutosTotalesActual)
        return minutosTotalesActual > minutosTotalesTurno;
      });

      console.log(horasInferiores);

      if (horasInferiores.length > 0 && diaActual >= this.diaSelecter) {
        window.alert('Solo hay horas anteriores a la hora actual. Por favor, selecciona una fecha y hora válidas.');
        this.horas = '';
        return;
      }
    } else if (this.ecografia == 'Ecografia') {
      console.log('Ecografia')
      console.log(this.diaTurno)
      const fechaActual = new Date();
      const diaActual = fechaActual.getDate();
      console.log(diaActual);

      console.log(this.diaSelecter, diaActual)
      // Filtrar los horarios según la ecografía seleccionada y obtener las horas correspondientes
      this.horas = this.diaTurno.horarios
        .filter((horario: Horario) => {horario.enable && horario.hora !== '14:00 a 16:00' 
                                      && diaActual >= this.diaSelecter})
        .map((horario: Horario) => horario.hora);
      console.log(this.horas)
      // Ordenar las horas de forma ascendente
      this.horas.sort((a: any, b: any) => {
        const horaA = new Date(`2000-01-01T${a}`);
        const horaB = new Date(`2000-01-01T${b}`);
        return horaA.getTime() - horaB.getTime();
      });
    } else {
      console.log('otros')
      console.log('peluqueria')
      const fechaActual = new Date();
      const horaActual = fechaActual.getHours();
      const minutosActual = fechaActual.getMinutes();
      const diaActual = fechaActual.getDate();
      console.log(diaActual, this.diaSelecter);
      // Filtrar los horarios y obtener las horas correspondientes
      this.horas = this.diaTurno.horarios.filter((horario: Horario) => {
        const [hor, minutos] = horario.hora.split(':');
        console.log(hor);
        console.log(minutos);
        const minutosTotalesTurno = parseInt(hor) * 60 + parseInt(minutos);
        const minutosTotalesActual = horaActual * 60 + minutosActual;
        console.log(minutosTotalesTurno, minutosTotalesActual)
        return minutosTotalesActual < minutosTotalesTurno && horario.enable 
               && horario.hora !== '14:00 a 16:00'
               && diaActual <= this.diaSelecter;
      }).map((horario: Horario) => horario.hora);
      console.log(this.horas )
      // this.horas = this.diaTurno.horarios
      //   .filter((horario: Horario) => horario.enable && horario.hora !== '14:00 a 16:00'
      //                                 && diaActual >= this.diaSelecter)
      //   .map((horario: Horario) => horario.hora);
      
    }
  }

  // Método para verificar si un día tiene turnos
  tieneTurnos(dia: Dia): boolean {
    return dia && dia.horarios && dia.horarios.length > 0;
  }

  // Método para seleccionar una hora
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

  // Método para regresar a la página anterior
  back() {
    this.router.navigate(['reserva']);
  }

  // Método para ir a la siguiente página
  siguiente() {
    this.dataStorageService.setDiaSeleccionado(this.diaSelecter);
    this.router.navigate(['datos-paciente'], {
      queryParams: { diaTurno: this.diaSelecter },
    });
  }
}