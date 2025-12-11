import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PolygonService } from '../../services/polygon.service';


delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
  iconUrl: 'assets/leaflet/marker-icon.png',
  shadowUrl: 'assets/leaflet/marker-shadow.png'
});

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.html',
  styleUrls: ['./map.css'],
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  private zoneColors = [
    '#e53935', // rosso
    '#8e24aa', // viola
    '#3949ab', // blu
    '#00897b', // verde acqua
    '#43a047', // verde
    '#fbc02d', // giallo
    '#fb8c00', // arancione
    '#6d4c41', // marrone
    '#757575', // grigio
    '#d81b60', // rosa
  ];

  constructor(private http: HttpClient, private polygonService: PolygonService) { }

  ngAfterViewInit(): void {
    // Limiti geografici Italia: [SudOvest, NordEst]
    const italyBounds = L.latLngBounds(
      [36.0, 6.6],   // SudOvest: Sicilia
      [47.1, 18.5]   // NordEst: Alto Adige/Friuli
    );

    this.map = L.map('map', {
      maxBounds: italyBounds,         // Limita lo spostamento
      maxBoundsViscosity: 1.0,        // Rimbalzo ai bordi
      minZoom: 6,                     // Zoom minimo per non vedere il mondo intero
      maxZoom: 18                     // Zoom massimo
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.fitBounds(italyBounds);

    // Carica i poligoni dal backend e assegna un colore diverso a ciascuno
    this.polygonService.getAllPolygons().subscribe(polygons => {
      const bounds = L.latLngBounds([]);
      polygons.forEach((geometryData, idx) => {
        const color = this.zoneColors[idx % this.zoneColors.length];
        const geoJsonLayer = L.geoJSON(geometryData, {
      style: {
        color: color,
        weight: 2,
        opacity: 1,
        fillOpacity: 0.5
      }
      }).addTo(this.map);
        geoJsonLayer.bindPopup(`Zona ${idx + 1}`);
        // Estendi i bounds con quelli del poligono
        bounds.extend(geoJsonLayer.getBounds());
      });
      // Zoom automatico su tutte le zone del comune
      if (bounds.isValid()) {
        this.map.fitBounds(bounds.pad(0.1));
      }
    });
  }
}