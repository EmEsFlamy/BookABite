import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ReservationService } from '../../../../../../services/reservation.service';

@Component({
  selector: 'app-edit-reservationList-dialog',
  templateUrl: './edit-reservationList-dialog.component.html',
  styleUrls: ['./edit-reservationList-dialog.component.css'],
})
export class EditReservationListDialogComponent implements OnInit {
  validateForm!: FormGroup;
  reservation: any;
  tableOptions = Array.from({ length: 34 }, (_, i) => ({ label: `Table ${i + 1}`, value: i + 1 }));

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private modalRef: NzModalRef,
    private msg: NzMessageService
  ) {
    this.reservation = this.modalRef.getConfig().nzData.reservation;
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
    id: [this.reservation.id],
    isActive: [this.reservation.isActive],
    isCompleted: [this.reservation.isCompleted],
    clientName: [this.reservation.clientName, [Validators.required]],
    clientSurname: [this.reservation.clientSurname, [Validators.required]],
    clientPhoneNumber: [this.reservation.clientPhoneNumber, [Validators.required]],
    tableId: [this.reservation.tableId || 1, [Validators.required]], // Default to table 1
    reservationDay: [this.reservation.reservationStart ? this.getUTCDateOnly(this.reservation.reservationStart) : null, [Validators.required]],
    reservationStart: [this.reservation.reservationStart ? this.getUTCTimeOnly(this.reservation.reservationStart) : null, [Validators.required]],
    reservationEnd: [this.reservation.reservationEnd ? this.getUTCTimeOnly(this.reservation.reservationEnd) : null, [Validators.required]],
  });
  }

  updateReservation(): void {
    if (this.validateForm.valid) {
      const { reservationDay, reservationStart, reservationEnd } = this.validateForm.value;
  
      const payload = {
        ...this.validateForm.value,
        reservationStart: this.combineDateAndTimeUTC(reservationDay, reservationStart),
        reservationEnd: this.combineDateAndTimeUTC(reservationDay, reservationEnd),
        clientName: this.validateForm.value.clientName,
        clientSurname: this.validateForm.value.clientSurname,
        clientPhoneNumber: this.validateForm.value.clientPhoneNumber,
        tableId: this.validateForm.value.tableId || 0, 
      };
      
      if (payload.reservationStart >= payload.reservationEnd) {
        this.msg.error('Reservation start cannot be set later than the end.');
        return;
      }
      console.log(payload);
      this.reservationService.updateReservation(payload).subscribe(() => {
        this.modalRef.close(true);
      });
    }
  }

  getUTCDateOnly(dateString: string): Date {
    const date = new Date(dateString);
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  }
  
  getUTCTimeOnly(dateString: string): Date {
    const date = new Date(dateString);
    return new Date(1970, 0, 1, date.getUTCHours(), date.getUTCMinutes());
  }
  
  combineDateAndTimeUTC(date: Date, time: Date): Date {
    if (!date || !time) return new Date();
  
    return new Date(Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes()
    ));
  }
  

}
