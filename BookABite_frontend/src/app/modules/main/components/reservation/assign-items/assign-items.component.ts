import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MenuService, MenuItem } from '../../../../../../services/menu.service';
import { ReservationService } from '../../../../../../services/reservation.service';
import { Category, MenuHelperService } from '../../../../../../services/menu-helper.service';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-assign-items',
  templateUrl: './assign-items.component.html',
  styleUrls: ['./assign-items.component.css']
})
export class AssignItemsComponent implements OnInit {
  @Input() selectedTable: any;
  @Input() menuItems: { [key: string]: MenuItem[] } = {};

  selectedMenuItems: MenuItem[] = [];
  allItems: MenuItem[] = [];
  isAssignOrderModalVisible = false;
  categories: Category[] = [];
  selectedCategory: Category = {} as Category;

  constructor(
    private reservationService: ReservationService,
    private menuService: MenuService,
    private menuHelper: MenuHelperService,
    private modalRef: NzModalRef
  ) {}

  ngOnInit(): void {
    this.menuHelper.fetchMenuItems().then((menuItems: { [key: string]: MenuItem[] }) => {
      this.menuItems = menuItems;

      this.categories = this.menuHelper.categories;
  
    if (this.categories.length > 0) {
      this.selectedCategory = this.categories[0];
    } else {
      console.warn('No categories found in MenuHelperService.');
    }
  
      if (this.categories.length > 0) {
        this.selectedCategory = this.categories[0];
        this.allItems = this.menuItems[this.selectedCategory.name.toLowerCase()] || [];
      }
    }).catch((error: any) => {
      console.error('Error fetching menu items:', error);
    });
  }

  openAssignOrderModal(): void {
    if (this.selectedTable) {
      this.reservationService.getCurrentOrder(this.selectedTable.id).subscribe(order => {
        if (order) {
          this.isAssignOrderModalVisible = true;
        } else {
          alert('No order found for this table.');
        }
      });
    }
  }

  closeAssignOrderModal(): void {
    this.isAssignOrderModalVisible = false;
    this.resetAllQuantity();
  }

  increaseQuantity(item: MenuItem): void {
    item.quantity = (item.quantity || 0) + 1;
    this.updateSelectedMenuItems(item);
  }

  decreaseQuantity(item: MenuItem): void {
    if (item.quantity > 0) {
      item.quantity -= 1;
      this.updateSelectedMenuItems(item);
    }
  }

  resetAllQuantity(): void {
    this.allItems.forEach(item => item.quantity = 0);
    this.selectedMenuItems = [];
  }

  onCategoryChange(category: Category): void {
    const key = category.name.toLowerCase();
    this.selectedCategory = category;
    this.allItems = this.menuItems[key] || [];
  }

  updateSelectedMenuItems(item: MenuItem): void {
    const existingItem = this.selectedMenuItems.find(menuItem => menuItem.id === item.id);
    if (existingItem) {
      existingItem.quantity = item.quantity;
    } else if (item.quantity > 0) {
      this.selectedMenuItems.push({ ...item, quantity: item.quantity });
    }
  }

  async refreshOrder(orderId: number): Promise<void> {
    if (!this.selectedTable) return;
  
    try {
      const refreshedOrder = await this.reservationService.getOrderById(orderId).toPromise();
  
      if (refreshedOrder) {
        this.selectedTable!.order = refreshedOrder;
      } else {
        console.warn("No refreshed order found!");
      }
    } catch (error) {
      console.error("Error refreshing order:", error);
    }
  }

  async onConfirmAddItem(): Promise<void> {
    if (!this.selectedTable || !this.selectedTable.order || this.selectedMenuItems.length === 0) return;

    const order = this.selectedTable.order;
    const updatedMenuIds = { ...order.menuIds };

    this.selectedMenuItems.forEach(item => {
      if (item.quantity > 0) {
        updatedMenuIds[item.id] = (updatedMenuIds[item.id] || 0) + item.quantity;
      }
    });

    const updatedData = {
      id: order.id,
      menuIds: updatedMenuIds,
      tableId: order.tableId,
      userId: order.userId,
      orderStatus: order.orderStatus,
    };

    try {
      const updatedOrder = await this.reservationService.updateOrder(updatedData).toPromise();
      
      this.selectedTable.order = updatedOrder;
      if (updatedOrder) {
        await this.refreshOrder(updatedOrder.id);
        
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
    this.resetAllQuantity();
    this.selectedMenuItems = [];
    this.modalRef.close();
  }
}
