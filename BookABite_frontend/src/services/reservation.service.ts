import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BaseTable {
    id: number;
    tableStatus: number;
    seats: number;
  }

 export interface Order {
    id: number;
    fullPrice: number;
    timeStart: string;
    timeEnd: string;
    orderStatus: number; 
    customerName?: string;
    specialInstructions?: string;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
  }

  export interface ReservationPayload {
    id: number;
    reservationStart: string;
    reservationEnd: string;
    isActive: boolean;
    isCompleted: boolean;
    clientName: string;
    clientSurname: string;
    clientPhoneNumber: string;
    tableId: number;
  }
  
  export interface GuestTable extends BaseTable {}
  
  export interface WaiterTable extends BaseTable {
    order?: Order | null;
  }

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiTableUrl = 'http://localhost:8080/api/Table';
  private apiReservationUrl = 'http://localhost:8080/api/Reservation';

  constructor(private http: HttpClient) {}

  getTables(): Observable<GuestTable[]> {
    return this.http.get<GuestTable[]>(`${this.apiTableUrl}/all`);
  }

  reserveTable(payload: ReservationPayload): Observable<any> {
    return this.http.post(`${this.apiReservationUrl}`, payload);
  }

  updateTable(payload: { id: number; seats: number; tableStatus: number }): Observable<any> {
    return this.http.put(`${this.apiTableUrl}`, payload);
  }

  getReservations(): Observable<{ tableId: number; reservationStart: string; reservationEnd: string }[]> {
    return this.http.get<{ tableId: number; reservationStart: string; reservationEnd: string }[]>(
      `${this.apiReservationUrl}/data`
    );
  }
}
