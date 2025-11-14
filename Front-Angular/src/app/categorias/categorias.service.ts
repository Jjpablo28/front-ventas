import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private apiUrl = 'https://sistema-de-ventas-uumw.onrender.com/api/lineasproducto/';


  constructor(private http: HttpClient) {
  }

  crearLinea(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getLineas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updateLinea(id: number, data: any) {
    return this.http.put(`${this.apiUrl}${id}/`, data);
  }

  eliminarLinea(id: number) {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
