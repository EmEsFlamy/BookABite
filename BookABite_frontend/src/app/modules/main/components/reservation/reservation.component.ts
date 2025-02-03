import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NzButtonType } from 'ng-zorro-antd/button';
import { BaseTable, GuestTable, WaiterTable, ReservationService, Order, ReservationPayload } from '../../../../../services/reservation.service';
import { MenuService, MenuItem } from '../../../../../services/menu.service';
import { MenuHelperService } from '../../../../../services/menu-helper.service';
import { Observable } from 'rxjs';
import { ViewOrderComponent } from './view-order/view-order.component';
import { NzModalService } from 'ng-zorro-antd/modal';

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

  constructor(private reservationService: ReservationService, private menuService: MenuService, private menuHelper: MenuHelperService, private cdr: ChangeDetectorRef, private modal: NzModalService) {}

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
    this.reservationService.getTables().subscribe((tables: GuestTable[]) => {
      this.tables = tables;
      
      if(this.userRole !== 'Guest') {
      this.reservationService.getOrdersAll().subscribe((orders: Order[]) => {
        this.tables.forEach((table) => {
          const order = orders.find(order => order.tableId === table.id && order.orderStatus === 0);
          table.order = order || null;
        });
      });}
    });
  }

  fetchReservations(): void {
    this.reservationService.getReservations().subscribe(
      (data) => {
        this.reservations = data;
        //console.log('Fetched reservations:', this.reservations);
      },
      (error) => {
        console.error('Error fetching reservations:', error);
      }
    );
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

    //console.log("Selected Table:", this.selectedTable);
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

  openModal(): void {
    const modalRef = this.modal.create({
      nzTitle: 'View Order',
      nzContent: ViewOrderComponent,
      nzOnOk: (instance) => instance.finishOrder(),
      nzFooter: null,
    });
    console.log("Data:", this.selectedTable.order);
    if(modalRef.componentInstance instanceof ViewOrderComponent) {
    modalRef.componentInstance.order = this.selectedTable.order;
    }
    modalRef.afterClose.subscribe(result => {
      console.log('Modal closed', result);
      if (result) {
        this.updateTableStatus("Available");
        this.fetchTables();
        this.fetchReservations();
        this.modal.closeAll();
      }
    });
  }
  

  closeAssignOrderModal(): void {
    this.isAssignOrderModalVisible = false;
  }

  assignNewItems(): void {
    if (this.selectedTable) {
      this.reservationService.getCurrentOrder(this.selectedTable.id).subscribe(order => {
        if (order) {
          this.isAssignOrderModalVisible = true;
        } else {
          alert("No order found for this table.");
        }
      });
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

  resetAllQuantity(): void {
    this.allItems.forEach(item => item.quantity = 0);
    console.log('Items', this.selectedMenuItems)
  }
  
  updateSelectedMenuItems(item: MenuItem): void {
    const existingItem = this.selectedMenuItems.find(menuItem => menuItem.id === item.id);
    if (existingItem) {
      existingItem.quantity = item.quantity;
    } else if (item.quantity > 0) {
      this.selectedMenuItems.push({ ...item, quantity: item.quantity });
    }
  }

  getCurrentOrder(tableId: number): Observable<Order | null> {
    return this.reservationService.getCurrentOrder(tableId);
  }

  startNewOrder(): void {
    if (!this.selectedTable) return;
  
    this.updateTableStatus("Occupied");
  
    const menuIds = {};
    this.reservationService.assignOrder(this.selectedTable.id, menuIds).subscribe(response => {
      console.log('New order created:', response);
  
      this.reservationService.getCurrentOrder(this.selectedTable.id).subscribe(order => {
        this.selectedTable.order = order;
        this.fetchTables();
      });
    });
  }

  async updateOrderAndRefresh(item: MenuItem): Promise<void> {
    if (!this.selectedTable || !this.selectedTable.order) return;
  
    const order = this.selectedTable.order;
    const menuIds = { ...order.menuIds };
  
    // Update menu items
    menuIds[item.id] = (menuIds[item.id] || 0) + item.quantity;
  
    const updatedData = {
      id: order.id,
      menuIds: menuIds,
      tableId: order.tableId,
      userId: order.userId,
      orderStatus: order.orderStatus,
    };
  
    console.log('Adding item to order:', updatedData);
  
    try {
      // Update order data
      const updatedOrder = await this.reservationService.updateOrder(updatedData).toPromise();
      this.selectedTable!.order = updatedOrder;
      // Refresh the order immediately after update
      
  
    } catch (error) {
      console.error('Error updating order:', error);
    }
      await this.refreshOrder(updatedData.id);
  }
  
  async refreshOrder(orderId: number): Promise<void> {
    if (!this.selectedTable) return;
  
    try {
      const refreshedOrder = await this.reservationService.getOrderById(orderId).toPromise();
      
      this.selectedTable!.order = refreshedOrder;
      console.log('Order refreshed:', refreshedOrder);
    } catch (error) {
      console.error('Error refreshing order:', error);
    }
  }
  

  viewOrderDetails(): void {
    if (!this.selectedTable || !this.currentOrder[this.selectedTable.id]) return;

    console.log("Order Details for Table", this.selectedTable.id, ":", this.currentOrder[this.selectedTable.id]);
  }

  endOrder(): void {
    if (!this.selectedTable || !this.selectedTable.order) return;
  
    const order = this.selectedTable.order;
    const updatedData = {
      id: order.id,
      orderStatus: 1, // Completed
    };
  
    this.reservationService.updateOrder(updatedData).subscribe(() => {
      this.selectedTable!.order = null;
      this.fetchTables();
    });
  }

  onConfirmAddItem(): void {
    if (this.selectedMenuItems.length > 0) {
      this.selectedMenuItems.forEach(item => {
        this.updateOrderAndRefresh(item);
        console.log('Item added:', item);
        item.quantity = 0; 
      });
      this.resetAllQuantity();
      this.selectedMenuItems = []; 
      this.closeAssignOrderModal(); 
    } else {
      console.log('No items selected.');
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
