import { Component } from '@angular/core';
import * as moment from 'moment';
import { OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Veterinarios } from '../interfaces/veterinarios.model';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent {
  tsveterinarios: any | undefined;

  
  constructor(private router: Router, private authService: AuthService) { }
  async ngOnInit() {
        const data: Veterinarios[] = await this.authService.staff();
        this.tsveterinarios = data
        console.log(JSON.stringify(this.tsveterinarios));
        console.log(this.tsveterinarios)    
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
back(){}
datosPaciente() {
  this.router.navigate(['login']);
}
}
