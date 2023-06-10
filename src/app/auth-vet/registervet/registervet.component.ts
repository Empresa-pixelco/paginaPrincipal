import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { validarRutNumeros } from 'src/app/util/validaRut';

@Component({
  selector: 'app-registervet',
  templateUrl: './registervet.component.html',
  styleUrls: ['./registervet.component.scss']
})
export class RegistervetComponent {
  userDni: string | any;
  userFirstName: string | any;
  email: string | any;
  phone: string | any;
  password: string | any;

  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {}
  register() {
    if (!this.userDni || !this.userFirstName || !this.email || !this.phone || !this.password) {
      alert('Por favor complete todos los campos');
      return;
    }   
 
    if (validarRutNumeros(this.userDni) == false) {
      alert('El RUT ingresado no es válido. Formato => 20999888-7');
      return;
    }
    // Eliminar espacios del número de teléfono
    this.phone = this.phone.replace(/\s/g, '');
    // Validar la longitud del número de teléfono
    if (this.phone.length !== 9) {
      alert('El número de teléfono debe tener 9 dígitos');
      return;
    }
    // Validación del correo electrónico
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!this.email.match(emailRegex)) {
      alert('Ingrese un correo electrónico válido');
      return;
    }
    //validar password
    if (this.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    const user = {
      userDni: this.userDni,
      userFirstName: this.userFirstName,
      email: this.email,
      phone: this.phone,
      password: this.password
    };
    console.log(user)
    this.authService.register(user)
      .then((data) => {
        alert('Cuenta creada con éxito!');
        localStorage.setItem('access_token', data.accesToken)
        this.router.navigate(['confirmacion']);
      })
      .catch((error) => {
        console.log(error, 'en registro');
        alert('Error al crear cuenta');
      });
  }
  back() {
    this.router.navigate(['datos-paciente']);
  }
}
