import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private datosPaciente: any | undefined;
  private nombreServicio: string | undefined;
  private veterinario: string | undefined;
  private horaSelecionada: string | undefined;
  private token: string | undefined;
  private diaCita: string | undefined;
  private idTurno: string | undefined;
  private horarioServicio: any | undefined;
  // Agrega otras variables privadas para almacenar los datos de las otras vistas

  constructor() {}

  setDatosPaciente(datos: any): void {
    this.datosPaciente = datos;

  }

  getDatosPaciente(): any {
    return this.datosPaciente;

  }

  setnombreServicioSeleccionado(servicio: string): void {
    this.nombreServicio = servicio;

  }

  getnombreServicioSeleccionado(): any {
    return this.nombreServicio;
  }

  setnombreVeterinarioSeleccionado(veterinario: string): void {
    this.veterinario = veterinario;

  }

  getnombreVeterinarioSeleccionado(): any {
    return this.veterinario;
  }

  setHoraSeleccionado(hora: string): void {
    this.horaSelecionada = hora;

  }

  getHoraSeleccionado(): any {
    return this.horaSelecionada;
  }

  setDiaSeleccionado(dia: string): void {
    this.diaCita = dia;
  }

  getDiaSeleccionado(): any {
    return this.diaCita;
  }

  setTurnoSeleccionado(turno: string): void {
    this.idTurno = turno;
  }

  getTurnoSeleccionado(): any {
    return this.idTurno;
  }

  setHorarioServicioSeleccionado(horarioServicio:any): void {
    this.horarioServicio = horarioServicio;
  }

  getHorarioServicioSeleccionado(): any {
    return this.horarioServicio;
  }
}
