import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VetService {
  private apiUrl = 'http://localhost:8080/admin-api';

  constructor(private http: HttpClient) { }

  getDoctors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-doctors`);
  }

  createDoctor(doctor: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-doctor`, doctor);
  }

  updateDoctor(id: string, doctor: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-doctor/${id}`, doctor);
  }

  deleteDoctor(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-doctor/${id}`);
  }
}
