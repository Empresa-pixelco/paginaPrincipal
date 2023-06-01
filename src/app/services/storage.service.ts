import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private datosPaciente: any | undefined;
  private nombreServicio: string | undefined;
  private veterinario: string | undefined;
  private horaSelecionada: string | undefined;
  // Agrega otras variables privadas para almacenar los datos de las otras vistas

  constructor() {}

  setDatosPaciente(datos: any): void {
    this.datosPaciente = datos;
    console.log(this.datosPaciente)
  }

  getDatosPaciente(): any {
    return this.datosPaciente;
    console.log(this.datosPaciente)
  }

  setnombreServicioSeleccionado(servicio: string): void {
    this.nombreServicio = servicio;
    console.log(this.nombreServicio)
  }

  getnombreServicioSeleccionado(): any {
    return this.nombreServicio;
  }

  setnombreVeterinarioSeleccionado(veterinario: string): void {
    this.veterinario = veterinario;
    console.log(this.nombreServicio)
  }

  getnombreVeterinarioSeleccionado(): any {
    return this.veterinario;
  }

  setHoraSeleccionado(hora: string): void {
    this.horaSelecionada = hora;
    console.log(this.nombreServicio)
  }

  getHoraSeleccionado(): any {
    return this.horaSelecionada;
  }



}
