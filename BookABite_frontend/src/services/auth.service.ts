import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from './auth-response.model';

interface LoginResponse {
  token: string;
  userType: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  login( credentials: { username: string, password: string } ) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LoginResponse>(`${this.apiUrl}/User/login`, credentials);
  }

  logout() {
    return this.http.post(`${this.apiUrl}/User/logout`, {});
  }

   getDashboardData() {
    const token = sessionStorage.getItem('auth_token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get(`${this.apiUrl}/Table/all`, { headers });
    } else {
      throw new Error('No token found. Please log in.');
    }
  }
}
