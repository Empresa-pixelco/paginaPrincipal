export interface Veterinarios{
    id: string;
    nombre: string;
    sucursales: string[];
    };
export interface VeterinariosResponse {
    veterinarios: Veterinarios[];
}

