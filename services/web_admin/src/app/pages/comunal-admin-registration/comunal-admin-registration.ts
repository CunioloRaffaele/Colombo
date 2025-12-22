import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Componente per la pagina di registrazione dell'amministratore comunale.
 * Gestisce il form di registrazione, la validazione dei dati, la comunicazione con il server
 * per la creazione del nuovo account e il reindirizzamento post-registrazione.
 */
@Component({
  selector: 'app-comunal-admin-registration',
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
  ],
  templateUrl: './comunal-admin-registration.html',
  styleUrl: './comunal-admin-registration.css',
})
export class ComunalAdminRegistration {
  registrationForm: FormGroup;
  loading = false;
  error: string | null = null;
  success: string | null = null;
  hidePassword = true;

  /**
   * Costruttore del componente.
   * Inizializza il form di registrazione con i campi richiesti (comune, email, password)
   * e i relativi validatori (required, email, minLength).
   */
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.registrationForm = this.fb.group({
      comune: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Gestisce l'invio del form di registrazione.
   * 1. Verifica la validità del form.
   * 2. Invia una richiesta POST all'endpoint di registrazione.
   * 3. In caso di successo: salva il token, verifica il tipo utente e reindirizza alla dashboard.
   * 4. In caso di errore: gestisce e visualizza il messaggio di errore appropriato (parsing errori server).
   */
  onRegister() {
    if (this.registrationForm.invalid) return;
    this.loading = true;
    this.error = null;
    this.success = null;

    const endpoint = `${environment.apiUrl}auth/comune`;
    this.http.post<{ message: string, token: string }>(
      endpoint,
      this.registrationForm.value
    ).subscribe({
      next: (res) => {
        localStorage.setItem('jwt_token', res.token);
        
        // Usa il metodo del servizio per verificare il tipo utente
        const type = this.authService.getTypeFromToken(res.token);
        
        this.loading = false;
        if (type === 'comune') {
          this.router.navigate(['/comunal-admin-dashboard']);
        }
      },
      error: (err) => {
        // Logica complessa per gestire diversi formati di errore restituiti dal backend
        if (err.error) {
          if (typeof err.error === 'string') {
            try {
              const parsed = JSON.parse(err.error);
              this.error = parsed.message || parsed.error || 'Errore durante la registrazione';
            } catch {
              this.error = err.error;
            }
          } else if (typeof err.error === 'object') {
            this.error = err.error.message || err.error.error || 'Errore durante la registrazione';
          } else {
            this.error = 'Errore durante la registrazione';
          }
        } else if (err.message) {
          this.error = err.message;
        } else {
          this.error = 'Errore di comunicazione con il server';
        }
        this.loading = false;
      }
    });
  }
}
