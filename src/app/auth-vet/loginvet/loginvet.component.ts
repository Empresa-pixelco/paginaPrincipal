import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-loginvet',
  templateUrl: './loginvet.component.html',
  styleUrls: ['./loginvet.component.scss']
})
export class LoginvetComponent {

  email: string | any;
  password: string | any;

  constructor(private authService: AuthService, private router: Router) { }

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
        localStorage.setItem('access_token', data.accesToken);
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
  

  registers() {
    this.router.navigate(['register']);
  }
}
