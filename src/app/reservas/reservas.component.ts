import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Categoria } from '../interfaces/categorias.model';
@Component({
  standalone: true,
  imports: [CommonModule, IonicModule],
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss'],
})
export class ReservasComponent implements OnInit{
  tsservicios: any | undefined;

  
  constructor(private router: Router, private authService: AuthService) { }
  ngOnInit() {

    this.authService.staff().then((data: Categoria) =>{
      const primerCategoria = data.categorias[0];
      // console.log(primerCategoria)
      const servicios = primerCategoria.servicios;
      this.tsservicios = servicios.map((servicio, index) => ({ nombre: servicio, numero: index + 1 }));
      console.log(this.tsservicios)

      const subCategoria = data;
      console.log(subCategoria)

    })
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







