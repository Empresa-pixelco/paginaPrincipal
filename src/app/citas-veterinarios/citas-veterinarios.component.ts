import { Component } from '@angular/core';

@Component({
  selector: 'app-citas-veterinarios',
  templateUrl: './citas-veterinarios.component.html',
  styleUrls: ['./citas-veterinarios.component.scss']
})
export class CitasVeterinariosComponent {
  veterinarios: string[] = ['Veterinario 1', 'Veterinario 2', 'Veterinario 3']; // Lista de veterinarios disponibles
  citas: { [key: string]: { fecha: string, servicio: string }[] } = {
    'Veterinario 1': [
      { fecha: '2023-06-03', servicio: 'Vacunación' },
      { fecha: '2023-06-05', servicio: 'Consulta general' }
    ],
    'Veterinario 2': [
      { fecha: '2023-06-04', servicio: 'Esterilización' },
      { fecha: '2023-06-07', servicio: 'Examen de sangre' }
    ],
    'Veterinario 3': [
      { fecha: '2023-06-06', servicio: 'Limpieza dental' },
      { fecha: '2023-06-08', servicio: 'Radiografía' },
      { fecha: '2023-06-10', servicio: 'Cirugía' }
    ],
  };

  volver() {
    // Lógica para volver atrás en la vista de citas
    // ...
  }
}
