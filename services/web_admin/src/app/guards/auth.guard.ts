import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard di autenticazione.
 * Protegge le rotte che richiedono un utente loggato.
 * Se l'utente non è autenticato (token mancante), viene reindirizzato alla pagina di login.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  // Se non è loggato, reindirizza al login
  return router.createUrlTree(['/comunal-admin-login']);
};