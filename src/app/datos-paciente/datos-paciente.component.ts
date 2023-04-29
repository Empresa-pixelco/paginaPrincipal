import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule],
  selector: 'app-datos-paciente',
  templateUrl: './datos-paciente.component.html',
  styleUrls: ['./datos-paciente.component.scss'],
})
export class DatosPacienteComponent {
  constructor(private router: Router) { }



  continuar() {
    this.router.navigate(['login']);
  }
  atras(){
    this.router.navigate(['reserva']);
  }
}
