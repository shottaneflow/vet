import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {
  private baseUrl = 'http://localhost:8080/vaccination-api';

  constructor(private http: HttpClient) {}

  getByAnimal(animalId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/animal/${animalId}`);
  }

  create(animalId: string ,vaccination: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create/${animalId}`, vaccination);
  }

  update(id: string, vaccination: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, vaccination);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
