// horario.model.ts
export interface Horario {
    dia: string;
    hora: string;
    estado: string;
  }
export interface HorarioAsignado {
    dia: string;
    hora: string;
    estado: string;
    detalle: string;
  }

export interface Veterinario {
  nombre: string;
  horarios: string;
  }
