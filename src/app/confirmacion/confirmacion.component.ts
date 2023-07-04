import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
import * as moment from 'moment';

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
  diaCita: any
  mesActual: any;
  idTurno: string | any;
  mesSelectd: any
  constructor(private dataStorageService: StorageService, private authService: AuthService) {}

  ngOnInit() {
    // Obtener los datos almacenados en el servicio
    this.datosPaciente = this.dataStorageService.getDatosPaciente();
    this.servicio = this.dataStorageService.getnombreServicioSeleccionado()
    this.nombreveterinario = this.dataStorageService.getnombreVeterinarioSeleccionado()
    this.horaAtencion = this.dataStorageService.getHoraSeleccionado()
    const fecha = new Date();
    this.diaCita = this.dataStorageService.getDiaSeleccionado()
    this.idTurno = this.dataStorageService.getTurnoSeleccionado()
    this.mesSelectd = this.dataStorageService.getMesSeleccionado().toLowerCase()
    console.log(this.mesSelectd)
    //dejar la fecha en espanol
    moment.locale('es');
    //obtener el mes de ionic calendar
    this.mesActual = moment(fecha).format('MMMM')
    // Si deseas mostrar los datos de otras vistas, puedes obtenerlos de manera similar usando los métodos correspondientes del servicio
    console.log(this.datosPaciente) 
  }

  agendar() {
    const cita= {
      "servicio": this.servicio,
      "dia": this.diaCita,
      "hora": this.horaAtencion,
      "paciente": {
        "nombre": this.datosPaciente.nombreMascota,
        "especie": this.datosPaciente.especie,
        "sexo": this.datosPaciente.sexo,
      }
    }
    console.log(cita)
    console.log(this.idTurno)
    try{
      const respuesta = this.authService.crearCita(cita,this.idTurno);
      if(!!respuesta){
        this.showToast = true;
        alert('Cita agendada')
      }
      else{
        alert()
      }
    }catch(err){
        alert('Vuelve a intentarlo')
    }

  }
}
