import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private baseUrl = 'https://api-colombia.com/api/v1/Department?sortBy=name&sortDirection=asc';
  private baseMun='https://api-colombia.com/api/v1/City?sortBy=name&sortDirection=asc'
  private apiUrl :string = 'https://sistema-de-ventas-uumw.onrender.com/api/clientes/';
  constructor(private http: HttpClient) {}


  crearCliente(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getClientes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updateCliente(id: number, data: any) {
    return this.http.put(`${this.apiUrl}${id}/`, data);
  }

  eliminarCliente(id: number) {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }


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
