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
  filteredCitas: any
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
    this.filteredCitas = this.dataCita.filter((cita: any) => {
      const fechaCita = cita.fecha;
      const partesFecha = fechaCita.split("-");
      const año = parseInt(partesFecha[0], 10);
      this.mes = partesFecha[1];
      this.dia = parseInt(partesFecha[2], 10);

      const fecha = new Date(this.fechaSeleccionada);
      moment.locale('es');
      this.mesEnEspanol = moment(fecha).format('MMMM').toUpperCase();
      this.diaSelecter = fecha.getDate();

      return this.dia === this.diaSelecter && this.mes === this.mesEnEspanol;
    });

 }

  

  filtrarCitas() {
    // Implementa el código para filtrar las citas por la fecha seleccionada
  }

  volver() {
    // Implementa el código para volver a la página anterior
  }
}
