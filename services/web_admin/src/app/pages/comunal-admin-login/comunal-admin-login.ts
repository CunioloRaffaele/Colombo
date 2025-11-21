import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Componente per la pagina di comunal-admin-login.
 * Gestisce il form di accesso, la comunicazione con il server per l'autenticazione
 * e il reindirizzamento dell'utente in base al ruolo.
 */
@Component({
  selector: 'app-comunal-admin-login', 
  standalone: true,
  templateUrl: './comunal-admin-login.html',
  styleUrls: ['./comunal-admin-login.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class ComunalAdminLogin {
  // FormGroup per gestire i dati del form di comunal-admin-login e la loro validazione.
  loginForm: FormGroup;
  // Flag per indicare se è in corso un'operazione di comunal-admin-login.
  loading = false;
  // Messaggio di errore da visualizzare in caso di fallimento del comunal-admin-login.
  error: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    // Inizializzazione del form con i campi 'email' and 'password' e i relativi validatori.
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * Estrae il ruolo dell'utente dal payload di un token JWT.
   * @param token Il token JWT da cui estrarre il ruolo.
   * @returns Il ruolo come numero, o null se il token non è valido.
   */
  private getTypeFromToken(token: string): string | null {
    try {
      // Decodifica la parte del payload (la seconda parte del token)
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.type;
    } catch {
      // Ritorna null se si verifica un errore durante la decodifica.
      return null;
    }
  }

  /**
   * Gestisce il submit del form di comunal-admin-login.
   * Invia le credenziali al server e gestisce la risposta.
   */
  onLogin() {
    // Interrompe l'esecuzione se il form non è valido.
    if (this.loginForm.invalid) return;

    // Imposta lo stato di caricamento e resetta gli errori.
    this.loading = true;
    this.error = null;

    // Estrae i valori di email e password dal form.
    const { email, password } = this.loginForm.value;

    // Esegue la richiesta POST al server per il comunal-admin-login.
    this.http.post<{ message: string, token: string }>(
      `${environment.apiUrl}auth/login/comune`,
      { email, password }
    ).subscribe({
      // Gestione della risposta in caso di successo.
      next: (res) => {
        // Salva il token JWT nel localStorage.
        localStorage.setItem('jwt_token', res.token);
        this.loading = false;

        // Estrae il tipo dal token e reindirizza l'utente.
        const type = this.getTypeFromToken(res.token);
        if (type === 'comune') {  // Se il tipo è 1 (admin)
          this.router.navigate(['/comunal-admin-dashboard']);
        }
      },
      // Gestione della risposta in caso di errore.
      error: (err) => {
        this.error = err?.error?.message || 'Errore di comunicazione con il server';
        this.loading = false;
      }
    });
  }
}
