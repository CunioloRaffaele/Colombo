import { Component } from '@angular/core';

import { MapComponent } from '../../components/map/map';

@Component({
  selector: 'app-comunal-admin-dashboard',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './comunal-admin-dashboard.html',
  styleUrl: './comunal-admin-dashboard.css',
})
export class ComunalAdminDashboard {

}
