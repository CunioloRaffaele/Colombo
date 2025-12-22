import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

/**
 * Servizio per la gestione dei dati geografici delle zone.
 * Si occupa di recuperare ID e geometrie dal backend.
 */
@Injectable({ providedIn: 'root' })
export class PolygonService {
  constructor(private http: HttpClient) {}

  /**
   * Recupera la lista degli ID di tutte le zone associate al comune loggato.
   * @returns {Observable<number[]>} Un Observable che emette un array di ID numerici.
   */
  getZoneIds(): Observable<number[]> {
    const token = localStorage.getItem('jwt_token');
    return this.http.get<{ ids: number[] }>(
      `${environment.apiUrl}zones/ids`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    ).pipe(
      map(res => res.ids)
    );
  }

  /**
   * Recupera la geometria specifica (coordinate GeoJSON) per una data zona.
   * @param id - L'ID della zona.
   * @returns {Observable<any>} Un Observable con l'oggetto geometria.
   */
  getZoneGeometry(id: number): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    return this.http.get<{ geometry: any }>(
      `${environment.apiUrl}zones/geometry/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    ).pipe(
      map(res => res.geometry)
    );
  }

  /**
   * Recupera tutte le zone complete (ID + Geometria) in un'unica chiamata logica.
   * Utilizza `switchMap` e `forkJoin` per effettuare chiamate parallele per ogni ID trovato.
   * 
   * @returns {Observable<any[]>} Un array di oggetti contenenti ID e geometria per tutte le zone.
   */
  getAllPolygons(): Observable<any[]> {
    return this.getZoneIds().pipe(
      map(ids => ids || []),
      switchMap(ids =>
        ids.length
          ? forkJoin(
              ids.map(id =>
                this.getZoneGeometry(id).pipe(
                  map(geometry => ({
                    id,         
                    ...geometry 
                  }))
                )
              )
            )
          : of([])
      )
    );
  }
}