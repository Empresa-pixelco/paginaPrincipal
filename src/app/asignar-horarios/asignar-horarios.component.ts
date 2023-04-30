import { Component } from '@angular/core';
import { Horario } from '../interfaces/horario.model';
import { Veterinario } from '../interfaces/veterinario.model';

@Component({
  selector: 'app-asignar-horarios',
  templateUrl: './asignar-horarios.component.html',
  styleUrls: ['./asignar-horarios.component.scss']
})
export class AsignarHorariosComponent {

  veterinarios: Veterinario[] = [
    { nombre: 'Juan' },
    { nombre: 'Ana' },
    { nombre: 'Pedro' }
  ];

  horarios: { [dia: string]: Horario[] } = {
    lunes: [
      { hora: '08:00', disponible: false },
      { hora: '10:00', disponible: false }
    ],
    martes: [
      { hora: '08:00', disponible: false },
      { hora: '10:00', disponible: false }
    ]
  };

  veterinarioSeleccionado: string = '';
  horarioSeleccionado: string = '';
  diaSeleccionado: string = '';

  cambiarVeterinario() {
    this.horarioSeleccionado = '';
    this.diaSeleccionado = '';
  }

  asignar() { 
    if (this.veterinarioSeleccionado !== '' && this.horarioSeleccionado !== '' && this.diaSeleccionado !== '') {
      const horario = this.horarios[this.diaSeleccionado].find(horario => horario.hora === this.horarioSeleccionado);
      if (horario) {
        horario.disponible = !horario.disponible;
      }
    }
  }

  continuar() {
    console.log('Horarios:', this.horarios);
  }
}
