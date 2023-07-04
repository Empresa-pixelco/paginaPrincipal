export interface Horario {
    hora: string;
    enable: boolean;
    codigoCita: string;
  }
  
export interface Dia {
dia: number;
horarios: Horario[];
}

export interface Calendario {
id: string;
codigoSucursal: string;
codigoStaff: string;
anio: string;
mes: string;
dias: Dia[];
}