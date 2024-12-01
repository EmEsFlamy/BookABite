import { Component } from '@angular/core';
import { NzButtonType } from 'ng-zorro-antd/button';
import { ChangeDetectorRef } from '@angular/core';

interface Table {
  number: number;
  status: 'Available' | 'Reserved' | 'Occupied' | 'Cleaning';
  seats: number;
  order?: string;
}


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  tables: Table[] = [
    { number: 1, status: 'Available', seats: 4 },
    { number: 2, status: 'Available', seats: 4 },
    { number: 3, status: 'Available', seats: 4 },
    { number: 4, status: 'Available', seats: 4 },
    { number: 5, status: 'Available', seats: 4 },
    { number: 6, status: 'Available', seats: 4 },
    { number: 7, status: 'Available', seats: 4 },
    { number: 8, status: 'Reserved', seats: 4 },
    { number: 9, status: 'Available', seats: 4 },
    { number: 10, status: 'Available', seats: 4 },
    { number: 11, status: 'Available', seats: 4 },
    { number: 12, status: 'Available', seats: 4 },
    { number: 13, status: 'Available', seats: 4 },
    { number: 14, status: 'Reserved', seats: 4 },
    { number: 15, status: 'Available', seats: 4 },
    { number: 16, status: 'Occupied', seats: 4 },
    { number: 17, status: 'Available', seats: 4 },
    { number: 18, status: 'Available', seats: 4 },
    { number: 19, status: 'Available', seats: 4 },
    { number: 20, status: 'Available', seats: 4 },
    { number: 21, status: 'Occupied', seats: 4 },
    { number: 22, status: 'Available', seats: 4 },
    { number: 23, status: 'Available', seats: 4 },
    { number: 24, status: 'Available', seats: 4 },
    { number: 25, status: 'Available', seats: 4 },
    { number: 26, status: 'Available', seats: 4 },
    { number: 27, status: 'Available', seats: 4 },
    { number: 28, status: 'Cleaning', seats: 4 },
    { number: 29, status: 'Available', seats: 4 },
    { number: 30, status: 'Available', seats: 4 },
    { number: 31, status: 'Available', seats: 4 },
    { number: 32, status: 'Available', seats: 4 },
    { number: 33, status: 'Available', seats: 4 },
    { number: 34, status: 'Available', seats: 4 },
  ];

  isModalVisible = false;
  selectedTable: Table | null = null;
  currentStep: number = 1;
  timeSlots: string[] = [
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00'
  ];
  selectedSlots: number[] = [];
  newStatus: string = '';
  newOrder: string = '';
  selectedStatus: string = '';
  tableStatuses: string[] = ['Available', 'Occupied', 'Cleaning'];

  userRole: 'guest' | 'waiter' = 'guest';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    //const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const isLoggedIn = 'true';
    this.userRole = isLoggedIn === 'true' ? 'waiter' : 'guest';
    console.log('User role:', this.userRole);
  }

  onTableClick(table: Table) {
    this.selectedTable = table;
    this.isModalVisible = true;

    if (this.userRole === 'guest') {
      this.currentStep = 1;
      this.selectedSlots = [];
    }
  }

  goToStep(step: number) {
    this.currentStep = step;
  }

  handleCancel(): void {
    this.isModalVisible = false;
    this.selectedSlots = [];
    this.newStatus = '';
    this.newOrder = '';
  }

  onTimeSlotClick(index: number) {
    if (this.selectedSlots.includes(index)) {
      this.selectedSlots = this.selectedSlots.filter((slot) => slot !== index);
    } else {
        this.selectedSlots.push(index);
        this.selectedSlots.sort((a, b) => a - b);
    }
  }

  confirmReservation() {
    console.log('Reserved table:', this.selectedTable);
    console.log('Selected time slots:', this.selectedSlots.map((i) => this.timeSlots[i]));
    if (this.selectedTable) {
      this.selectedTable.status = 'Reserved';
      console.log('Updated reserved table:', this.selectedTable);
    }
    this.handleCancel();
  }

  updateTableStatus(newStatus: string): void {
    if (this.selectedTable) {
      this.selectedTable.status = newStatus as Table['status'];
      console.log(`Table ${this.selectedTable.number} status updated to:`, newStatus);
      this.cdr.detectChanges();
    }
  }

  assignOrderToTable(table: Table): void {
    if (this.newOrder.trim()) {
      table.order = this.newOrder.trim();
      console.log(`Order "${this.newOrder}" assigned to Table ${table.number}`);
      this.newOrder = '';
      this.isModalVisible = false;
    } else {
      alert('Please enter a valid order!');
    }
  }

  getStatusType(status: string): NzButtonType {
    switch (status) {
      case 'Available':
        return 'default';
      case 'Reserved':
        return 'primary';
      case 'Occupied':
        return 'primary';
      case 'Cleaning':
        return 'dashed';
      default:
        return 'default';
    }
  }
}
