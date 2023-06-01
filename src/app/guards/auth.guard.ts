import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.checkAuthentication()) {
    return true; // El usuario tiene permiso para activar la ruta
  } else {
    // El usuario no está autenticado, redirigir al componente de inicio de sesión
    router.navigate(['login']);
    return false;
  }
};
