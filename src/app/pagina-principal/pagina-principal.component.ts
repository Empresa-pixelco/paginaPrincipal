import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.scss']
})
export class PaginaPrincipalComponent {

  sliceActual = 0; // Variable para llevar el registro del slice actual

  cambiarSlice(direccion: string) {
    if (direccion === 'anterior') {
      this.sliceActual = this.sliceActual > 0 ? this.sliceActual - 1 : 4; // Cambiar al slice anterior, asegurándose de no ser menor a 0
    } else if (direccion === 'siguiente') {
      this.sliceActual = this.sliceActual < 4 ? this.sliceActual + 1 : 0; // Cambiar al slice siguiente, asegurándose de no ser mayor a 4 (la cantidad total de slices)
    }
  }
}
