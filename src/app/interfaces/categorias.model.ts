export interface Categoria {
  codigoSucursal: string;
  categorias: {
    nombre: string;
    codigoCategoria: string;
    servicios: string[];
  }[];
}
  