import { Routes } from '@angular/router';
import { ComunalAdminLogin } from './pages/comunal-admin-login/comunal-admin-login';
import { ComunalAdminDashboard } from './pages/comunal-admin-dashboard/comunal-admin-dashboard';
import { ComunalAdminRegistration } from './pages/comunal-admin-registration/comunal-admin-registration';
import { EditZones } from './pages/edit-zones/edit-zones';
import { authGuard } from './guards/auth.guard'; 

/**
 * Definizione delle rotte dell'applicazione.
 * Configura la navigazione tra le pagine di login, registrazione, dashboard e modifica zone.
 * Applica la `authGuard` alle rotte protette.
 */
export const routes: Routes = [
  // Reindirizzamento di default al login
  { path: '', redirectTo: 'comunal-admin-login', pathMatch: 'full' },
  
  // Pagine pubbliche
  { path: 'comunal-admin-login', component: ComunalAdminLogin },
  { path: 'comunal-admin-registration', component: ComunalAdminRegistration },
  
  // Pagine protette (richiedono autenticazione)
  { 
    path: 'comunal-admin-dashboard', 
    component: ComunalAdminDashboard,
    canActivate: [authGuard] 
  },
  { 
    path: 'edit-zones', 
    component: EditZones,
    canActivate: [authGuard] 
  }
];
