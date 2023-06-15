import { Location } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  login() {
    const user = {
      email: this.email,
      password: this.password
    };
    if (!this.email || !this.password) {
      alert('Por favor ingrese su correo y contraseña');
      return; 
    }
    
    this.authService.login(user)
    .then((data) => {
      if (data && data.accesToken) {
        alert('Bienvenido!');
        localStorage.setItem('access_t', data.accesToken);
        // Redirigir al usuario a la página de confirmación
        this.router.navigate(['confirmacion']);
      } else {
        alert('Debe Registrarse');
      }
    })
    .catch((error) => {
      console.log(error);
      alert('No registrado');
    });
  }

  register() {
    //implementar la lógica para redirigir al usuario a la página de registro
  }


  registers() {
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
