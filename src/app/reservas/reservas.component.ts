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
  codigoCategoriaSeleccionado: string | undefined; // Variable para almacenar el codigoCategoria seleccionado
 
  constructor(private router: Router, private authService: AuthService) { }
 
  ngOnInit() {
    this.authService.servicios().then((data: Categoria) => {
      const categorias = data.categorias;
      console.log(categorias)
      this.tsservicios = categorias.map((categoria) => {
        const subservicios = categoria.servicios || [];
        return {
          nombre: categoria.nombre,
          codigoCategoria : categoria.codigoCategoria,
          servicios: subservicios,           
        };
      });
    });
}
  continuar() { 
    this.router.navigate(['veterinario-service'],{
      queryParams: { codigoCategoria: this.codigoCategoriaSeleccionado }, // Pasa el parámetro como queryParams
    });
  }
  servicioSeleccionado: number = -1;

  toggleSubservicios(servicio: number, codigoCategoria: any): void {
    console.log('ReservasComponent - toggleSubservicios()', servicio);
    this.codigoCategoriaSeleccionado =   codigoCategoria
    console.log(this.codigoCategoriaSeleccionado)
  
    if (this.servicioSeleccionado === servicio) {
      this.servicioSeleccionado = -1;
    } else {
      this.servicioSeleccionado = servicio;
    }
    console.log('ReservasComponent - servicioSeleccionado', this.servicioSeleccionado);
  }
  seleccionarSubservicio(subservicio: string): any {
    console.log('ReservasComponent - seleccionarSubservicio()', subservicio);
    // console.log('ReservasComponent - codigoCategoria', codigoCategoria);
    // this.codigoCategoriaSeleccionado = codigoCategoria; // Guardar el codigoCategoria seleccionado
    // console.log(this.codigoCategoriaSeleccionado)
  }
}