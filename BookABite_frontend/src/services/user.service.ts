import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterPayload {
    name: string;
    surname: string;
    username: string;
    password: string;
    userType: number;
  }

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUserUrl = 'http://localhost:8080/api/User';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUserUrl}/all`, { headers: this.getHeaders() });
  }

  addUser(payload: RegisterPayload): Observable<any> {
    return this.http.post(`${this.apiUserUrl}/register`, payload);
  }
  
  updateUser(payload: { 
    userId: number; 
    name: string; 
    surname: string; 
    username: string; 
    userType: number;
  }): Observable<any> {
    return this.http.put(
      `${this.apiUserUrl}`, 
      payload, 
      { headers: this.getHeaders() }
    );
  }

  changePassword(payload: { 
    userId: string; 
    password: string;
  }): Observable<any> {
    return this.http.put(
      `${this.apiUserUrl}/changePassword`, 
      payload, 
      { headers: this.getHeaders() }
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUserUrl}?userId=${id}`, { headers: this.getHeaders() });
  }
}
