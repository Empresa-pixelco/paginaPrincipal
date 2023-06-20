import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eliminar-turno',
  templateUrl: './eliminar-turno.component.html',
  styleUrls: ['./eliminar-turno.component.scss']
})
export class EliminarTurnoComponent {

  veterinarios: any | any; // Reemplaza 'any[]' con el tipo adecuado para tus datos de veterinarios y turnos
  idSelected: string | any;
  constructor(private service: AuthService, private router: Router) {}
  async ngOnInit() {
    this.veterinarios = await this.service.staffAll()
    console.log(this.veterinarios)
  }
  async continuar() {
    this.router.navigate(['eliminarturnocalendary'],{
      queryParams: { idSelected: this.idSelected }, // Pasa el parámetro como queryParams
    });
  }

  veterinarioSelected(id: string){
      this.idSelected = id;
      console.log(this.idSelected)
  }
}