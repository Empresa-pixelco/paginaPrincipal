import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import * as moment from 'moment';
@Component({
  selector: 'app-citas-veterinarios',
  templateUrl: './citas-veterinarios.component.html',
  styleUrls: ['./citas-veterinarios.component.scss']
})
export class CitasVeterinariosComponent {
  iVet: string | any;

  horaCita: any | any
  servicioCita: any | any
  veterinario: any | any
  paciente: any | any
  mesEnEspanol: any | any;
  mes: string | any;
  dia: string | any;
  diaParse: string | any;
  dataCita: any | any;
  diaSelecter: any | any;
  fechaSeleccionada: any | undefined;
  constructor(private router: Router, private authService: AuthService,  private dataStorageService: StorageService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe( async params => {
      this.iVet = params['idVet'];
      console.log('Código de categoría recibido:', this.iVet);

      const data: any = await this.authService.citas(this.iVet);
      this.dataCita = data.data
      console.log(this.dataCita)
      localStorage.setItem('access_token', data.accesToken)
    })
  }

  datosCita() {
    for (let i = 0; i < this.dataCita.length; i++) {
      const cita = this.dataCita[i];
      const fechaCita = cita.fecha;

      const partesFecha = fechaCita.split("-");
      // Extraer el año, el mes y el día
      const año = parseInt(partesFecha[0], 10);
      this.mes = partesFecha[1];
      this.dia = parseInt(partesFecha[2], 10);

      //obtener la fecha de ionic calendar
      const fecha = new Date(this.fechaSeleccionada);
      //dejar la fecha en espanol
      moment.locale('es');
      //obtener el mes de ionic calendar
      this.mesEnEspanol = moment(fecha).format('MMMM').toUpperCase();
      this.diaSelecter = fecha.getDate();
      
      if(this.dia == this.diaSelecter && this.mes == this.mesEnEspanol){
        this.diaParse = this.diaSelecter
        console.log(this.diaParse)
        this.horaCita = cita.hora;
        this.veterinario = cita.staff;
        this.servicioCita = cita.servicio
        this.paciente = cita.paciente
        console.log(this.veterinario)
      }


    }

  }

  filtrarCitas() {
    // Implementa el código para filtrar las citas por la fecha seleccionada
  }

  volver() {
    // Implementa el código para volver a la página anterior
  }
}
