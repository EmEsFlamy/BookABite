import { Injectable } from '@angular/core';
import { MenuService, MenuItem } from '../services/menu.service';

export interface Category {
  name: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuHelperService {
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

  constructor(private menuService: MenuService) {}

  fetchMenuItems(): Promise<{ [key: string]: MenuItem[] }> {
    return new Promise((resolve, reject) => {
      this.menuService.getMenu().subscribe(
        (data) => {
          const menuItems: { [key: string]: MenuItem[] } = {};
          data.forEach((item) => {
            const key = this.foodTypeMap[item.foodType];
            if (key) {
              menuItems[key] = menuItems[key] || [];
              menuItems[key].push(item);
            } else {
              console.warn(`Unknown foodType: ${item.foodType}`);
            }
          });
          resolve(menuItems);
        },
        (error) => reject(error)
      );
    });
  }

  splitItems(allItems: MenuItem[]): { leftItems: MenuItem[]; rightItems: MenuItem[] } {
    const midIndex = Math.ceil(allItems.length / 2);
    return {
      leftItems: allItems.slice(0, midIndex),
      rightItems: allItems.slice(midIndex),
    };
  }
  
}
