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
  monthNumber: any
  codigoCategoria: any
  monthVet: any
  mesEnEspanol:  any
  dias: any | undefined;
  monthSelectedNumber: any
  getDayValues: any
  peluqueria: any | undefined
  diaActual: any
  // Constructor
  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private dataStorageService: StorageService
  ) {}

  // Método de inicialización
  async ngOnInit() {
    console.log('fecha',this.fechaSeleccionada)
    const fechaActual = new Date();
    this.diaActual = fechaActual.getDate();
    console.log('dia actual', this.diaActual)
    moment.locale('es');
    this.mesActual = moment().format('MMMM').toUpperCase();
    this.monthNumber = moment().format('MM').toUpperCase()[1];

    // Obtener el servicio y la ecografía seleccionados del almacenamiento
    this.servicio = this.dataStorageService.getHorarioServicioSeleccionado();
    this.ecografia = this.dataStorageService.getnombreServicioSeleccionado();
    this.peluqueria =this.servicio['subServicio']
    // Suscribirse a los parámetros de la ruta
    this.route.queryParams.subscribe(async (params) => {
      this.codigoCategoria = params['codigoCategoria'];
      console.log('Código de veterinario recibido:', this.codigoCategoria);
    });
  }

  // Método para obtener los datos de los pacientes
  async datosPacientes() {

    // Obtener la fecha de Ionic Calendar
    const fecha = new Date(this.fechaSeleccionada);
    // Establecer el idioma en español para las fechas
    moment.locale('es');
    // Obtener el mes de Ionic Calendar en español
    this.mesEnEspanol = moment(fecha).format('MMMM').toUpperCase();
    this.diaSelecter = fecha.getDate();
    console.log('dia seleccionada', this.diaSelecter)
    this.monthSelectedNumber = moment(fecha).format('MM').toUpperCase();
    // Obtener el calendario del servidor
    const data: Calendario = await this.authService.calendary(this.codigoCategoria, this.mesEnEspanol);
    this.tsveterinarios = data;    
    this.idTurno = data.id;
    this.monthVet =this.tsveterinarios.mes

    this.dataStorageService.setTurnoSeleccionado(this.idTurno); 
    // Filtrar el objeto diaTurno según el día seleccionado y el mes actual
    this.diaTurno = this.tsveterinarios.dias.filter(
      (dia: Dia) => dia.dia == this.diaSelecter 
    )[0];
    this.dias = this.tsveterinarios.dias.map(
      (dia: any) => dia.dia
    );
    this.getDayValues = this.dias.join(',')
    if (this.peluqueria == 'Peluquería'){
      this.peluqueriaService(this.diaTurno)
    } else if (this.ecografia == 'Ecografia') {
      this.ecografiaServices(this.diaTurno)
    } else {
      this.otherServices(this.diaTurno)
    }
  }

  peluqueriaService(diaTurno: any){
    if(this.monthVet != this.mesActual){
      console.log('peluqueria, primer if')
      const fechaActual = new Date();  
      // Filtrar los horarios según el servicio seleccionado y obtener las horas correspondientes
      this.horas = diaTurno.horarios.filter(
        (horario: Horario) =>
          horario.enable && horario.hora === this.servicio.duracion
      ).map((horario: Horario) => horario.hora);
    }
    else{
      console.log('peluqueria')
      const fechaActual = new Date();
      const horaActual = fechaActual.getHours();
      const minutosActual = fechaActual.getMinutes();
  
      // Filtrar los horarios según el servicio seleccionado y obtener las horas correspondientes
      this.horas = diaTurno.horarios.filter((horario: Horario) =>{
            const horasEnTurno = horario.hora.split('a');
            const [horas, minutos] = horasEnTurno[0].split(':');

            const minutosTotalesTurno = parseInt(horas) * 60 + parseInt(minutos);
            const minutosTotalesActual = horaActual * 60 + minutosActual;
            if(this.diaSelecter> this.diaActual){
              return horario.enable && 
                     horario.hora === this.servicio.duracion
                     && this.diaSelecter >= this.diaActual
            }
            else if(this.diaSelecter= this.diaActual){
              return minutosTotalesActual < minutosTotalesTurno &&
                     horario.hora === this.servicio.duracion &&
                     horario.enable && 
                     this.diaSelecter >= this.diaActual
            }          
            else if(this.diaSelecter< this.diaActual){
              return false    
            }
            
            return false
          // && diaActual <= this.diaSelecter
             }).map((horario: Horario) => horario.hora);
  
      
    }

  }
  ecografiaServices(diaTurno: any){
    if(this.monthVet != this.mesActual){
      console.log('Ecografia primeer if')
      const fechaActual = new Date();
      // Filtrar los horarios según la ecografía seleccionada y obtener las horas correspondientes
      this.horas = this.diaTurno.horarios
        .filter((horario: Horario) => horario.enable && horario.hora !== '14:00 a 16:00' 
                                      )
        .map((horario: Horario) => horario.hora);
      console.log(this.horas)
      // Ordenar las horas de forma ascendente
      this.horas.sort((a: any, b: any) => {
        const horaA = new Date(`2000-01-01T${a}`);
        const horaB = new Date(`2000-01-01T${b}`);
        return horaA.getTime() - horaB.getTime();
      });
    }else{
      console.log('Ecografia')
      const fechaActual = new Date();
      const horaActual = fechaActual.getHours();
      const minutosActual = fechaActual.getMinutes();
      // Filtrar los horarios según la ecografía seleccionada y obtener las horas correspondientes
      this.horas = this.diaTurno.horarios.filter((horario: Horario) =>{
            const [hor, minutos] = horario.hora.split(':');
            const minutosTotalesTurno = parseInt(hor) * 60 + parseInt(minutos);
            const minutosTotalesActual = horaActual * 60 + minutosActual;
            console.log(minutosTotalesTurno, minutosTotalesActual)
            if(this.diaSelecter> this.diaActual){
              return horario.enable && 
                     horario.hora !== '14:00 a 16:00' 
                      && this.diaSelecter >= this.diaActual
            }
            else if(this.diaSelecter= this.diaActual){
              return minutosTotalesActual < minutosTotalesTurno &&
              horario.enable && 
              horario.hora !== '14:00 a 16:00' 
              && this.diaSelecter >= this.diaActual
            }
            else if(this.diaSelecter< this.diaActual){
              return false    
            }
            return false

      }).map((horario: Horario) => horario.hora);
      // Ordenar las horas de forma ascendente
      this.horas.sort((a: any, b: any) => {
        const horaA = new Date(`2000-01-01T${a}`);
        const horaB = new Date(`2000-01-01T${b}`);
        return horaA.getTime() - horaB.getTime();
      });
    }

  }
  otherServices(diaTurno: any){
    if(this.monthVet != this.mesActual){
      console.log('other, primer if')
      // Filtrar los horarios y obtener las horas correspondientes
      this.horas = diaTurno.horarios.filter((horario: Horario) => {
        return horario.enable 
               && horario.hora !== '14:00 a 16:00'
      }).map((horario: Horario) => horario.hora);
      console.log(this.horas )
    
    }else{
      console.log('otros')
      const fechaActual = new Date();
      const horaActual = fechaActual.getHours();
      const minutosActual = fechaActual.getMinutes();
      // Filtrar los horarios y obtener las horas correspondientes
      this.horas = diaTurno.horarios.filter((horario: Horario) => {
        const [hor, minutos] = horario.hora.split(':');

        const minutosTotalesTurno = parseInt(hor) * 60 + parseInt(minutos);
        const minutosTotalesActual = horaActual * 60 + minutosActual;
        console.log(minutosTotalesTurno, minutosTotalesActual)
        console.log(this.diaSelecter, this.diaActual)
        if(this.diaSelecter> this.diaActual){
          return horario.enable && 
                 horario.hora !== '14:00 a 16:00' 
        }
        else if(this.diaSelecter == this.diaActual){
          return minutosTotalesActual < minutosTotalesTurno &&
          horario.enable && 
          horario.hora !== '14:00 a 16:00' 
        }
        
        else if(this.diaSelecter< this.diaActual){
          console.log(this.diaSelecter,this.diaActual)
          return false    
        }
        return false
      }).map((horario: Horario) => horario.hora);
      console.log(this.horas )
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
    this.dataStorageService.setMesSeleccionado(this.mesEnEspanol)
    console.log(this.mesEnEspanol)
    this.dataStorageService.setDiaSeleccionado(this.diaSelecter);
    this.router.navigate(['datos-paciente'], {
      queryParams: { diaTurno: this.diaSelecter },
    });
  }
}