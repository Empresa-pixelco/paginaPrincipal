import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../interfaces/categorias.model';
import { Veterinarios} from '../interfaces/veterinarios.model';
import { Veterinario } from '../interfaces/veterinario.model';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-veterinario-service',
  templateUrl: './veterinario-service.component.html',
  styleUrls: ['./veterinario-service.component.scss']
})
export class VeterinarioServiceComponent implements OnInit{
  tsveterinarios: any | undefined;
  codigoVeterinario: any | undefined;
  
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute, private dataStorageService: StorageService) { }

  async ngOnInit() {
        this.route.queryParams.subscribe( async params => {
          const codigoCategoria = params['codigoCategoria'];
          console.log('Código de categoría recibido:', codigoCategoria);

        const data: Veterinarios[] = await this.authService.staff(codigoCategoria);
        this.tsveterinarios = data
        console.log(this.tsveterinarios)    
        })
      }
  continuar() {
    this.router.navigate(['calendario'],{
      queryParams: { codigoCategoria: this.codigoVeterinario }, // Pasa el parámetro como queryParams
    });
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
  twotoggleSubservicios(nombre:string, veterinario: string): void{
    this.codigoVeterinario =  veterinario
    console.log(nombre)
    this.dataStorageService.setnombreVeterinarioSeleccionado(nombre)
  }
}