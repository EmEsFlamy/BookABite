import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {jwtDecode} from 'jwt-decode';
import { tap } from 'rxjs';

interface LoginResponse {
  token: string;
  userType: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LoginResponse>(`${this.apiUrl}/User/login`, credentials).pipe(
      tap((response: LoginResponse) => {
        // Store the token in sessionStorage
        sessionStorage.setItem('token', response.token);

        const decodedToken: any = jwtDecode(response.token);
        sessionStorage.setItem('userId', decodedToken.sub);
        sessionStorage.setItem('userType', response.userType);
      })
    );
  }

  logout(): void {
    sessionStorage.clear();
  }
}
