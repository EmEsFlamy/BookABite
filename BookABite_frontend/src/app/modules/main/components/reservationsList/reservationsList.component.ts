import { Component } from '@angular/core';
import { ReservationService } from '../../../../../services/reservation.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EditReservationListDialogComponent } from './edit-reservationList-dialog/edit-reservationList-dialog.component';


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
  pageSize: number = 8;

  constructor(
    private reservationService: ReservationService,
    private msg: NzMessageService,
    private modal: NzModalService,
  ){}

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
      console.log('Reservations:', this.reservations);
    },
    (error) => {
      console.error('Error fetching reservations:', error);
    }
  );
}

updatePaginatedReservations(): void {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.paginatedReservations = this.reservations.slice(startIndex, endIndex);
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
      // Prioritize active reservations first
      if (a.isActive && !b.isActive) return -1;
      if (!a.isActive && b.isActive) return 1;

      // Prioritize completed over pending (both inactive)
      if (a.isCompleted && !b.isCompleted) return 1;
      if (!a.isCompleted && b.isCompleted) return -1;

      // Sort by the most recent reservation start time (most recent on top)
      const dateA = new Date(a.reservationStart);
      const dateB = new Date(b.reservationStart);

      // Sort by the actual date, time and the day of the week
      if (dateA.getTime() > dateB.getTime()) return -1; // Most recent first
      if (dateA.getTime() < dateB.getTime()) return 1;  // Least recent first

      return 0;
    });
}

 // Open a modal to edit an existing reservation
  openEditReservationModal(reservation: any): void {
    const modalRef = this.modal.create({
      nzTitle: 'Edit Reservation',
      nzContent: EditReservationListDialogComponent,
      nzData: { reservation },
      nzOnOk: (instance) => instance.updateReservation(),
      nzFooter: null,
    });
  
    modalRef.afterClose.subscribe((result) => {
      if (result) {
        this.fetchReservations();
      }
    });
  }

  // Delete a reservation
  deleteReservation(id: number): void {
    this.modal.confirm({
      nzTitle: 'Are you sure to delete this reservation?',
      nzOnOk: () => {
        this.reservationService.deleteReservation(id).subscribe(
          () => {
            this.fetchReservations();
            this.msg.success('Reservation deleted successfully');
          },
          (error) => {
            this.msg.error('Failed to delete reservation');
          }
        );
      },
    });
  }
  
}
