import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  
  //private url = 'https://jsonplaceholder.typicode.com/users';
  private url = 'http://localhost:3000/api/precios';

  constructor(private http: HttpClient) { }

  getDatos(): Observable<any> {
    console.log("mierda");
    const losdatos = this.http.get(this.url);
    console.log(losdatos)
    return losdatos;
  }
}
