import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface BaseTable {
    id: number;
    tableStatus: number;
    seats: number;
  }

 export interface Order {
    id: number;
    fullPrice: number;
    orderStatus: number; 
    userId: number;
    tableId: number;
    menuIds: number[];
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
  
  export interface GuestTable extends BaseTable {
    order: Order | null;
}
  
  export interface WaiterTable extends BaseTable {
    order?: Order | null;
  }

  @Injectable({
    providedIn: 'root',
  })
  export class ReservationService {
    private apiTableUrl = 'http://localhost:8080/api/Table';
    private apiReservationUrl = 'http://localhost:8080/api/Reservation';
    private apiOrderUrl = 'http://localhost:8080/api/Order';
  
    constructor(private http: HttpClient) {}
  
    private getHeaders(): HttpHeaders {
      const token = sessionStorage.getItem('token');
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    }
  
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
  
    getReservationsAll(): Observable<any> {
      return this.http.get(`${this.apiReservationUrl}/all`, { headers: this.getHeaders() });
    }
  
    getOrdersAll(): Observable<Order[]> {
      return this.http.get<Order[]>(`${this.apiOrderUrl}/all`, { headers: this.getHeaders() });
    }
  
    assignOrder(tableId: number, menuIds: { [key: number]: number }): Observable<Order> {
      const userId = Number(sessionStorage.getItem('userId'));
  
      const payload = {
        id: 0,
        fullPrice: 0,
        orderStatus: 0,
        tableId: tableId,
        userId: userId,
        menuIds: menuIds
      };
  
      return this.http.post<Order>(`${this.apiOrderUrl}`, payload, { headers: this.getHeaders() });
    }
  
    getCurrentOrder(tableId: number): Observable<Order | null> {
      return this.getOrdersAll().pipe(
        map((orders: Order[]) => orders.find(order => order.tableId === tableId && order.orderStatus === 0) || null) 
      );
    }

    getOrderById(orderId: number): Observable<any> {
      return this.http.get<any>(`${this.apiOrderUrl}?orderId=${orderId}`, { headers: this.getHeaders() });
    }
  
    updateOrder(updatedData: Partial<Order>): Observable<Order> {
      return this.http.put<Order>(`${this.apiOrderUrl}`, updatedData, { headers: this.getHeaders() });
    }
  }
  
