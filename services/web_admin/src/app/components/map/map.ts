import { Component, AfterViewInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PolygonService } from '../../services/polygon.service';

declare var L: any;

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.html',
  styleUrls: ['./map.css'],
})
export class MapComponent implements AfterViewInit {
  @Input() enableDrawing = false;

  private map!: any; // Sostituisci L.Map con any
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
  private polygonsLayers: any[] = []; // Sostituisci L.Layer[] con any[]
  drawnCoordinates: number[][] = [];
  drawnPolygons: number[][][] = [];
  drawnPolygonLayers: any[] = []; // Sostituisci L.Layer[] con any[]
  labelMarkers: any[] = []; // Sostituisci L.Marker[] con any[]

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
    this.loadPolygons();

    // Aggiungi il controllo di disegno solo se abilitato
    if (this.enableDrawing) {
      const drawControl = new L.Control.Draw({
        draw: {
          polygon: {},
          marker: false,
          polyline: false,
          rectangle: false,
          circle: false,
          circlemarker: false
        }
      });
      this.map.addControl(drawControl);

      this.map.on(L.Draw.Event.CREATED, (event: any) => {
        const layer = event.layer;
        this.map.addLayer(layer);

        const latlngs = layer.getLatLngs()[0];
        const polygon = latlngs.map((latlng: any) => [latlng.lat, latlng.lng]); // Sostituisci L.LatLng con any
        this.drawnPolygons.push(polygon);
        this.drawnPolygonLayers.push(layer);

        // Calcola il centroide del poligono
        const center = layer.getBounds().getCenter();

        // Crea un marker con il numero del poligono
        const labelNumber = this.drawnPolygons.length;
        const labelMarker = L.marker(center, {
          icon: L.divIcon({
            className: 'polygon-label',
            html: `<div>${labelNumber}</div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          }),
          interactive: false
        }).addTo(this.map);

        this.labelMarkers.push(labelMarker);

        this.drawnCoordinates = polygon;
      });
    }
  }

  /**
   * Carica e visualizza i poligoni delle zone sulla mappa.
   */
  loadPolygons() {
    // Rimuovi i poligoni esistenti
    this.polygonsLayers.forEach(layer => this.map.removeLayer(layer));
    this.polygonsLayers = [];

    this.polygonService.getAllPolygons().subscribe(polygons => {
      const bounds = L.latLngBounds([]);
      polygons.forEach((geometryData, idx) => {
        const color = this.zoneColors[idx % this.zoneColors.length];
        const zoneId = geometryData.id; 
        const geoJsonLayer = L.geoJSON(geometryData, {
          style: {
            color: color,
            weight: 2,
            opacity: 1,
            fillOpacity: 0.5
          }
        }).addTo(this.map);

        this.polygonsLayers.push(geoJsonLayer);

        geoJsonLayer.on('click', () => {
          const token = localStorage.getItem('jwt_token');
          this.http.get<any>(
            `${environment.apiUrl}reports/comune/${zoneId}/summary`,
            { headers: { Authorization: `Bearer ${token}` } }
          ).subscribe({
            next: (data) => {
              geoJsonLayer.bindPopup(
                `<b>Zona ${idx + 1}</b><br>
                Ecoscore: ${data.ecoscore === -1 ? 'Valore non disponibile' : data.ecoscore?.toFixed(1)}<br>
                PM: ${data.pm === 0 ? 'Valore non disponibile' : data.pm?.toFixed(2)}<br>
                CO₂: ${data.co2 === 0 ? 'Valore non disponibile' : data.co2?.toFixed(2)}`
              ).openPopup();
            },
            error: () => {
              geoJsonLayer.bindPopup('Errore nel recupero dei dati').openPopup();
            }
          });
        });

        bounds.extend(geoJsonLayer.getBounds());
      });
      if (bounds.isValid()) {
        this.map.fitBounds(bounds.pad(0.1));
      }
    });
  }

  /**
   * Metodo pubblico per ricaricare i poligoni (usato dalla dashboard).
   */
  reloadPolygons() {
    this.loadPolygons();
  }

  // Metodo per inviare il poligono al backend
  saveZone() {
    const token = localStorage.getItem('jwt_token');
    const headers = { Authorization: `Bearer ${token}` };

    // Per ogni poligono disegnato, invia una richiesta POST separata
    this.drawnPolygons.forEach(polygon => {
      const geoJsonCoords = polygon.map(([lat, lng]) => [lng, lat]);
      const body = {
        coordinates: geoJsonCoords,
        tipologia: 'generica'
      };
      this.http.post(
        `${environment.apiUrl}zones`,
        body,
        { headers }
      ).subscribe({
        next: () => {
          // Puoi aggiungere qui una notifica di successo per ogni poligono
        },
        error: () => {
          // Puoi aggiungere qui una notifica di errore per ogni poligono
        }
      });
    });
  }

  removePolygonLayer(layer: any) { // Sostituisci L.Layer con any
    this.map.removeLayer(layer);
  }
}