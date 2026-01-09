import { Component, AfterViewInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PolygonService } from '../../services/polygon.service';

// Dichiarazione globale per Leaflet caricato via script esterno (per compatibilità con Leaflet Draw)
declare var L: any;

/**
 * Componente Mappa.
 * Gestisce la visualizzazione delle zone esistenti e, se abilitato, il disegno di nuove zone.
 * Utilizza Leaflet e Leaflet Draw.
 */
@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.html',
  styleUrls: ['./map.css'],
})
export class MapComponent implements AfterViewInit {
  /** Abilita o disabilita gli strumenti di disegno (matita, poligono). */
  @Input() enableDrawing = false;

  private map!: any; 
  
  // Palette di colori per distinguere visivamente le diverse zone
  private zoneColors = [
    '#e53935', '#8e24aa', '#3949ab', '#00897b', '#43a047', 
    '#fbc02d', '#fb8c00', '#6d4c41', '#757575', '#d81b60',
  ];

  // Riferimenti ai layer per poterli rimuovere o manipolare
  private polygonsLayers: any[] = []; 
  
  /** Coordinate dell'ultimo poligono disegnato (per debug o uso esterno). */
  drawnCoordinates: number[][] = [];
  
  /** Lista di tutti i poligoni disegnati nella sessione corrente (non ancora salvati). */
  drawnPolygons: number[][][] = [];
  
  /** Lista delle tipologie associate ai poligoni disegnati. */
  drawnPolygonTypes: string[] = []; // 

  /** Layer grafici dei poligoni disegnati. */
  drawnPolygonLayers: any[] = []; 
  
  /** Marker numerati che indicano l'ordine dei poligoni disegnati. */
  labelMarkers: any[] = []; 

  constructor(private http: HttpClient, private polygonService: PolygonService) { }

  /**
   * Inizializza la mappa dopo che la view è stata renderizzata.
   * Imposta i tile, i limiti geografici (Italia) e i controlli di disegno.
   */
  ngAfterViewInit(): void {
    // Limiti geografici Italia: [SudOvest, NordEst]
    const italyBounds = L.latLngBounds(
      [36.0, 6.6],   // SudOvest: Sicilia
      [47.1, 18.5]   // NordEst: Alto Adige/Friuli
    );

    this.map = L.map('map', {
      maxBounds: italyBounds,         
      maxBoundsViscosity: 1.0,        
      minZoom: 6,                     
      maxZoom: 18                     
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.fitBounds(italyBounds);

    // Carica i poligoni esistenti dal backend
    this.loadPolygons();

    // Configurazione Leaflet Draw (solo se enableDrawing è true)
    if (this.enableDrawing) {
      const drawControl = new L.Control.Draw({
        draw: {
          polygon: {}, // Abilita solo il disegno di poligoni
          marker: false,
          polyline: false,
          rectangle: false,
          circle: false,
          circlemarker: false
        },
        edit: false // Disabilita l'editing diretto (gestito tramite cancellazione)
      });
      this.map.addControl(drawControl);

      // Gestione evento: Poligono creato
      this.map.on(L.Draw.Event.CREATED, (event: any) => {
        const layer = event.layer;
        this.map.addLayer(layer);

        // Estrae le coordinate e le converte in formato array semplice
        const latlngs = layer.getLatLngs()[0];
        const polygon = latlngs.map((latlng: any) => [latlng.lat, latlng.lng]); 
        
        this.drawnPolygons.push(polygon);
        this.drawnPolygonTypes.push(''); 
        this.drawnPolygonLayers.push(layer);

        // Aggiunge un marker numerato al centro del poligono
        const center = layer.getBounds().getCenter();
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
   * Recupera i poligoni dal servizio e li renderizza sulla mappa.
   * Aggiunge anche un popup interattivo che mostra i dati (Ecoscore, PM, CO2) al click.
   */
  loadPolygons() {
    // Pulisce i layer esistenti prima di ricaricare
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

        // Gestione click sul poligono per mostrare i dettagli
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
      
      // Adatta lo zoom per mostrare tutti i poligoni
      if (bounds.isValid()) {
        this.map.fitBounds(bounds.pad(0.1));
      }
    });
  }

  /**
   * Ricarica i poligoni (wrapper pubblico per loadPolygons).
   * Utile per aggiornare la mappa dopo una cancellazione o modifica esterna.
   */
  reloadPolygons() {
    this.loadPolygons();
  }

  /**
   * Invia al backend tutti i poligoni disegnati nella sessione corrente.
   * Effettua una chiamata POST per ogni poligono nell'array `drawnPolygons`.
   */
  saveZone() {
    const token = localStorage.getItem('jwt_token');
    const headers = { Authorization: `Bearer ${token}` };

    // Validazione: controlla se ci sono tipologie non selezionate
    if (this.drawnPolygonTypes.some(type => !type)) {
      alert('Attenzione: Seleziona la tipologia per tutte le zone prima di salvare.');
      return;
    }

    this.drawnPolygons.forEach((polygon, index) => {      
      // Recupera la tipologia selezionata per questo poligono
      const tipologia = this.drawnPolygonTypes[index];

      const body = {
        coordinates: polygon,
        tipologia: tipologia 
      };
      
      this.http.post(
        `${environment.apiUrl}zones`,
        body,
        { headers }
      ).subscribe({
        next: () => {
          // Successo
          console.log(`Zona ${index + 1} salvata come ${tipologia}`);
        },
        error: () => {
          console.error('Errore salvataggio zona');
        }
      });
    });

  }

  /**
   * Rimuove un layer specifico dalla mappa.
   * @param layer - Il layer Leaflet da rimuovere.
   */
  removePolygonLayer(layer: any) { 
    this.map.removeLayer(layer);
  }
}