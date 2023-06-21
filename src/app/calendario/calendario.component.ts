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
  horas: any
  fechaSeleccionada: any | undefined;
  diaTurno: Dia | any;
  diaSelecter: any
  mesVet:string| any;
  horaSeleccionada: string| any;
  servicio: any;
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute, private dataStorageService: StorageService) { }

  async ngOnInit() {
      this.servicio = this.dataStorageService.getnombreServicioSeleccionado()
      console.log(this.servicio)
      this.route.queryParams.subscribe( async params => {
      const codigoCategoria = params['codigoCategoria'];
      console.log('Código de vetrinario recibido:', codigoCategoria);

      const data: Calendario = await this.authService.calendary(codigoCategoria);
      this.tsveterinarios = data
      this.idTurno = data.id
      this.dataStorageService.setTurnoSeleccionado(this.idTurno)
      console.log(data)
  })
}

  datosPacientes() {
    //meses que tiene turno veterinario
    this.mesVet = this.tsveterinarios.mes
    //obtener la fecha de ionic calendar
    const fecha = new Date(this.fechaSeleccionada);
    //dejar la fecha en espanol
    moment.locale('es');
    //obtener el mes de ionic calendar
    const mesEnEspanol = moment(fecha).format('MMMM').toUpperCase();

    
    this.diaSelecter = fecha.getDate();
    this.mesActual = moment(this.mesActual).format('MMMM').toUpperCase();

    this.diaTurno = this.tsveterinarios.dias.filter((dia: Dia)=> dia.dia == this.diaSelecter && mesEnEspanol == this.mesVet)[0]
    console.log(this.diaTurno)
    this.horas = this.diaTurno.horarios.filter((horario: Horario)=> horario.enable 
    ).map((horario: Horario)=> horario.hora)
    console.log(this.horas)
    console.log('Fecha seleccionada:', this.fechaSeleccionada);
    if (this.diaTurno) {
      const horas = this.diaTurno.horarios.filter((horario: Horario) =>horario.hora);
      console.log('Horas seleccionadas:', horas);
    }
  }

  seleccionarHora(hora: string): void{
    this.horaSeleccionada = hora
    this.dataStorageService.setHoraSeleccionado(hora)

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
back(){
  this.router.navigate(['reserva']);
}
siguiente(){
  this.dataStorageService.setDiaSeleccionado(this.diaSelecter)
  this.router.navigate(['datos-paciente'],{
    queryParams: { diaTurno: this.diaSelecter}, // Pasa el parámetro como queryParams
  });
}
}