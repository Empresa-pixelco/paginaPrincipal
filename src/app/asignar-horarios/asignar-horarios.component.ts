import { Component } from '@angular/core';
import { Horario } from '../interfaces/horario.model';
import { Veterinario } from '../interfaces/veterinario.model';

@Component({
  selector: 'app-asignar-horarios',
  templateUrl: './asignar-horarios.component.html',
  styleUrls: ['./asignar-horarios.component.scss']
})
export class AsignarHorariosComponent {
  veterinarios: string[] = ['Veterinario 1', 'Veterinario 2', 'Veterinario 3']; // Lista de veterinarios disponibles
  veterinarioSeleccionado: string | undefined;
  fechaSeleccionada: string | undefined;
  diaTurno: boolean = false;
  horas: string[] = ['09:00', '10:00', '11:00', '12:00', '13:00']; // Horarios disponibles
  horaSeleccionada: string | undefined;

  datosPacientes() {
    // Lógica para obtener los datos de los pacientes según la fecha seleccionada y el veterinario seleccionado
    // ...
    this.diaTurno = true;
  }

  seleccionarHora(hora: string) {
    this.horaSeleccionada = hora;
  }

  guardarHorario() {
    // Lógica para guardar el horario asignado al veterinario seleccionado
    // ...
    console.log('Horario guardado:', this.fechaSeleccionada, this.horaSeleccionada, 'Veterinario:', this.veterinarioSeleccionado);
    // Restablecer los valores seleccionados
    this.veterinarioSeleccionado = '';
    this.fechaSeleccionada = '';
    this.diaTurno = false;
    this.horaSeleccionada = '';
  }

  atras() {
    // Lógica para volver atrás en la selección de horarios
    // ...
    this.veterinarioSeleccionado = '';
    this.fechaSeleccionada = '';
    this.diaTurno = false;
    this.horaSeleccionada = '';
  }


}
