import { CommonModule, Location} from '@angular/common';
import { Component} from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-seleccion-hora',
  templateUrl: './seleccion-hora.component.html',
  styleUrls: ['./seleccion-hora.component.scss'],
})
export class SeleccionHoraComponent {
  currentMonth: string;
  daysInMonth: number[];

  constructor() {
    this.currentMonth = 'Abril'; // Establecer el mes actual
    this.daysInMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]; // Simular los días del mes actual
  }

  prevMonth() {
    // Lógica para ir al mes anterior
    console.log('Ir al mes anterior');
  }

  nextMonth() {
    // Lógica para ir al mes siguiente
    console.log('Ir al mes siguiente');
  }
}
