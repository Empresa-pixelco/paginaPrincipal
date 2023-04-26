import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  location = inject(Location);
  router = inject(Router);
  constructor() {}

  ngOnInit() {}

  login() {
    this.router.navigate(['confirmacion']);
  }

  register() {
    this.router.navigate(['register']);
  }

  back() {
    this.location.back();
  }
}
