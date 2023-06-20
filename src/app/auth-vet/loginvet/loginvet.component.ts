import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-loginvet',
  templateUrl: './loginvet.component.html',
  styleUrls: ['./loginvet.component.scss']
})
export class LoginvetComponent {
  email: string | any;
  password: string | any;
  roles: any | any;
  idVeterinario: string | any;
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
        localStorage.setItem('access_toke', data.accesToken);
        const tokenData: any = jwt_decode(data.accesToken);
        console.log(tokenData)
        this.roles = tokenData.aRoles
        // this.idVeterinario = tokenData.staff._id
        console.log(this.roles)
        console.log(this.idVeterinario)
        if (this.roles.includes('VET')){
          this.router.navigate(['citas'],{
            queryParams: { idVet: this.idVeterinario }, // Pasa el parámetro como queryParams
          });
        }
        if (this.roles.includes('ADMIN')){
          this.router.navigate(['panel']);
        }
       } 
       else {
        alert('Debe Registrarse');
      }
    })
    .catch((error) => {
      console.log(error);
      alert('No registrado');
    });
  }

}
