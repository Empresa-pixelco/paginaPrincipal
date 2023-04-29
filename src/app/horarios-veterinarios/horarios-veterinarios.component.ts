import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-horarios-veterinarios',
  templateUrl: './horarios-veterinarios.component.html',
  styleUrls: ['./horarios-veterinarios.component.scss']
})
export class HorariosVeterinariosComponent {
  public horariosDisponibles = [  {    dia: "Lunes",    horarios: ["10:00", "11:00", "12:00", "16:00", "17:00", "18:00"]
      },
      {
        dia: "Martes",
        horarios: ["09:00", "10:00", "11:00", "15:00", "16:00", "17:00", "18:00"]
      },
      {
        dia: "Miércoles",
        horarios: ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"]
      },
      {
        dia: "Jueves",
        horarios: ["08:00", "09:00", "10:00", "11:00", "15:00", "16:00", "17:00"]
      },
      {
        dia: "Viernes",
        horarios: ["10:00", "11:00", "12:00", "15:00", "16:00", "17:00", "18:00"]
      },
      {
        dia: "Sábado",
        horarios: ["09:00", "10:00", "11:00", "12:00"]
      }
      ];
  router: any;
  continuar(){
    this.router.navigate(['datos-paciente']);
  }

}
