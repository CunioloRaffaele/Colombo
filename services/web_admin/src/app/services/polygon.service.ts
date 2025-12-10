import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PolygonService {
  constructor(private http: HttpClient) {}

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

  getAllPolygons(): Observable<any[]> {
    return this.getZoneIds().pipe(
      map(ids => ids || []),
      switchMap(ids => ids.length ? forkJoin(ids.map(id => this.getZoneGeometry(id))) : of([]))
    );
  }
}