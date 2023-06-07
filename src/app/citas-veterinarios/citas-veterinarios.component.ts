import { Component } from '@angular/core';

@Component({
  selector: 'app-citas-veterinarios',
  templateUrl: './citas-veterinarios.component.html',
  styleUrls: ['./citas-veterinarios.component.scss']
})
export class CitasVeterinariosComponent {
  veterinarios: string[] = ['Veterinario 1', 'Veterinario 2', 'Veterinario 3'];
  citas: { [key: string]: { fecha: string; servicio: string }[] } = {
    'Veterinario 1': [
      { fecha: '2023-06-05', servicio: 'Consulta general' },
      { fecha: '2023-06-05', servicio: 'Vacunación' },
    ],
    'Veterinario 2': [
      { fecha: '2023-06-05', servicio: 'Cirugía' },
      { fecha: '2023-06-06', servicio: 'Consulta general' },
    ],
    'Veterinario 3': [
      { fecha: '2023-06-06', servicio: 'Vacunación' },
      { fecha: '2023-06-07', servicio: 'Consulta general' },
    ],
  };
  fechaSeleccionada: string = '';

  filtrarCitas() {
    // Implementa el código para filtrar las citas por la fecha seleccionada
  }

  volver() {
    // Implementa el código para volver a la página anterior
  }
}
