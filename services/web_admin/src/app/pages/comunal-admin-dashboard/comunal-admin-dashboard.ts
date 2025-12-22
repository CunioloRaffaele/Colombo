import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MapComponent } from '../../components/map/map';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { PolygonService } from '../../services/polygon.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule, DecimalPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { J } from '@angular/cdk/keycodes';


/**
 * Dashboard principale per l'amministratore comunale.
 * Visualizza la mappa delle zone, l'ecoscore totale e la lista delle zone monitorate.
 */
@Component({
  selector: 'app-comunal-admin-dashboard',
  standalone: true,
  imports: [MapComponent, ToolbarComponent, CommonModule, DecimalPipe, MatIcon],
  templateUrl: './comunal-admin-dashboard.html',
  styleUrl: './comunal-admin-dashboard.css',
})
export class ComunalAdminDashboard implements OnInit, AfterViewInit {
  zones: any[] = [];
  loading = false;
  error: string | null = null;
  totalEcoscore: number | null = null;

  // Riferimento al componente mappa
  @ViewChild(MapComponent) mapComponent?: MapComponent;

  constructor(
    private polygonService: PolygonService,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadZonesWithData();
    this.loadTotalEcoscore();

    // Ricarica la mappa quando si naviga indietro verso la dashboard
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects.includes('comunal-admin-dashboard')) {
        setTimeout(() => {
          this.mapComponent?.reloadPolygons();
        });
      }
    });
  }

  ngAfterViewInit(): void {
    // Assicura che la mappa sia aggiornata dopo il rendering iniziale
    setTimeout(() => {
      this.mapComponent?.reloadPolygons();
    });
  }

  /**
   * Carica l'Ecoscore medio totale del comune.
   * Effettua una chiamata all'endpoint di reportistica.
   */
  loadTotalEcoscore() {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      this.totalEcoscore = null;
      return;
    }
    const istat = this.authService.getIstatFromToken(token);
    if (!istat) {
      this.totalEcoscore = null;
      return;
    }
    this.http.get<any>(
      `${environment.apiUrl}reports/comune/${istat}/ecoscore`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).subscribe({
      next: data => {
        this.totalEcoscore = data.ecoscore !== -1 ? data.ecoscore : null;
      },
      error: () => {
        this.totalEcoscore = null;
      }
    });
  }

  /**
   * Carica la lista delle zone e per ciascuna recupera i dati di dettaglio (PM, CO2, Ecoscore).
   * Utilizza Promise.all per attendere il completamento di tutte le richieste di dettaglio.
   */
  loadZonesWithData() {
    this.loading = true;
    this.error = null;
    this.polygonService.getZoneIds().subscribe({
      next: (ids) => {
        if (!ids || ids.length === 0) {
          this.zones = [];
          this.loading = false;
          return;
        }
        const token = localStorage.getItem('jwt_token');
        
        // Esegue chiamate parallele per ottenere i dettagli di ogni zona
        Promise.all(
          ids.map(id =>
            this.http.get<any>(
              `${environment.apiUrl}reports/comune/${id}/summary`,
              { headers: { Authorization: `Bearer ${token}` } }
            ).toPromise().then(data => ({
              id,
              ecoscore: data.ecoscore,
              pm: data.pm,
              co2: data.co2
            }))
          )
        ).then(zonesData => {
          this.zones = zonesData;
          this.loading = false;
        }).catch(err => {
          this.error = 'Errore nel caricamento delle zone';
          this.loading = false;
        });
      },
      error: () => {
        this.error = 'Errore nel caricamento degli ID delle zone';
        this.loading = false;
      }
    });
  }

  /**
   * Elimina una zona specifica.
   * Dopo l'eliminazione, aggiorna la lista locale e ricarica la mappa.
   * @param id - L'ID della zona da eliminare.
   */
  deleteZone(id: number) {
    const token = localStorage.getItem('jwt_token');
    this.loading = true;
    this.http.delete(
      `${environment.apiUrl}zones`,
      {
        headers: { Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      }
    ).subscribe({
      next: () => {
        this.zones = this.zones.filter(z => z.id !== id);
        if (this.mapComponent && typeof this.mapComponent.reloadPolygons === 'function') {
          this.mapComponent.reloadPolygons();
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Errore durante l\'eliminazione della zona';
        this.loading = false;
      }
    });
  }
}
