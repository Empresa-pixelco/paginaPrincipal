export function validarRutNumeros(rut: string): boolean {
    if (!/^(\d{1,8})-(\d{1}|[kK])$/.test(rut)) {
      return false; // Formato incorrecto
    }
  
    const [rutSinDv, dv] = rut.split('-');
    const digitosRut = rutSinDv.split('');
  
    return digitosRut.every(digito => /^\d+$/.test(digito));
  }
  
  

