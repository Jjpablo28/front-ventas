import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private baseUrl = 'https://api-colombia.com/api/v1/Department?sortBy=name&sortDirection=asc';
  private baseMun='https://api-colombia.com/api/v1/City?sortBy=name&sortDirection=asc'
  constructor(private http: HttpClient) {}


  getDepartamentosNames() {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(res => res.map(item => item.name))
    );
  }
  getMunicipiosNames() {
    return this.http.get<any[]>(this.baseMun).pipe(
      map(res => res.map(item => item.name))
    );
  }







}
