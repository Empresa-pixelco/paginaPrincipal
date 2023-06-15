import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-turno-vet',
  templateUrl: './turno-vet.component.html',
  styleUrls: ['./turno-vet.component.scss']
})
export class TurnoVetComponent {
  fechaSeleccionada: Date | any;
  veterinarios: any | any; // Reemplaza 'any[]' con el tipo adecuado para tus datos de veterinarios y turnos
  veterinarioSeleccionado: any;
  constructor(private service: AuthService) {}
  async ngOnInit() {
    this.veterinarios = await this.service.staffAll()
    console.log(this.veterinarios)
  }
  filtrarTurnos() {
    // Lógica para filtrar los turnos según la fecha seleccionada y el veterinario seleccionado
    // Puedes implementar aquí la funcionalidad específica que necesites
  }
  volver() {
    // Lógica para volver a la página anterior o realizar alguna acción específica al hacer clic en "Volver"
    // Puedes implementar aquí la funcionalidad específica que necesites
  }
}
