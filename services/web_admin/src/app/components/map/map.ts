import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/assets/leaflet/marker-icon-2x.png',
  iconUrl: '/assets/leaflet/marker-icon.png',
  shadowUrl: '/assets/leaflet/marker-shadow.png'
});

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.html',
  styleUrls: ['./map.css'],
})

export class MapComponent implements AfterViewInit {
  private map!: L.Map;

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([45.4642, 9.19], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.loadAirports();
  }

  private loadAirports(): void {
    const url = `${environment.apiUrl}/api/navigate/airports/`;

    // Set map bounds
    const southWest = L.latLng(-60, -170);
    const northEast = L.latLng(85, 190);
    const bounds = L.latLngBounds(southWest, northEast);

    this.map.setMaxBounds(bounds);
    this.map.on('drag', () => {
      this.map.panInsideBounds(bounds, { animate: false });
    });
    this.map.options.minZoom = 2;
    this.http.get<any>(url).subscribe({
      next: (response) => {
        if (response.airports) {
          response.airports.forEach((airport: any) => {
            if (airport.lat && airport.lan) {
              const localTime = new Date().toLocaleTimeString('en-US', {
                timeZone: airport.time_zone,
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit',
                hour12: false
              });
              L.marker([airport.lat, airport.lan])
                .addTo(this.map)
                .bindPopup(`<b>${airport.name}</b><br>${airport.city}, ${airport.country}<br> ${airport.time_zone}<br>Local Time: ${localTime}`);
            }
          });
        }
      },
      error: (err) => {
        console.error('Failed to load airports:', err);
      }
    });
  }
}