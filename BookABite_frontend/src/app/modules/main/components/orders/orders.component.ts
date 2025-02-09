import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../../../services/reservation.service';
import { MenuItem, MenuService } from '../../../../../services/menu.service';
import { UserService } from '../../../../../services/user.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  users: any[] = [];
  userRole = '';
  paginatedOrders: any[] = [];
  currentPage: number = 1;
  pageSize: number = 8;
  menuItems: MenuItem[] = [];

  constructor(
    private reservationService: ReservationService, 
    private menuService: MenuService, 
    private userService: UserService,
){}

ngOnInit(): void {
  const userType = sessionStorage.getItem('userType');
  this.userRole = userType || 'Guest';
  console.log('User role:', this.userRole);
  this.fetchOrders();
  this.fetchMenu();
  this.fetchUsers();
}

fetchOrders(): void {
  this.reservationService.getOrdersAll().subscribe(
    (data) => {
      this.orders = data;
      this.filterAndSortOrders();
      this.updatePaginatedOrders();
      console.log('Orders:', this.orders);
    },
    (error) => {
      console.error('Error fetching orders:', error);
    }
  );
}

    fetchMenu(): void {
        this.menuService.getMenu().subscribe(
            (data) => {
            this.menuItems = data;
            console.log("Fetched menu items:", this.menuItems);
            },
            (error) => console.error("Error fetching menu:", error)
        );
    }

fetchUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        console.log("Fetched users:", this.users);
      },
      (error) => console.error("Error fetching users:", error)
    );
  }

  getUserFullName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? `${user.name} ${user.surname}` : 'Unknown User';
  }

processOrderItems(order: any): any[] {
    if (!order || !order.menuIds || this.menuItems.length === 0) {
      return [];
    }
  
    return Object.keys(order.menuIds).map(id => {
      const itemId = Number(id);
      const quantity = order.menuIds[id];
      const menuItem = this.menuItems.find(item => item.id === itemId);
  
      return menuItem
        ? { ...menuItem, quantity }
        : { id: itemId, foodName: 'Unknown Item', price: 0, quantity };
    });
  }

updatePaginatedOrders(): void {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.paginatedOrders = this.orders.slice(startIndex, endIndex);
}

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePaginatedOrders();
  }

  getOrderStatus(order: any): string {
    if (order.orderStatus === 0) {
      return 'Active';
    } else if (order.orderStatus === 1) {
      return 'Completed';
    }
    return 'Active';
  }

filterAndSortOrders(): void {
  this.orders = this.orders
    .sort((a, b) => {
      // Prioritize active orders first
      if (a.orderStatus === 0 && b.orderStatus === 1) return -1;
      if (a.orderStatus === 1 && b.orderStatus === 0) return 1;

      // Sort by id
      if (a.id > b.id) return -1; // Most recent first
      if (a.id < b.id) return 1;  // Least recent first
        
      return 0;
    });
}


  
}
