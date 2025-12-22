import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MapComponent } from '../../components/map/map';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatSelectModule } from '@angular/material/select'; 
import { HttpClient } from '@angular/common/http';

// Dichiarazione necessaria per l'uso di Leaflet globale
declare var L: any;

/**
 * Pagina per la creazione di nuove zone.
 * Contiene la mappa in modalità disegno e una sidebar per gestire i poligoni creati.
 */
@Component({
  selector: 'app-edit-zones',
  imports: [
    CommonModule, 
    FormsModule, 
    MapComponent, 
    ToolbarComponent, 
    MatIcon, 
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule 
  ],
  templateUrl: './edit-zones.html',
  styleUrl: './edit-zones.css',
})
export class EditZones implements AfterViewInit {
  @ViewChild(MapComponent) mapComponent?: MapComponent;

  // Lista delle tipologie disponibili
  zoneTypes = [
    'centro storico',
    'commerciale',
    'generica',
    'industriale',
    'residenziale'
  ];

  constructor(public http: HttpClient, private cdr: ChangeDetectorRef) {}

  /**
   * Lifecycle hook post-inizializzazione view.
   * Forza il rilevamento dei cambiamenti per evitare l'errore ExpressionChangedAfterItHasBeenCheckedError
   * quando si accede alle proprietà del figlio (MapComponent).
   */
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  /**
   * Salva tutte le zone disegnate chiamando il metodo del componente mappa.
   */
  saveZone() {
    this.mapComponent?.saveZone();
  }

  /**
   * Rimuove un poligono specifico dalla lista dei poligoni disegnati (non ancora salvati).
   * Aggiorna anche i marker numerati sulla mappa per mantenere la sequenza corretta.
   * 
   * @param index - L'indice del poligono nell'array drawnPolygons.
   */
  removeDrawnPolygon(index: number) {
    const layer = this.mapComponent?.drawnPolygonLayers[index];
    const marker = this.mapComponent?.labelMarkers[index];
    
    if (layer && this.mapComponent) {
      // Rimuove graficamente layer e marker
      this.mapComponent.removePolygonLayer(layer);
      if (marker) {
        marker.remove();
      }

      // Rimuove i dati dagli array
      this.mapComponent.drawnPolygonLayers.splice(index, 1);
      this.mapComponent.drawnPolygons.splice(index, 1);
      this.mapComponent.drawnPolygonTypes.splice(index, 1); 
      this.mapComponent.labelMarkers.splice(index, 1);

      // Aggiorna le coordinate correnti (opzionale, per debug)
      if (this.mapComponent.drawnPolygons.length) {
        this.mapComponent.drawnCoordinates = this.mapComponent.drawnPolygons[this.mapComponent.drawnPolygons.length - 1];
      } else {
        this.mapComponent.drawnCoordinates = [];
      }
      
      // Ricalcola e ridisegna i numeri dei marker rimanenti
      this.mapComponent.labelMarkers.forEach((m, i) => {
        m.setIcon(L.divIcon({
          className: 'polygon-label',
          html: `<div>${i + 1}</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        }));
      });
    }
  }

  /**
   * Getter per verificare se ci sono poligoni disegnati.
   * Utile per abilitare/disabilitare il pulsante di salvataggio.
   */
  get hasDrawnPolygons(): boolean {
    return !!this.mapComponent?.drawnPolygons?.length;
  }

  /**
   * Verifica se tutti i poligoni hanno una tipologia selezionata.
   */
  get isFormValid(): boolean {
    if (!this.hasDrawnPolygons) return false;
    // Controlla se esiste almeno una stringa vuota nell'array delle tipologie
    return !this.mapComponent?.drawnPolygonTypes.some(t => t === '');
  }
}
