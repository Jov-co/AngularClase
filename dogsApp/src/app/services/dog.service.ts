import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
import { Dog } from '../business/dog-interface';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  private http: HttpClient = inject(HttpClient);
  private baseUri: string = "http://localhost:8082/dog"

  getDogs(): Observable<Dog[]>{
    return this.http.get<any[]>(this.baseUri)
    .pipe(timeout(3000),
      map(anyDatalist => anyDatalist.map(any => any as Dog)),
      catchError(err => {
        console.log("Error al obtener la información: ", err);
        return throwError(()=> new Error("Error obteniendo la información"));
      })
    )
  }

  insertDog(data: Dog): Observable<void>{
    return this.http.post<void>(this.baseUri, data)
    .pipe(
      catchError(err => {
        console.log("Error almacenando la información: ", err);
        return throwError(()=> new Error("Error almacenando la información"));
      })
    )
  }

  deleteDog(id: number): Observable<void>{
    return this.http.delete<void>(this.baseUri.concat(`/${id}`))
    .pipe(
      catchError(err => {
        console.log("Error almacenando la información: ", err);
        return throwError(()=> new Error("Error almacenando la información"));
      })
    )
  }

  updateDog(data: Dog): Observable<void>{
    return this.http.put<void>(this.baseUri, data)
    .pipe(
      catchError(err => {
        console.log("Error actualizando la información: ", err);
        return throwError(()=> new Error("Error actualizando la información"));
      })
    )
  }
}

