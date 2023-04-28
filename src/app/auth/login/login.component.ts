import { Location } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  location = inject(Location);
  router = inject(Router);

  email: string | any;
  password: string | any;

  constructor( ) {}


  ngOnInit() {}

  login() {
    this.router.navigate(['confirmacion']);
    this.email = this.email
    console.log('Value submitted:', this.email);
  }
  register() {
    this.router.navigate(['register']);
  }
  

  // onSubmit() {
  //   // Llama al servicio de autenticación para realizar el inicio de sesión
  //   this.authService.login(this.email, this.password).subscribe(
  //     // Maneja la respuesta del API de autenticación
  //     (response) => {
  //       // Guarda el token JWT en el local storage o en una cookie
  //       const token = response.token;
  //       // Haz lo que necesites con el token, por ejemplo, redirigir a otra página
  //     },
  //     (error) => {
  //       // Maneja el error de autenticación
  //       console.error('Error de autenticación:', error);
  //     }
  //   );
  // }
}
