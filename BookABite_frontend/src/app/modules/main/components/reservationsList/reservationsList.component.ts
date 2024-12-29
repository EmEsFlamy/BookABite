import { Component } from '@angular/core';
import { ReservationService } from '../../../../../services/reservation.service';


@Component({
  selector: 'app-reservationsList',
  templateUrl: './reservationsList.component.html',
  styleUrls: ['./reservationsList.component.css']
})
export class ReservationsListComponent {

  reservations: any[] = [];
  userRole = '';
  paginatedReservations: any[] = [];
  currentPage: number = 1;
  pageSize: number = 3;
  totalPages = Math.ceil(this.reservations.length / this.pageSize);

  constructor(private reservationService: ReservationService){}

ngOnInit(): void {
  const userType = sessionStorage.getItem('userType');
  this.userRole = userType || 'Guest';
  console.log('User role:', this.userRole);
  this.fetchReservations();
}

fetchReservations(): void {
  this.reservationService.getReservationsAll().subscribe(
    (data) => {
      this.reservations = data;
      this.filterAndSortReservations();
      this.updatePaginatedReservations();
      console.log('Fetched and filtered reservations:', this.reservations);
      console.log('Total reservations:', this.reservations.length);
      this.logPaginationData();
    },
    (error) => {
      console.error('Error fetching reservations:', error);
    }
  );
}

logPaginationData() {
  const totalPages = Math.ceil(this.reservations.length / this.pageSize);
  console.log('Total Pages:', totalPages);
  console.log('Current Page:', this.currentPage);
  console.log('Page Size:', this.pageSize);
}

updatePaginatedReservations() {
  this.totalPages = Math.ceil(this.reservations.length / this.pageSize);

  if (this.currentPage > this.totalPages) {
    this.currentPage = this.totalPages;
  }

  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.paginatedReservations = this.reservations.slice(startIndex, endIndex);
  console.log('Paginated Reservations:', this.paginatedReservations);
}

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePaginatedReservations();
  }


getReservationStatus(reservation: any): string {
  if (reservation.isActive) {
    return 'Active';
  } else if (reservation.isCompleted) {
    return 'Completed';
  }
  return 'Pending';
}

filterAndSortReservations(): void {
  this.reservations = this.reservations
    .sort((a, b) => {
      //prioritize active reservations
      if (a.isActive && !b.isActive) return -1;
      if (!a.isActive && b.isActive) return 1;

      //prioritize completed over pending (both inactive)
      if (a.isCompleted && !b.isCompleted) return 1;
      if (!a.isCompleted && b.isCompleted) return -1;

      //sort by reservationStart (earliest first)
      return new Date(a.reservationStart).getTime() - new Date(b.reservationStart).getTime();
    });
}

  
}
