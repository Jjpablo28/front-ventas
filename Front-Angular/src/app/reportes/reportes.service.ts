import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'https://api-colombia.com/api/v1/Department?sortBy=name&sortDirection=asc';

  getDepartamentosNames() {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(res => res.map(item => item.name))
    );
  }
}
