import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://127.0.0.1:8000/api/productos/';
  private apiUrlCat = 'http://127.0.0.1:8000/api/lineasproducto/';

  constructor(private http: HttpClient) {
  }
  crearProducto(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
/* getProducto(): Observable<any> {
    return this.http.get(this.apiUrl);
  }*/
  getCategorias(): Observable<any> {
    return this.http.get(this.apiUrlCat);
  }
  updateProducto(id: number, data: any) {
    return this.http.put(`${this.apiUrl}${id}/`, data);
  }
  eliminarProducto(id: number) {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

}
