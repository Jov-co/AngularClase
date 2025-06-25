import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Course } from '../interfaces/course.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http:HttpClient=inject(HttpClient)
  // private baseURL:string="/api/item";
  private baseURL:string="http://localhost:8084/course";


  getCourses():Observable<Course[]>{
    return this.http.get<Course[]>(this.baseURL)
    .pipe(
      catchError(err=>{
        console.log("error retrieve courses ", err);
        throw new Error("courses not found");
      })
    );
  }

  getCourse(id:number):Observable<Course>{
    return this.http.get<Course>(`${this.baseURL}/${id}`)
    .pipe(
      catchError(err=>{
        console.log("error retrieve course ", err);
        throw new Error("course not found");
      })
    );
  }

  addCourse(course:Course):Observable<void>{
    return this.http.post<void>(this.baseURL, course)
    .pipe(
      catchError(err=>{
        console.log("error adding course ", err);
        throw new Error("course not added");
      })
    );
  }

  updateCourse(course:Course):Observable<void>{
    return this.http.put<void>(this.baseURL, course)
    .pipe(
      catchError(err=>{
        console.log("error updating course ", err);
        throw new Error("course not updated");
      })
    );
  }

  deleteCourse(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseURL}/${id}`)
    .pipe(
      catchError(err=>{
        console.log("error deleting course ", err);
        throw new Error("course not deleted");
      })
    );
  }
}
