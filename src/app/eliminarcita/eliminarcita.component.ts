import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-eliminarcita',
  templateUrl: './eliminarcita.component.html',
  styleUrls: ['./eliminarcita.component.scss']
})
export class EliminarcitaComponent {
  veterinarios: any | any; // Reemplaza 'any[]' con el tipo adecuado para tus datos de veterinarios y turnos
  idSelected: string | any;
  constructor(private service: AuthService, private router: Router) {}
  async ngOnInit() {
    this.veterinarios = await this.service.staffAll()
    console.log(this.veterinarios)
  }
  async continuar() {
    this.router.navigate(['eliminarcitacalendary'],{
      queryParams: { idSelected: this.idSelected }, // Pasa el parámetro como queryParams
    });
  }

  veterinarioSelected(id: string){
      this.idSelected = id;
      console.log(this.idSelected)
  }
}
