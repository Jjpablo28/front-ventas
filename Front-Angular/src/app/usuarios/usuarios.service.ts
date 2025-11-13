import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  constructor(private http: HttpClient) {
  }

  private apiURL: string = 'https://sistema-de-ventas-uumw.onrender.com/api/usuarios/';


  crearUser(data: any): Observable<any> {
    return this.http.post(this.apiURL, data);
  }

  getUser(): Observable<any> {
    return this.http.get(this.apiURL);
  }
  updateUser(id: number, data: any) {
    return this.http.put(`${this.apiURL}${id}/`, data);
  }
  deleteUser(id: number) {
    return this.http.delete(`${this.apiURL}${id}/`);
  }


}
