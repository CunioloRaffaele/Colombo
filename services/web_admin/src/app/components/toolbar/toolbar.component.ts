import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 

/**
 * Componente Toolbar (barra di navigazione superiore).
 * Gestisce la visualizzazione del logo, del menu utente e dei pulsanti di navigazione contestuali.
 */
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule, 
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  constructor(public router: Router) {}

  /**
   * Verifica se l'utente è loggato controllando la presenza del token.
   * Utilizzato per mostrare/nascondere elementi della UI.
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

  /**
   * Recupera il nome da visualizzare nella toolbar decodificando il token JWT.
   * Supporta diversi tipi di payload (airlineName, name, email).
   * @returns {string | null} Il nome da visualizzare o null se non disponibile.
   */
  getComunalName(): string | null {
    const token = localStorage.getItem('jwt_token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Per airline, mostra il nome compagnia
      if (payload.airlineName) return payload.airlineName;
      // Per admin/utente comunal
      return payload.name || payload.email || null;
    } catch {
      return null;
    }
  }

  /**
   * Effettua il logout dell'utente.
   * Rimuove il token dal localStorage, reindirizza al login e ricarica la pagina per pulire lo stato.
   */
  logout() {
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/comunal-admin-login']).then(() => window.location.reload());
  }

  /** Naviga alla pagina di modifica delle zone. */
  goToEditZones() {
    this.router.navigate(['/edit-zones']);
  }

  /** Naviga alla dashboard principale. */
  goToDashboard() {
    this.router.navigate(['/comunal-admin-dashboard']);
  }

  /**
   * Verifica se la rotta corrente corrisponde a quella passata come parametro.
   * Utile per mostrare pulsanti contestuali (es. "Torna alla Dashboard" solo se non sei già lì).
   * @param route - La rotta da verificare.
   */
  isCurrentRoute(route: string): boolean {
    const current = this.router.url.split('?')[0].replace(/\/$/, '');
    const target = route.replace(/\/$/, '');
    if (target === '') return current === '';
    return current.startsWith(target);
  }
}
