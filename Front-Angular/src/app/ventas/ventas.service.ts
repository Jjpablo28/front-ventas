import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private apiUrlDetalles = 'https://sistema-de-ventas-uumw.onrender.com/api/ventadetalles/';
  private apiUrlVenta = 'https://sistema-de-ventas-uumw.onrender.com/api/ventas/';
  private apiUrlProducto = 'https://sistema-de-ventas-uumw.onrender.com/api/productos/';
  private apiUrlCliente = 'https://sistema-de-ventas-uumw.onrender.com/api/clientes/';


  constructor(private http: HttpClient) {

  }

  crearVenta(data: any): Observable<any> {
    return this.http.post(this.apiUrlVenta, data);
  }

  crearVentaDetalle(data: any): Observable<any> {
    return this.http.post(this.apiUrlDetalles, data);
  }

  getCliente(): Observable<any> {
    return this.http.get(this.apiUrlCliente);
  }

  getProducto(): Observable<any> {
    return this.http.get(this.apiUrlProducto);
  }

  getVenta(): Observable<any> {
    return this.http.get(this.apiUrlVenta);
  }

  getVentaDetalle(): Observable<any> {
    return this.http.get(this.apiUrlDetalles);
  }

  updateVentaDetalle(id: number, data: any) {
    return this.http.put(`${this.apiUrlDetalles}${id}/`, data);
  }

  updateVenta(id: number, data: any) {
    return this.http.put(`${this.apiUrlVenta}${id}/`, data);
  }

  eliminarVenta(id: number) {
    return this.http.delete(`${this.apiUrlDetalles}${id}/`);
  }

  eliminarVentaDetalles(id: number) {
    return this.http.delete(`${this.apiUrlVenta}${id}/`);
  }

}
