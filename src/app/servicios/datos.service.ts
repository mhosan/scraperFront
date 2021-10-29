import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  //private url = 'https://jsonplaceholder.typicode.com/users';
  //private url = 'http://localhost:3000/api/precios';
  private url = 'https://precioscraping.herokuapp.com/api/precios';

  constructor(private http: HttpClient) { }

  getDatos(): Observable<any> {
    return this.http.get(this.url);
  }

  getTotal(): Observable<any> {
    return this.http.get(this.url + '/total');
  }
}