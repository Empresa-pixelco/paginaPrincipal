// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     // Aquí puedes implementar la lógica de autenticación para verificar si el usuario tiene permiso para activar la ruta

//     // Ejemplo: Verificar si el usuario está autenticado
//     const isAuthenticated = /* Lógica para verificar la autenticación */

//     if (isAuthenticated) {
//       return true; // El usuario tiene permiso para activar la ruta
//     } else {
//       // El usuario no está autenticado, redirigir al componente de inicio de sesión
//       return this.router.createUrlTree(['/login']);
//     }
//   }
// }
