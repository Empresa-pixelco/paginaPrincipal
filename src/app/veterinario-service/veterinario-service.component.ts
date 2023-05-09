import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Categoria } from '../interfaces/categorias.model';
import { Veterinarios} from '../interfaces/veterinarios.model';
import { Veterinario } from '../interfaces/veterinario.model';

@Component({
  selector: 'app-veterinario-service',
  templateUrl: './veterinario-service.component.html',
  styleUrls: ['./veterinario-service.component.scss']
})
export class VeterinarioServiceComponent implements OnInit{
  tsveterinarios: any | undefined;

  
  constructor(private router: Router, private authService: AuthService) { }
  async ngOnInit() {
        const data: Veterinarios[] = await this.authService.staff();
        this.tsveterinarios = data
        console.log(JSON.stringify(this.tsveterinarios));
        console.log(this.tsveterinarios)    
  }
  


  continuar() {
    this.router.navigate(['horarios-veterinarios']);

  }
  servicioSeleccionado: number = -1;

  toggleSubservicios(servicio: number): void {
    console.log('ReservasComponent - toggleSubservicios()', servicio);  
    if (this.servicioSeleccionado === servicio) {
      this.servicioSeleccionado = -1;
    } else {
      this.servicioSeleccionado = servicio;
    }
    console.log('ReservasComponent - servicioSeleccionado', this.servicioSeleccionado);
  }
  seleccionarSubservicio(subservicio: string): any {
    console.log('ReservasComponent - seleccionarSubservicio()', subservicio);
  }
}