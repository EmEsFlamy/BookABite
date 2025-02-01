import { Component } from '@angular/core';
import { NzButtonType } from 'ng-zorro-antd/button';
import { BaseTable, GuestTable, WaiterTable, ReservationService, Order, ReservationPayload } from '../../../../../services/reservation.service';
import { MenuService, MenuItem } from '../../../../../services/menu.service';
import { MenuHelperService } from '../../../../../services/menu-helper.service';

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
  
  timeSlots: string[] = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

  isModalVisible = false;
  isAssignOrderModalVisible = false;

  categories: Category[] = [];
  menuItems: { [key: string]: MenuItem[] } = {};
  selectedCategory: Category = this.categories[0];
  allItems: MenuItem[] = [];
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
  reservations: { tableId: number; reservationStart: string; reservationEnd: string }[] = [];
  intervalId: any;
  selectedMenuItems: MenuItem[] = [];
  currentOrder: { [key: number]: Order | null } = {};
  orderButtonText: { [key: number]: string } = {};
  

  reverseTableStatusMap: { [key: number]: string } = {
    0: 'Available',
    1: 'Reserved',
    2: 'Occupied',
    3: 'Cleaning',
    4: 'Disabled'
  };

  tableStatusMap: { [key: string]: number } = {
    Available: 0,
    Occupied: 2,
    Disabled: 4,
  };

  waiterStatusMap: { [key: string]: number } = {};
  adminStatusMap: { [key: string]: number } = {};

  tableStatusOptions = Object.keys(this.tableStatusMap);

  constructor(private reservationService: ReservationService, private menuService: MenuService, private menuHelper: MenuHelperService) {}

  ngOnInit(): void {
    const userType = sessionStorage.getItem('userType');
    this.userRole = userType || 'Guest';
    console.log('User role:', this.userRole);
    this.fetchTables();
    this.fetchReservations();

    this.intervalId = setInterval(() => {
      this.fetchTables();
      this.fetchReservations();
    }, 10000);

    this.categories = this.menuHelper.categories;
  
    if (this.categories.length > 0) {
      this.selectedCategory = this.categories[0];
    } else {
      console.warn('No categories found in MenuHelperService.');
    }
  
    this.menuHelper.fetchMenuItems().then((menuItems: { [key: string]: MenuItem[] }) => {
      this.menuItems = menuItems;
      if (this.categories.length > 0) {
        this.onCategoryChange(this.categories[0]);
      }
    }).catch(error => {
      console.error('Error fetching menu items:', error);
    });

    this.waiterStatusMap = this.filterStatusMap(['Available', 'Occupied']);
    this.adminStatusMap = this.filterStatusMap(['Available', 'Disabled']);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  fetchTables(): void {
    this.reservationService.getTables().subscribe((data: any[]) => {
      this.tables = data;
      console.log('fetch tabless',this.orderButtonText);
      this.checkActiveOrdersForTables();
    });
  }

  fetchReservations(): void {
    this.reservationService.getReservations().subscribe(
      (data) => {
        this.reservations = data;
        console.log('Fetched reservations:', this.reservations);
      },
      (error) => {
        console.error('Error fetching reservations:', error);
      }
    );
  }

  checkActiveOrdersForTables(): void {
    this.reservationService.getOrdersAll().subscribe(orders => {
      orders.filter((order: { orderStatus: number; }) => order.orderStatus === 0).forEach((order: Order | null) => {
        if (!order) return;
        const tableId = order.tableId;
        this.currentOrder[tableId] = order;
        this.orderButtonText[tableId] = "Assign New Items";
      });

      this.tables.forEach(table => {
        if (!this.currentOrder[table.id]) {
          this.orderButtonText[table.id] = "Start New Order";
        }
      });
    });
  }

  getStatusLabel(): string {
    if (!this.selectedTable) return 'Unknown';
    return this.reverseTableStatusMap[this.selectedTable.tableStatus] || 'Unknown';
  }

  // Handle table click events
  onTableClick(table: any): void {
    if(table.tableStatus === 4 && this.userRole !== 'Admin') {
      return;
    }
    this.selectedTable = { ...table };
    this.isModalVisible = true;

    if (this.userRole === 'Guest') {
      this.currentStep = 1;
      this.selectedSlots = [];
    }

    console.log('Selected Table:', this.selectedTable);
    console.log('Current order:', this.currentOrder[this.selectedTable.id]);
    console.log('selectedtableorderstatus,',this.selectedTable.orderStatus);
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

  // Handle reservation confirmation
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
        this.fetchReservations();
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

  assignNewItems(): void {
    if (this.selectedTable) {
      const currentOrder = this.reservationService.getCurrentOrder(this.selectedTable.id);
  
      if (currentOrder) {
        this.isAssignOrderModalVisible = true;
      } else {
        alert("No order found for this table.");
      }
    }
  }

  increaseQuantity(item: MenuItem): void {
    item.quantity = (item.quantity || 0) + 1;
    this.updateSelectedMenuItems(item);
  }
  
  decreaseQuantity(item: MenuItem): void {
    if (item.quantity > 0) {
      item.quantity = item.quantity - 1;
      this.updateSelectedMenuItems(item);
    }
  }
  
  updateSelectedMenuItems(item: MenuItem): void {
    const existingItem = this.selectedMenuItems.find(menuItem => menuItem.id === item.id);
    if (existingItem) {
      existingItem.quantity = item.quantity;
    } else if (item.quantity > 0) {
      this.selectedMenuItems.push({ ...item, quantity: item.quantity });
    }
  }

  startNewOrder(): void {
    if (!this.selectedTable) return;
  
    const newStatus = "Occupied";
    this.updateTableStatus(newStatus);
  
    const menuIds = {};
    this.reservationService.createOrder(this.selectedTable.id, menuIds).subscribe(response => {
      this.reservationService.setCurrentOrder(this.selectedTable.id, response);
  
      this.selectedTable.order = response;
      console.log('New order created:', response);
  
      this.orderButtonText[this.selectedTable.id] = "Assign New Items"; 
    });
  
    console.log('Current order:', this.currentOrder[this.selectedTable.id]);
    console.log('table order status',this.selectedTable.order.orderStatus);
  }


addItemToOrder(item: MenuItem): void {
  if (!this.selectedTable || !this.currentOrder[this.selectedTable.id]) return;

  const order = this.currentOrder[this.selectedTable.id];
  if (!order) return;

  const menuIds = { ...order.menuIds };

  if (menuIds[item.id]) {
      menuIds[item.id]++;
  } else {
      menuIds[item.id] = 1;
  }

  const updatedData = {
      id: order.id,
      menuIds: menuIds,
      fullPrice: 0,
      orderStatus: order.orderStatus,
  };

  this.reservationService.updateOrder(updatedData).subscribe(updatedOrder => {
      this.currentOrder[this.selectedTable.id] = updatedOrder;
  });
}

  viewOrderDetails(): void {
    if (!this.selectedTable || !this.currentOrder[this.selectedTable.id]) return;

    console.log("Order Details for Table", this.selectedTable.id, ":", this.currentOrder[this.selectedTable.id]);
  }

  endOrder(): void {
    if (!this.selectedTable || !this.currentOrder[this.selectedTable.id]) return;

    const order = this.currentOrder[this.selectedTable.id];
    if (!order) return;

    const updatedData = {
        id: order.id,
        orderStatus: 1, // 1: Completed
    };

    this.reservationService.updateOrder(updatedData).subscribe(() => {
        this.selectedTable.order = null;
        this.currentOrder[this.selectedTable.id] = null;
        this.orderButtonText[this.selectedTable.id] = "Start New Order";
    });
}


  confirmAssignOrder(): void {
    if (this.selectedTable && this.selectedMenuItems.length > 0) {
        const menuIds = this.selectedMenuItems.reduce((acc, item) => {
            acc[item.id] = item.quantity;
            return acc;
        }, {} as { [key: number]: number });

        const orderPayload = {
            id: 0,
            fullPrice: 0,
            orderStatus: 0,
            tableId: this.selectedTable.id,
            userId: Number(sessionStorage.getItem('userId')),
            menuIds: menuIds
        };

        console.log(`Assigning order to Table ${this.selectedTable.id}:`, orderPayload);

        this.reservationService.assignOrder(orderPayload.tableId, orderPayload.menuIds)
            .subscribe(
                (response) => {
                    console.log('Order successfully assigned:', response);
                    this.fetchTables();
                },
                (error) => {
                    console.error('Failed to assign order:', error);
                }
            );

        this.newOrder = '';
        this.closeAssignOrderModal();
    } else {
        alert('Please select a table and at least one menu item!');
    }
}

  

  onCategoryChange(category: Category): void {
    const key = category.name.toLowerCase();
    this.selectedCategory = category;
    this.allItems = this.menuItems[key] || [];
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

  private filterStatusMap(allowedStatuses: string[]): { [key: string]: number } {
    return Object.keys(this.tableStatusMap)
      .filter((key) => allowedStatuses.includes(key))
      .reduce((filteredMap, key) => {
        filteredMap[key] = this.tableStatusMap[key];
        return filteredMap;
      }, {} as { [key: string]: number });
  }
}
