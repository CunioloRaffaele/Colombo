import { Routes } from '@angular/router';
import { ComunalAdminLogin } from './pages/comunal-admin-login/comunal-admin-login';
import { ComunalAdminDashboard } from './pages/comunal-admin-dashboard/comunal-admin-dashboard';
import { ComunalAdminRegistration } from './pages/comunal-admin-registration/comunal-admin-registration';


export const routes: Routes = [
  { path: '', redirectTo: 'comunal-admin-login', pathMatch: 'full' },
  { path: 'comunal-admin-login', component: ComunalAdminLogin },
  { path: 'comunal-admin-registration', component: ComunalAdminRegistration },
  { path: 'comunal-admin-dashboard', component: ComunalAdminDashboard },
];
