import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-datos-paciente',
  templateUrl: './datos-paciente.component.html',
  styleUrls: ['./datos-paciente.component.scss'],
})
export class DatosPacienteComponent {
  constructor(private router: Router) { }
  nombreMascota: any | undefined;
  especie: any | undefined;
  sexo: any | undefined;

  continuar() {
    // Aquí puedes acceder a los valores seleccionados y hacer lo que necesites con ellos
    console.log('Nombre de la mascota:', this.nombreMascota);
    console.log('Especie:', this.especie);
    console.log('Sexo:', this.sexo);
  }


  atras(){
    this.router.navigate(['reserva']);
  }
}
