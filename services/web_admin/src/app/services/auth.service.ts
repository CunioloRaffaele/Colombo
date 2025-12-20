import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Estrae il tipo di utente dal payload del token JWT.
   * @param token - Il token JWT ricevuto dal server
   * @returns Il tipo di utente (es. 'comune') o null in caso di errore nel parsing
   */
  getTypeFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.type;
    } catch {
      return null;
    }
  }

  getIstatFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.comune;
    } catch {
      return null;
    }
  }
}