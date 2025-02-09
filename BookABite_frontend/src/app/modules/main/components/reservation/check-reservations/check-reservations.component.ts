import { Component, Input} from '@angular/core';
import { ReservationPayload, ReservationService } from '../../../../../../services/reservation.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-check-reservations',
  templateUrl: './check-reservations.component.html',
  styleUrls: ['./check-reservations.component.css']
})
export class CheckReservationsComponent {

  selectedSlots: number[] = [];
  constructor(
    private modalRef: NzModalRef, 
    private reservationService: ReservationService,
    private msg: NzMessageService,
   ) {}

  @Input() selectedTable: any;
  @Input() timeSlots: string[] = [];
  @Input() reservations: { tableId: number; reservationStart: string; reservationEnd: string }[] = [];

  onTimeSlotClick(index: number): void {
    if (this.selectedSlots.includes(index)) {
      this.selectedSlots = this.selectedSlots.filter((slot) => slot !== index);
    } else {
      this.selectedSlots.push(index);
      this.selectedSlots.sort((a, b) => a - b);
    }
  }

  isSlotReserved(index: number): boolean {
    const selectedTime = this.timeSlots[index];
    
    const today = new Date().toLocaleDateString('en-CA');
    const time = new Date().toTimeString().slice(0, 5);
    //custom day and time
    // const today = `2025-01-07`;
    // const time = `10:00`;
    
    const now = new Date(`${today}T${time}:00Z`);
    
    const selectedDateTime = new Date(`${today}T${selectedTime}:00Z`);
    
    //  if (selectedDateTime < now) {
    //    return true;
    //  }
  
    return this.reservations.some((reservation) => {
      const reservationStart = new Date(reservation.reservationStart);
      const reservationEnd = new Date(reservation.reservationEnd);
  
      return (
        this.selectedTable &&
        this.selectedTable.id === reservation.tableId &&
        selectedDateTime >= reservationStart &&
        selectedDateTime < reservationEnd
      );
    });
  }

  confirmReservation(): void {
    if (this.selectedTable && this.selectedSlots.length > 0) {
      let reservationStart: string = '';
      let reservationEnd: string = '';
  
      const selectedDate = new Date();
  
      const startTimeSlot = this.selectedSlots[0];
      reservationStart = `${selectedDate.toISOString().split('T')[0]}T${this.timeSlots[startTimeSlot]}:00Z`;
  
      const lastTimeSlot = this.selectedSlots[this.selectedSlots.length - 1];
      reservationEnd = `${selectedDate.toISOString().split('T')[0]}T${this.timeSlots[lastTimeSlot]}:00Z`;
  
      const endDateTime = new Date(reservationEnd); 
      endDateTime.setMinutes(endDateTime.getMinutes() + 59);
      endDateTime.setSeconds(endDateTime.getSeconds() + 59);
      reservationEnd = endDateTime.toISOString();
  
      const reservationPayload: ReservationPayload = {
        id: 0,
        tableId: this.selectedTable.id,
        reservationStart: reservationStart,
        reservationEnd: reservationEnd,
        isActive: true,
        isCompleted: false,
        clientName: "LocalReservation",
        clientSurname: "LocalReservation",
        clientPhoneNumber: "LocalReservation",
      };
  
      console.log('Confirming reservation with payload:', reservationPayload);
  
      this.reservationService.reserveTable(reservationPayload).subscribe(
        (response) => {
          console.log('Reservation confirmed successfully:', response);
        this.msg.success('Reservation confirmed successfully!\nReservation start: ' + this.timeSlots[startTimeSlot]);
        },
        (error) => {
          console.error('Error confirming reservation:', error);
          this.msg.error('Failed to confirm reservation');
          if (error.error) {
            console.error('Server Error:', error.error);
          } else {
            console.error('HTTP Error:', error.message);
          }
        }
      );
    } else {
      console.warn('Selected table or time slots are not available.');
    }
    this.modalRef.close();
  }
}

