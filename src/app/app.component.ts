import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // Función para navegar a la sección seleccionada
  navigateTo(section: string) {
    // Puedes agregar lógica adicional aquí, como realizar acciones antes de la navegación
    console.log(`Navegando a ${section}`);
    // Aquí puedes implementar la lógica de navegación a la sección seleccionada
  }
  title = 'Calendario_Horarios';


}
