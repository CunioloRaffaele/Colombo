import { Injectable } from '@angular/core';

/**
 * Servizio per la gestione dell'autenticazione utente.
 * Gestisce la verifica del login e l'estrazione di informazioni dal token JWT.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Verifica se l'utente è attualmente loggato controllando la presenza del token.
   * @returns {boolean} true se il token è presente nel localStorage, false altrimenti.
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

  /**
   * Estrae il tipo di utente dal payload del token JWT.
   * Utile per reindirizzare l'utente alla dashboard corretta (es. 'comune', 'airline').
   * 
   * @param token - Il token JWT ricevuto dal server.
   * @returns {string | null} Il tipo di utente o null in caso di errore nel parsing.
   */
  getTypeFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.type;
    } catch {
      return null;
    }
  }

  /**
   * Estrae il codice ISTAT del comune dal token JWT.
   * Necessario per effettuare chiamate API specifiche per il comune loggato.
   * 
   * @param token - Il token JWT.
   * @returns {string | null} Il codice ISTAT o null se non presente/errore.
   */
  getIstatFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.comune;
    } catch {
      return null;
    }
  }
}