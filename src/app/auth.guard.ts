import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Verifica si el token de autenticación está presente en el localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Si el token está presente, permite el acceso
      return true;
    } else {
      // Si el token no está presente, redirige al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}

