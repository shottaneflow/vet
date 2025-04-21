import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080'; // Адрес бэкенда

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/reg-api`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth-api`, user);
  }
}
