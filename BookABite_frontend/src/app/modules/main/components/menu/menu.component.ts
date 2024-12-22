import { Component, OnInit } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';
import { MenuItem, MenuService } from '../../../../../services/menu.service';

interface Category {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {

  foodTypeMap: { [key: number]: string } = {
    0: 'starters',
    1: 'drinks',
    2: 'soups',
    3: 'main',
    4: 'kids',
    5: 'salads',
    6: 'alcohol',
  };
  
   categories: Category[] = [
    { name: 'Starters', icon: 'custom-starters:antd' },
    { name: 'Soups', icon: 'custom-soups:antd' },
    { name: 'Main', icon: 'custom-main:antd' },
    { name: 'Kids', icon: 'custom-kids:antd' },
    { name: 'Salads', icon: 'custom-salads:antd' },
    { name: 'Drinks', icon: 'coffee' },
    { name: 'Alcohol', icon: 'custom-alcohol:antd' },
  ];

  menuItems: { [key: string]: MenuItem[] } = {
    starters: [],
    drinks: [],
    soups: [],
    main: [],
    kids: [],
    salads: [],
    alcohol: [],
  };

  selectedCategory: Category = this.categories[0];
  allItems: MenuItem[] = [];
  leftItems: MenuItem[] = [];
  rightItems: MenuItem[] = [];
  fadeIn = true;

  constructor( private menuService: MenuService) {

  }

  ngOnInit(): void {
    this.fetchMenuItems();
  }

  fetchMenuItems() {
    this.menuService.getMenu().subscribe(
      (data) => {
        data.forEach((item) => {
              const key = this.foodTypeMap[item.foodType];
              if (key) {
                this.menuItems[key].push(item);
              } else {
                console.warn(`Unknown foodType: ${item.foodType}`);
              }
          });
        this.onCategoryChange(this.categories[0]);
        console.log(this.menuItems);
      },
      (error) => {
        console.error('Failed to fetch menu items:', error);
      }
    );
  }

  splitItems() {
    const midIndex = Math.ceil(this.allItems.length / 2);
    this.leftItems = this.allItems.slice(0, midIndex);
    this.rightItems = this.allItems.slice(midIndex);
  }


  onCategoryChange(category: Category): void {
    const key = category.name.toLowerCase();
    this.selectedCategory = category;
    this.allItems = this.menuItems[key] || [];
    this.splitItems();
  }

}

