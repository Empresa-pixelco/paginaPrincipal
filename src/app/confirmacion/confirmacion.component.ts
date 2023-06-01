import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule],
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss'],
})
export class ConfirmacionComponent {
  datosPaciente: any;
  servicio: string | undefined;
  nombreveterinario: string | undefined;
  horaAtencion: string | undefined;
  showToast: boolean = false;

  constructor(private dataStorageService: StorageService, private authService: AuthService) {}

  ngOnInit() {
    // Obtener los datos almacenados en el servicio
    this.datosPaciente = this.dataStorageService.getDatosPaciente();
    this.servicio = this.dataStorageService.getnombreServicioSeleccionado()
    this.nombreveterinario = this.dataStorageService.getnombreVeterinarioSeleccionado()
    this.horaAtencion = this.dataStorageService.getHoraSeleccionado()
    // Si deseas mostrar los datos de otras vistas, puedes obtenerlos de manera similar usando los métodos correspondientes del servicio
    console.log(this.datosPaciente) 
  }

  agendar() {
    if (!this.authService.checkAuthentication()) {
      console.log('Debe estar autenticado para confirmar la reserva.');
      return;
    }
    this.showToast = true;
  }
}
