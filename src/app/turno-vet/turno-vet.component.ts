import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-turno-vet',
  templateUrl: './turno-vet.component.html',
  styleUrls: ['./turno-vet.component.scss']
})
export class TurnoVetComponent {
  selectedMonth: any
  fechaSeleccionada: Date | any;
  anio: any | any;
  mes: any | any;
  veterinarios: any | any; // Reemplaza 'any[]' con el tipo adecuado para tus datos de veterinarios y turnos
  veterinarioSeleccionado: any;
  idSelected: string | any;
  constructor(private service: AuthService, private router: Router) {}
  async ngOnInit() {
    const currentDate = new Date();
    this.anio = currentDate.getFullYear().toString();
    this.mes = currentDate.toLocaleString('es-ES', { month: 'long' }).toUpperCase();

    this.veterinarios = await this.service.staffAll()
    console.log(this.veterinarios)
  }
  filtrarTurnos() {
    // Lógica para filtrar los turnos según la fecha seleccionada y el veterinario seleccionado
    // Puedes implementar aquí la funcionalidad específica que necesites
  }
  async continuar() {
    console.log(this.selectedMonth)
    const turnoM={
      "staff_id": this.idSelected,
      "sucursal_id": "2PiNETB6CdlKHXJm9b3g",
      "anio": this.anio,
      "mes": this.selectedMonth
    }
    console.log(turnoM)
    try {
      const response = await this.service.turnosMes(turnoM)
      console.log(response)
      alert('Mes con turno creados, ahora debes asignar los horarios por dia');
      this.router.navigate(['turnos-dias-vet'])
    } catch (error) { 
      alert('Mes con turno ya han sido creados, ahora debes asignar los horarios por dia');
      this.router.navigate(['turnos-dias-vet'],{
        queryParams: { idVet: this.idSelected , mes: this.selectedMonth}, // Pasa el parámetro como queryParams
      });
      throw new Error('Error al registrar usuario');
    }
    // Lógica para volver a la página anterior o realizar alguna acción específica al hacer clic en "Volver"
    // Puedes implementar aquí la funcionalidad específica que necesites
  }

  veterinarioSelected(id: string){
      this.idSelected = id;
      console.log(this.idSelected)
  }
}
