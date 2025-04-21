import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  private baseUrl = 'http://localhost:8080/visit-api';

  constructor(private http: HttpClient) {}

  getByAnimal(animalId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/animal/${animalId}`);
  }

  create(animalId: string, doctorId: string, visit: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create/${animalId}/${doctorId}`, visit);
  }

  update(id: string, visit: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, visit);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
