import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-available-table',
  templateUrl: './available-table.component.html',
  styleUrls: ['./available-table.component.css']
})
export class AvailableTableComponent implements OnInit {
  @Input() timeSlots: string[] = [];
  @Input() reservations: any[] = [];
  @Input() allTables: number[] = [];

  availableTables: number[] = [];
  selectedTimeSlot: string = ''; 

  ngOnInit(): void {
    if (this.timeSlots.length > 0) {
      this.selectedTimeSlot = this.timeSlots[0];
      this.filterAvailableTables();
    }
  }

  onTimeSlotChange(slot: string): void {
    this.selectedTimeSlot = slot;
    this.filterAvailableTables();
  }

  filterAvailableTables(): void {
    if (!this.selectedTimeSlot) {
      console.error("No time slot selected");
      return;
    }

    const today = new Date();
    const [hours, minutes] = this.selectedTimeSlot.split(":").map(Number);
    const selectedTime = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), hours, minutes, 0));

    if (isNaN(selectedTime.getTime())) {
      console.error("Invalid Date for selected time slot:", this.selectedTimeSlot);
      return;
    }

    const selectedTimeEnd = new Date(selectedTime);
    selectedTimeEnd.setUTCMinutes(selectedTime.getUTCMinutes() + 59);

    const reservedTableIds = this.reservations
      .filter(reservation => {
        const reservationStart = new Date(reservation.reservationStart);
        const reservationEnd = new Date(reservation.reservationEnd);

        return (
          (selectedTime >= reservationStart && selectedTime < reservationEnd) || 
          (selectedTimeEnd > reservationStart && selectedTimeEnd <= reservationEnd)
        );
      })
      .map(reservation => reservation.tableId);

    this.availableTables = this.allTables.filter(tableId => !reservedTableIds.includes(tableId));
  }
}
