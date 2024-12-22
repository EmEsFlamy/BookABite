import { Component } from '@angular/core';
import { NzButtonType } from 'ng-zorro-antd/button';
import { BaseTable, GuestTable, WaiterTable, ReservationService, Order, ReservationPayload } from '../../../../../services/reservation.service';
import { MenuService, MenuItem } from '../../../../../services/menu.service';

interface Category {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  tables: GuestTable[] = [];
  categories: Category[] = [
    { name: 'Starters', icon: 'custom-starters:antd' },
    { name: 'Soups', icon: 'custom-soups:antd' },
    { name: 'Main', icon: 'custom-main:antd' },
    { name: 'Kids', icon: 'custom-kids:antd' },
    { name: 'Salads', icon: 'custom-salads:antd' },
    { name: 'Drinks', icon: 'coffee' },
    { name: 'Alcohol', icon: 'custom-alcohol:antd' },
  ];
  timeSlots: string[] = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

  isModalVisible = false;
  isAssignOrderModalVisible = false;

  selectedCategory: Category = this.categories[0];
  allItems: MenuItem[] = [];
  menuItems: { [key: string]: MenuItem[] } = {};
  selectedTable: any;
  currentStep = 1;
  selectedSlots: number[] = [];
  newStatus = '';
  newOrder = '';
  userRole = '';
  selectedStatus = '';
  clientName = '';
  clientSurname = '';
  clientPhoneNumber = '';
  

  reverseTableStatusMap: { [key: number]: string } = {
    0: 'Available',
    1: 'Reserved',
    2: 'Occupied',
    3: 'Cleaning',
    4: 'Disabled'
  };

  tableStatusMap: { [key: string]: number } = {
    Available: 0,
    Reserved: 1,
    Occupied: 2,
    Cleaning: 3,
    Disabled: 4
  };

  tableStatusOptions = Object.keys(this.tableStatusMap);

  constructor(private reservationService: ReservationService, private menuService: MenuService) {}

  ngOnInit(): void {
    const userType = sessionStorage.getItem('userType');
    this.userRole = userType || 'Guest';
    console.log('User role:', this.userRole);
    this.fetchTables();
    
  }

  // Fetch tables from the service
  fetchTables(): void {
    this.reservationService.getTables().subscribe(
      (data: BaseTable[]) => {
        this.tables = data.map((table) => ({
          ...table,
        }));
        console.log('Fetched tables:', this.tables);
      },
      (error) => {
        console.error('Error fetching tables:', error);
      }
    );
  }

  getStatusLabel(): string {
    if (!this.selectedTable) return 'Unknown';
    return this.reverseTableStatusMap[this.selectedTable.tableStatus] || 'Unknown';
  }

  // Handle table click events
  onTableClick(table: GuestTable): void {
    if(table.tableStatus === 4 && this.userRole === 'Guest') {
      return;
    }
    this.selectedTable = { ...table };
    this.isModalVisible = true;

    if (this.userRole === 'Guest') {
      this.currentStep = 1;
      this.selectedSlots = [];
    }
    console.log('Selected Table:', this.selectedTable);
  }

  // Navigation between modal steps
  goToStep(step: number): void {
    this.currentStep = step;
  }

  // Close modal
  handleCancel(): void {
    this.isModalVisible = false;
    this.resetSelections();
  }

  // Reset selections
  private resetSelections(): void {
    this.selectedSlots = [];
    this.newStatus = '';
    this.newOrder = '';
    this.selectedTable = null;
  }

  // Handle time slot selection
  onTimeSlotClick(index: number): void {
    if (this.selectedSlots.includes(index)) {
      this.selectedSlots = this.selectedSlots.filter((slot) => slot !== index);
    } else {
      this.selectedSlots.push(index);
      this.selectedSlots.sort((a, b) => a - b);
    }
  }

