import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/user-api';

  constructor(private http: HttpClient) {}

  getUserProfile() {
    return this.http.get(`${this.baseUrl}/profile`);
  }

  updateProfile(profileData: any) {
    return this.http.put(`${this.baseUrl}/update`, profileData);
  }
}
