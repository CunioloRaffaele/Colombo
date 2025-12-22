import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../../components/map/map';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

declare var L: any;

@Component({
  selector: 'app-edit-zones',
  imports: [CommonModule, MapComponent, ToolbarComponent, MatIcon, MatButtonModule],
  templateUrl: './edit-zones.html',
  styleUrl: './edit-zones.css',
})
export class EditZones implements AfterViewInit {
  @ViewChild(MapComponent) mapComponent?: MapComponent;

  constructor(public http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // Forza il rilevamento dei cambiamenti dopo che ViewChild è inizializzato
    this.cdr.detectChanges();
  }

  saveZone() {
    this.mapComponent?.saveZone();
  }

  removeDrawnPolygon(index: number) {
    const layer = this.mapComponent?.drawnPolygonLayers[index];
    const marker = this.mapComponent?.labelMarkers[index];
    if (layer && this.mapComponent) {
      this.mapComponent.removePolygonLayer(layer);
      this.mapComponent.drawnPolygonLayers.splice(index, 1);
      this.mapComponent.drawnPolygons.splice(index, 1);
      if (marker) {
        marker.remove();
        this.mapComponent.labelMarkers.splice(index, 1);
      }
      // Aggiorna drawnCoordinates solo se mapComponent esiste
      if (this.mapComponent.drawnPolygons.length) {
        this.mapComponent.drawnCoordinates = this.mapComponent.drawnPolygons[this.mapComponent.drawnPolygons.length - 1];
      } else {
        this.mapComponent.drawnCoordinates = [];
      }
      // Aggiorna i numeri delle label
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

  get hasDrawnPolygons(): boolean {
    return !!this.mapComponent?.drawnPolygons?.length;
  }
}
