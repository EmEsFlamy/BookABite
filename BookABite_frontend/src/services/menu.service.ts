import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface MenuApiResponse {
  categories: { name: string; icon: string }[];
  menuItems: { [key: string]: { name: string; price: string }[] };
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiUrl = 'http://localhost:8080/api/Menu';

  constructor(private http: HttpClient) {}

  getMenu(): Observable<MenuApiResponse> {
    return this.http.get<MenuApiResponse>('${this.apiUrl}/all');
  }
}
