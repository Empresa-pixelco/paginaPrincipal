import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuardVet = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.checkAuthenticationVet()) {
    return true; // El usuario tiene permiso para activar la ruta
  } else {
    // El usuario no está autenticado, redirigir al componente de inicio de sesión
    router.navigate(['loginVet']);
    return false;
  }
};
