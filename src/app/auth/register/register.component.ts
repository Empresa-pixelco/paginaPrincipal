import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  location = inject(Location);
  router = inject(Router);
  constructor() {}

  ngOnInit() {}

  register() {
    this.router.navigate(['login']);
  }

  back() {
    this.router.navigate(['datos-paciente']);
  }
}
