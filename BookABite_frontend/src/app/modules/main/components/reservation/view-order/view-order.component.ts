import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { MenuService, MenuItem } from '../../../../../../services/menu.service';
import { ReservationService } from '../../../../../../services/reservation.service';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit, OnChanges {
  @Input() order: any;
  menuItems: MenuItem[] = [];
  items: any[] = [];
  
  OrderStatusMap: { [key: number]: string } = {
    0: 'Ongoing',
    1: 'Finished'
  };

  constructor(private menuService: MenuService, private reservationService: ReservationService, private modalRef: NzModalRef) {}

  ngOnInit(): void {
    this.menuService.getMenu().subscribe(
      (data) => {
        this.menuItems = data;
        console.log("Fetched menu items:", this.menuItems);
        this.processOrderItems();
      },
      (error) => console.error("Error fetching menu:", error)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['order']) {
      console.log("Order received:", this.order);
      this.processOrderItems();
    }
  }

  getOrderStatusLabel(): string {
    if (!this.order) return 'Unknown';
    return this.OrderStatusMap[this.order.orderStatus] || 'Unknown';
  }

  processOrderItems(): void {
    if (!this.order || !this.order.menuIds || this.menuItems.length === 0) {
      this.items = [];
      return;
    }

    this.items = Object.keys(this.order.menuIds).map(id => {
      const itemId = Number(id);
      const quantity = this.order.menuIds[id];
      const menuItem = this.menuItems.find(item => item.id === itemId);

      return menuItem
        ? { ...menuItem, quantity }
        : { id: itemId, foodName: 'Unknown Item', price: 0, quantity };
    });

    console.log("Processed Order Items:", this.items);
  }

  finishOrder(): void {
    console.log('Order completed:', this.order);
    const updatedData = {
        ...this.order,
        orderStatus: 1,
        };
        this.reservationService.updateOrder(updatedData).subscribe(() => {
        console.log('Order updated:', updatedData);
        this.order = null;
        this.modalRef.close(true);
  });
}
}

