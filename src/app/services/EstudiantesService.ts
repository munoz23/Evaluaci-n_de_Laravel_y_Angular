import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '@models/student.model';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  private baseUrl = 'http://localhost/';
  

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  });

  constructor(private http: HttpClient) {}

  consultar_alumno(idGrado: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}api/consultar-alumno/${idGrado}`, { headers: this.headers });
  }
  crear_alumno(student : Array<Student>): Observable<any> {
    console.log(student);
    return this.http.post<any>(`${this.baseUrl}api/crear-alumno`, student[0], {headers:this.headers});
  }
  logOut(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}api/v1/logout`, {},{ headers: this.headers });
  }
  


  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }
}