  confirmReservation(): void {
    if (this.selectedTable && this.selectedSlots.length > 0) {
      let reservationStart: string = '';
      let reservationEnd: string = '';
  
      const selectedDate = new Date();
  
      if (this.selectedSlots.length > 1) {
        reservationStart = `${selectedDate.toISOString().split('T')[0]}T${this.timeSlots[this.selectedSlots[0]]}Z`;
        reservationEnd = `${selectedDate.toISOString().split('T')[0]}T${this.timeSlots[this.selectedSlots[this.selectedSlots.length - 1]]}Z`;
      } else if (this.selectedSlots.length === 1) {
        reservationStart = `${selectedDate.toISOString().split('T')[0]}T${this.timeSlots[this.selectedSlots[0]]}Z`;
        const startTime = new Date(selectedDate.toISOString().split('T')[0] + 'T' + this.timeSlots[this.selectedSlots[0]] + 'Z');
        startTime.setHours(startTime.getHours() + 1);
        reservationEnd = startTime.toISOString();
      }
  
      const reservationPayload: ReservationPayload = {
        id: Math.floor(Math.random() * 1000),
        tableId: this.selectedTable.id,
        reservationStart: reservationStart,
        reservationEnd: reservationEnd,
        isActive: true,
        isCompleted: false,
        clientName: this.clientName,
        clientSurname: this.clientSurname,
        clientPhoneNumber: this.clientPhoneNumber,
      };
  
      console.log('Confirming reservation with payload:', reservationPayload);
  
      this.reservationService.reserveTable(reservationPayload).subscribe(
        (response) => {
          console.log('Reservation confirmed successfully:', response);
          this.fetchTables();
          this.handleCancel();
        },
        (error) => {
          console.error('Error confirming reservation:', error);
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
  }
  
  
  
  
  

  // Update table status
  updateTableStatus(newStatus: string): void {
    if (!this.selectedTable) {
      console.error('No table selected');
      return;
    }
  
    const statusValue = this.tableStatusMap[newStatus];
  
    if (statusValue === undefined) {
      console.error('Invalid status selected');
      return;
    }
  
    const payload: BaseTable = {
      id: this.selectedTable.id,
      seats: this.selectedTable.seats,
      tableStatus: statusValue,
    };
  
    console.log('Sending payload to API:', payload);
  
    this.reservationService.updateTable(payload).subscribe(
      (response) => {
        console.log('Table status updated successfully:', response);
        this.selectedTable!.tableStatus = statusValue;
        this.fetchTables();
      },
      (error) => {
        console.error('Error updating table status:', error);
      }
    );
  }

  openAssignOrderModal(): void {
    this.isAssignOrderModalVisible = true;
  }

  closeAssignOrderModal(): void {
    this.isAssignOrderModalVisible = false;
  }

  viewOrderDetails(): void {
    if (this.selectedTable && this.selectedTable.order) {
      console.log('Viewing order details for Table:', this.selectedTable.id);
      console.log('Order:', this.selectedTable.order);
    }
  }

  onCategoryChange(category: Category): void {
    this.selectedCategory = category;
    console.log('Selected category:', this.selectedCategory);
  }

  confirmAssignOrder(): void {
    if (this.newOrder.trim() && this.selectedTable) {
      const order: Order = {
        id: Math.floor(Math.random() * 1000),
        fullPrice: 150,
        timeStart: new Date().toISOString(),
        timeEnd: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
        orderStatus: 1,
        customerName: 'John Doe',
        specialInstructions: 'Extra napkins, please.',
        items: [
          { name: 'Pasta Carbonara', quantity: 2, price: 15 },
          { name: 'Caesar Salad', quantity: 1, price: 10 },
          { name: 'Soft Drink', quantity: 3, price: 5 },
        ],
      };

      this.selectedTable.order = order;

      this.tables = this.tables.map((table) =>
        table.id === this.selectedTable!.id ? { ...table, order } : table
      );

      console.log(`Order assigned to Table ${this.selectedTable.id}:`, order);

      this.newOrder = '';
      this.closeAssignOrderModal();
    } else {
      alert('Please enter a valid order!');
    }
  }


  getStatusType(status: number): NzButtonType{
    switch (status) {
      case 0:
        return 'default';  // Available
      case 1:
        return 'primary';   // Reserved
      case 2:
        return 'primary';   // Occupied
      case 3:
        return 'primary';   // Cleaning
      case 4:
        return 'dashed';  // Disabled
      default:
        return 'default';  // Default
    }
  }
}
