import { Component, OnInit } from '@angular/core';
import { MenuHelperService, Category } from '../../../../../services/menu-helper.service';
import { MenuItem } from '../../../../../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  categories: Category[] = [];
  menuItems: { [key: string]: MenuItem[] } = {};
  selectedCategory: Category = this.categories[0];
  allItems: MenuItem[] = [];
  leftItems: MenuItem[] = [];
  rightItems: MenuItem[] = [];

  constructor(private menuHelper: MenuHelperService) {}

  ngOnInit(): void {
    this.categories = this.menuHelper.categories;
    if (this.categories.length > 0) {
      this.selectedCategory = this.categories[0];
    }
  
    this.menuHelper.fetchMenuItems().then((menuItems) => {
      this.menuItems = menuItems;
      if (this.categories.length > 0) {
        this.onCategoryChange(this.categories[0]);
      }
    });
  }

  onCategoryChange(category: Category): void {
    const key = category.name.toLowerCase();
    this.selectedCategory = category;
    this.allItems = this.menuItems[key] || [];
    const { leftItems, rightItems } = this.menuHelper.splitItems(this.allItems);
    this.leftItems = leftItems;
    this.rightItems = rightItems;
  }
}
