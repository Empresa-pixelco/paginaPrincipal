import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
@Component({
  standalone: false,
  selector: 'app-datos-paciente',
  templateUrl: './datos-paciente.component.html',
  styleUrls: ['./datos-paciente.component.scss'],
})
export class DatosPacienteComponent {
  constructor(private router: Router, private dataStorageService: StorageService) { }
  nombreMascota: any | undefined;
  especie: any | undefined;
  sexo: any | undefined;

  continuar() {
    if (!this.nombreMascota || !this.especie || !this.sexo) {
      console.log('Todos los campos son obligatorios');
      alert('Todos los campos son obligatorios')
      return;
    }
    //acceder a los valores seleccionados y hacer lo que necesites con ellos
    console.log('Nombre de la mascota:', this.nombreMascota);
    console.log('Especie:', this.especie);
    console.log('Sexo:', this.sexo);

    this.dataStorageService.setDatosPaciente({
      nombreMascota: this.nombreMascota,
      especie: this.especie,
      sexo: this.sexo,
    })
    this.router.navigate(['login']);
  }

  atras(){
    this.router.navigate(['reserva']);
  }
}
