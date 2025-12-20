import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 

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

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

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

  logout() {
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/comunal-admin-login']).then(() => window.location.reload());
  }

  goToEditZones() {
    this.router.navigate(['/edit-zones']);
  }

  goToDashboard() {
    this.router.navigate(['/comunal-admin-dashboard']);
  }

  isCurrentRoute(route: string): boolean {
    const current = this.router.url.split('?')[0].replace(/\/$/, '');
    const target = route.replace(/\/$/, '');
    if (target === '') return current === '';
    return current.startsWith(target);
  }
}
