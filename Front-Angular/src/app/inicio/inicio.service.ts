import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InicioService {
  constructor(private http: HttpClient) {}
  private apiUrl :string = 'https://sistema-de-ventas-uumw.onrender.com/api/lineasproducto/';

  getLineas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
