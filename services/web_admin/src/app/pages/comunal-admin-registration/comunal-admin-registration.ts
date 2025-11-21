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

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router 
  ) {
    this.registrationForm = this.fb.group({
      nome: ['', Validators.required],
      provincia: ['', Validators.required],
      regione: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  private getTypeFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.type;
    } catch {
      return null;
    }
  }

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
        const type = this.getTypeFromToken(res.token);
        this.loading = false;
        if (type === 'comune') {
          this.router.navigate(['/comunal-admin-dashboard']);
        }
      },
      error: (err) => {
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
