import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule],
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss'],
})
export class ReservasComponent {
  constructor(private router: Router) { }



  continuar() {
    this.router.navigate(['horarios-veterinarios']);
  }
}
