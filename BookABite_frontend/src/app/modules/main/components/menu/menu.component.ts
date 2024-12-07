import { Component, OnInit } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';
import { MenuService } from '../../../../../services/menu.service';
import { HttpClient } from '@angular/common/http';

interface Category {
  name: string;
  icon: string;
}

interface MenuItem {
  name: string;
  price: string;
  category: number;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {

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

 /* menuItems = {
    starters: [
      { name: 'Mozzarella Sticks', price: '$6.99' },
      { name: 'Garlic Bread', price: '$4.99' },
      { name: 'Chicken Wings', price: '$7.99' },
      { name: 'Cheese Nachos', price: '$5.99' },
      { name: 'Loaded Potato Skins', price: '$6.50' },
      { name: 'Spring Rolls', price: '$4.99' },
      { name: 'Stuffed Mushrooms', price: '$6.99' },
      { name: 'Buffalo Cauliflower', price: '$5.50' },
      { name: 'Mini Tacos', price: '$5.99' },
    ],
  
    soups: [
      { name: 'Tomato Basil Soup', price: '$4.50' },
      { name: 'Chicken Noodle Soup', price: '$5.50' },
      { name: 'Minestrone Soup', price: '$4.75' },
      { name: 'French Onion Soup', price: '$5.25' },
      { name: 'Cream of Mushroom Soup', price: '$4.99' },
      { name: 'Lentil Soup', price: '$4.50' },
      { name: 'Clam Chowder', price: '$6.25' },
    ],
  
    main: [
      { name: 'Grilled Salmon', price: '$15.99' },
      { name: 'Steak and Fries', price: '$19.99' },
      { name: 'Pasta Primavera', price: '$12.99' },
      { name: 'BBQ Ribs', price: '$17.99' },
      { name: 'Chicken Alfredo', price: '$14.50' },
      { name: 'Vegetarian Pizza', price: '$10.99' },
      { name: 'Margherita Pizza', price: '$9.99' },
      { name: 'Cheeseburger', price: '$11.50' },
      { name: 'Beef Tacos', price: '$8.99' },
    ],
  
    kids: [
      { name: 'Mini Cheeseburger', price: '$5.99' },
      { name: 'Chicken Fingers', price: '$4.99' },
      { name: 'Grilled Cheese', price: '$3.99' },
      { name: 'Kids Pizza', price: '$4.99' },
      { name: 'Pasta with Butter', price: '$3.50' },
      { name: 'Mac and Cheese', price: '$4.25' },
    ],
  
    salads: [
      { name: 'Caesar Salad', price: '$7.99' },
      { name: 'Greek Salad', price: '$8.99' },
      { name: 'House Salad', price: '$6.50' },
      { name: 'Cobb Salad', price: '$9.99' },
      { name: 'Spinach Salad', price: '$8.25' },
      { name: 'Avocado Salad', price: '$7.99' },
    ],
  
    drinks: [
      { name: 'Coke', price: '$1.99' },
      { name: 'Fresh Orange Juice', price: '$2.99' },
      { name: 'Sparkling Water', price: '$2.50' },
      { name: 'Apple Juice', price: '$2.99' },
      { name: 'Iced Tea', price: '$2.25' },
      { name: 'Lemonade', price: '$2.75' },
      { name: 'Hot Chocolate', price: '$3.25' },
    ],
  
    alcohol: [
      { name: 'House Wine', price: '$5.99' },
      { name: 'Craft Beer', price: '$4.50' },
      { name: 'Gin and Tonic', price: '$6.99' },
      { name: 'Mojito', price: '$7.50' },
      { name: 'Whiskey Sour', price: '$7.75' },
      { name: 'Martini', price: '$8.25' },
      { name: 'Pina Colada', price: '$6.99' },
      { name: 'Tequila Sunrise', price: '$7.25' },
    ],
  }
*/

  selectedCategory: Category = this.categories[0];
  allItems: MenuItem[] = [];
  leftItems: MenuItem[] = [];
  rightItems: MenuItem[] = [];
  fadeIn = true;

  constructor(private iconService: NzIconService, private menuService: MenuService, private http: HttpClient) {
    this.iconService.addIconLiteral(
      'custom-main:antd',
      `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 121.87" style="enable-background:new 0 0 122.88 121.87" xml:space="preserve">
      <path d="M97.34,0.74c0.86-0.93,2.3-0.99,3.23-0.13c0.93,0.86,0.99,2.3,0.13,3.23L81.98,24.1l-0.03,0.04 c-2.29,2.77-3.86,5.33-4.56,7.67c-0.62,2.07-0.53,3.95,0.39,5.59c0.49,0.88,0.33,1.96-0.32,2.67l0,0l-8.89,9.62 c-0.87-0.95-1.56-1.72-2.02-2.22c-0.21-0.28-0.45-0.55-0.7-0.81l-0.02,0.02c-0.12-0.13-0.25-0.25-0.38-0.37l7.6-8.23 c-0.89-2.38-0.88-4.91-0.06-7.6c0.88-2.92,2.75-6.03,5.44-9.27c0.06-0.08,0.11-0.16,0.18-0.23L97.32,0.72L97.34,0.74L97.34,0.74z M57.13,55.01c-0.84-0.94-0.76-2.39,0.18-3.23c0.94-0.84,2.39-0.76,3.23,0.18c9.41,10.54,38.5,41.73,46.56,53.39 c10.63,15.05-5.83,19.79-11.29,14.31c-13.64-13.19-42.6-46.82-55.33-61.08c-4.58,1.94-9.03,2.24-13.5,0.96 c-4.81-1.37-9.52-4.58-14.3-9.51l-0.06-0.06c-3.64-3.84-6.49-7.63-8.55-11.38c-2.11-3.86-3.4-7.68-3.86-11.47 c-0.49-4.08-0.11-7.88,0.99-11.25c1.29-3.96,3.58-7.31,6.58-9.8c3.02-2.5,6.73-4.12,10.87-4.62c3.44-0.41,7.19-0.06,11.07,1.21 c5.37,1.75,11.63,6.1,16.82,11.68c3.83,4.11,7.11,8.92,9.06,13.87c2.03,5.16,2.65,10.5,1.02,15.5c-0.96,2.96-2.7,5.74-5.4,8.25 c-0.93,0.86-2.37,0.8-3.23-0.12c-0.86-0.93-0.8-2.37,0.12-3.23c2.09-1.95,3.43-4.08,4.16-6.33c1.26-3.87,0.73-8.16-0.93-12.38 c-1.74-4.42-4.69-8.74-8.15-12.45c-4.68-5.02-10.23-8.91-14.91-10.44c-3.21-1.04-6.28-1.34-9.09-1c-3.26,0.4-6.18,1.65-8.51,3.6 c-2.34,1.95-4.13,4.58-5.16,7.71c-0.89,2.73-1.2,5.87-0.79,9.26c0.39,3.2,1.5,6.47,3.32,9.81c1.91,3.43,4.53,6.9,7.9,10.45 l0.02,0.03c4.22,4.35,8.27,7.15,12.28,8.29c3.79,1.08,7.65,0.66,11.68-1.35c0.92-0.53,2.11-0.35,2.84,0.47 c12.42,13.91,42.63,48.92,56.01,61.89c5.81,2.37,9.03-0.55,6.25-5.7C100.7,102.43,63.5,62.17,57.13,55.01L57.13,55.01L57.13,55.01z M45.07,75.12l-29.16,31.55c-0.06,0.06-0.11,0.12-0.18,0.18c-4.26,4.6,3.28,11.3,7.96,6.82l28.32-30.65l3.04,3.45l-28.1,30.41l0,0 c-0.06,0.07-0.12,0.13-0.2,0.2c-1.68,1.41-3.37,2.33-5.08,2.71c-1.76,0.4-3.49,0.22-5.15-0.56c-0.28-0.11-0.54-0.25-0.77-0.46 l-4.03-3.73l0,0c-0.06-0.06-0.12-0.11-0.18-0.18c-1.56-1.8-2.3-3.72-2.1-5.75c0.19-1.92,1.21-3.79,3.14-5.59l29.44-31.86 L45.07,75.12L45.07,75.12z M75.63,57.46l1.73-1.87c0.86-0.93,2.31-0.99,3.23-0.13s0.99,2.3,0.13,3.23l-2,2.16L75.63,57.46 L75.63,57.46z M104.45,7.43c0.86-0.93,2.3-0.99,3.23-0.13c0.93,0.86,0.99,2.3,0.13,3.23L91.4,28.3c-0.86,0.93-2.3,0.99-3.23,0.13 c-0.93-0.86-0.99-2.3-0.13-3.23L104.45,7.43L104.45,7.43L104.45,7.43z M111.55,14c0.86-0.93,2.3-0.99,3.23-0.13 c0.93,0.86,0.99,2.3,0.13,3.23L98.51,34.86c-0.86,0.93-2.3,0.99-3.23,0.13c-0.93-0.86-0.99-2.3-0.13-3.23L111.55,14L111.55,14 L111.55,14z M118.91,20.83c0.86-0.93,2.3-0.99,3.23-0.13c0.93,0.86,0.99,2.31,0.13,3.23L103.55,44.2c-0.07,0.07-0.14,0.13-0.21,0.2 c-4.26,4.1-8.33,6.47-12.22,7.14c-4.22,0.73-8.09-0.47-11.64-3.57c-0.95-0.83-1.04-2.28-0.22-3.22c0.83-0.95,2.28-1.04,3.22-0.22 c2.45,2.14,5.07,2.98,7.84,2.49c2.98-0.51,6.26-2.48,9.84-5.93l0.02-0.02l18.71-20.25L118.91,20.83L118.91,20.83z"/>
    </svg>`
    );

    this.iconService.addIconLiteral(
      'custom-soups:antd',
      `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 102.56" style="enable-background:new 0 0 122.88 102.56" xml:space="preserve"><g><path d="M102.27,58.85c0.23-0.79,1.06-1.24,1.85-1.01c0.79,0.23,1.24,1.06,1.01,1.85c-0.61,2.09-1.36,4.18-2.22,6.23 c-0.86,2.02-1.82,3.99-2.89,5.87c-0.41,0.71-1.31,0.96-2.03,0.56c-0.71-0.41-0.96-1.31-0.56-2.03c1.02-1.79,1.94-3.65,2.74-5.55 C100.97,62.84,101.68,60.86,102.27,58.85L102.27,58.85z M61.02,6.31c0.83-0.83,2.18-0.83,3.02,0c0.83,0.83,0.83,2.18,0,3.02 c-3.19,3.2-1.8,5.81-0.18,8.84c2.4,4.47,5.14,9.6,0.51,17.62c-0.59,1.02-1.89,1.36-2.91,0.78c-1.02-0.59-1.36-1.89-0.78-2.91 c3.45-5.97,1.3-9.98-0.58-13.48C57.69,15.64,55.6,11.74,61.02,6.31L61.02,6.31z M80.48,0.62c0.83-0.83,2.18-0.83,3.02,0 c0.83,0.83,0.83,2.18,0,3.02c-3.19,3.19-1.8,5.81-0.18,8.84c2.4,4.47,5.14,9.6,0.51,17.62c-0.59,1.02-1.89,1.36-2.91,0.78 c-1.02-0.59-1.36-1.89-0.78-2.91c3.45-5.97,1.3-9.98-0.58-13.48C77.14,9.95,75.05,6.05,80.48,0.62L80.48,0.62z M99.94,6.31 c0.83-0.83,2.18-0.83,3.02,0c0.83,0.83,0.83,2.18,0,3.02c-3.2,3.2-1.8,5.81-0.18,8.84c2.4,4.47,5.14,9.6,0.51,17.62 c-0.59,1.02-1.89,1.36-2.91,0.78c-1.02-0.59-1.36-1.89-0.78-2.91c3.45-5.97,1.3-9.98-0.58-13.48C96.6,15.64,94.51,11.74,99.94,6.31 L99.94,6.31z M2.21,22.54c-2.34-2.93-2.66-6.07-1.72-8.73c0.47-1.34,1.27-2.54,2.3-3.52C3.8,9.32,5.04,8.57,6.4,8.13 c2.85-0.92,6.22-0.52,9.19,2.01l0.05,0.04l38.1,32.61h67.14c1.1,0,1.99,0.89,1.99,1.99c0,0.08-0.01,0.16-0.01,0.24 c-0.51,12.13-3.33,22.71-9.13,31.31c-5.86,8.68-14.72,15.28-27.24,19.34c-0.03,0.01-0.07,0.02-0.1,0.03v6.01 c0,0.46-0.38,0.84-0.84,0.84H48.33c-0.6,0-1.09-0.49-1.09-1.09v-5.82c-0.12-0.04-0.23-0.1-0.34-0.16 c-11.49-5.43-19.59-12.58-24.96-21.13c-5.39-8.58-8-18.53-8.47-29.5c-0.05-1.09,0.8-2.02,1.9-2.07c0.03,0,0.06,0,0.09,0v-0.01 h10.41L2.5,22.84C2.39,22.75,2.3,22.65,2.21,22.54L2.21,22.54z M4.23,15.13c-0.5,1.42-0.3,3.14,0.99,4.82l26.44,22.57h15.67 L13.07,13.2l-0.04-0.03c-1.8-1.53-3.78-1.79-5.42-1.26c-0.79,0.25-1.5,0.69-2.09,1.25C4.95,13.71,4.5,14.38,4.23,15.13L4.23,15.13z M25.3,72.25c4.94,7.86,12.42,14.47,23.04,19.54h37.25c11.45-3.77,19.53-9.8,24.85-17.68c5.07-7.51,7.69-16.51,8.36-27.11H17.55 C18.22,56.48,20.64,64.83,25.3,72.25L25.3,72.25z M94.68,74.57c0.48-0.67,1.41-0.81,2.08-0.33c0.67,0.48,0.81,1.41,0.33,2.08 c-0.62,0.86-1.27,1.69-1.94,2.49c-0.65,0.78-1.34,1.54-2.06,2.27c-0.58,0.59-1.52,0.59-2.1,0.02c-0.59-0.58-0.59-1.52-0.02-2.1 c0.64-0.65,1.27-1.35,1.9-2.09C93.49,76.16,94.1,75.38,94.68,74.57L94.68,74.57z"/></g></svg>
      `
    );

    this.iconService.addIconLiteral(
      'custom-starters:antd',
      `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 80.71" style="enable-background:new 0 0 122.88 80.71" xml:space="preserve"><g><path d="M122.4,14.42c-10.02,9.55-12.87,11.31-21.79,18.23l-2.11-3.06c11.16-8,14.22-10.02,20.19-18.12 C120.6,10.08,124.18,12.73,122.4,14.42L122.4,14.42z M27.53,60.99c10.6-3.2,12.95,10.85,5.27,15.65c-0.07,0.04-0.14,0.08-0.22,0.13 l-0.89-0.98L31,77.45c-8.13,2.4-17.85-9.35-5.63-15.57l1.17,1.34L27.53,60.99L27.53,60.99z M68.28,3.09 c-0.59-0.32-0.83-1.07-0.54-1.68c0.29-0.61,1.01-0.84,1.61-0.53c8.54,4.58,5.72,12.04,3.21,18.69c-1.76,4.67-3.34,8.84,0.56,10.3 c0.63,0.23,0.96,0.94,0.75,1.59c-0.21,0.64-0.89,0.98-1.52,0.74c-6.26-2.33-4.26-7.64-2.02-13.57 C72.47,12.97,74.87,6.62,68.28,3.09L68.28,3.09z M24.91,21.91c-0.59-0.32-0.83-1.07-0.54-1.68s1.01-0.84,1.61-0.53 c8.54,4.58,5.72,12.04,3.21,18.69c-1.76,4.67-3.34,8.84,0.56,10.3c0.63,0.23,0.96,0.94,0.75,1.59c-0.21,0.64-0.89,0.98-1.52,0.74 c-6.26-2.33-4.26-7.64-2.02-13.57C29.1,31.79,31.5,25.44,24.91,21.91L24.91,21.91z M45.48,2.34c-0.59-0.32-0.83-1.07-0.54-1.67 c0.29-0.61,1.01-0.84,1.61-0.53c11.04,5.92,7.36,15.67,4.08,24.36c-2.42,6.42-4.59,12.17,0.99,14.25c0.63,0.23,0.96,0.94,0.75,1.59 c-0.21,0.64-0.89,0.98-1.52,0.74c-7.95-2.96-5.35-9.84-2.45-17.52C51.31,15.85,54.57,7.21,45.48,2.34L45.48,2.34z M89.84,48.68 c-4.05,1.22-7.58,0.46-9.57-1.71c-3.39-3.69-2.02-11.53,3.88-14.99c0.09-0.05,0.17-0.1,0.26-0.14l1.03,1.02l0.89-1.82 c8.39-4.18,18.71,7.28,6.13,16.61l-1.34-1.41L89.84,48.68L89.84,48.68z M69.65,60.28c-3.65,1.1-6.86,0.24-8.74-1.97 c-3.18-3.75-2.16-11.49,3.1-14.75c0.08-0.05,0.16-0.09,0.23-0.14l0.96,1.04l0.76-1.78c9.78-4.31,17.85,9.49,6.03,16.64l-1.25-1.43 L69.65,60.28L69.65,60.28z M51.41,69.47c-3.47,1.57-6.73,1.23-8.82-0.59c-3.54-3.08-3.38-10.54,1.44-14.38 c0.07-0.06,0.14-0.11,0.21-0.16l1.06,0.85l0.55-1.79c7.42-5.69,18.67,4.18,7.75,14.84l-1.39-1.17L51.41,69.47L51.41,69.47z M16.67,75.46c-5.19,1.96-11.7,4.35-16.66,5.25C-0.4,80,14.17,75.23,16.14,74.43L16.67,75.46L16.67,75.46z"/></g></svg>`
    );

    this.iconService.addIconLiteral(
      'custom-kids:antd',
      `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 109.15" style="enable-background:new 0 0 122.88 109.15" xml:space="preserve"><g><path d="M60.11,36.27c-1.18,0.67-2.68,0.26-3.35-0.93c-0.67-1.18-0.26-2.68,0.93-3.35c2.45-1.39,4.67-2.88,6.55-4.52 c1.79-1.56,3.25-3.25,4.27-5.08c0.25-0.45,0.46-0.89,0.65-1.33c1.2-2.8,1.48-5.82,0.76-8.52c-0.7-2.6-2.35-4.91-5.05-6.4 c-0.36-0.2-0.73-0.38-1.1-0.54c-0.99-0.43-1.94-0.65-2.85-0.68c-0.9-0.03-1.79,0.12-2.66,0.45c-2.02,0.75-3.58,2.08-4.56,3.61 c-0.56,0.87-0.92,1.81-1.06,2.73c-0.13,0.87-0.07,1.71,0.2,2.45c0.31,0.84,0.92,1.61,1.87,2.22c0.56,0.36,1.3,0.53,2.24,0.52 c1.16-0.02,2.57-0.33,4.25-0.95c1.28-0.46,2.69,0.2,3.15,1.47c0.46,1.28-0.2,2.69-1.47,3.15c-2.19,0.8-4.13,1.21-5.86,1.24 c-1.94,0.03-3.6-0.4-4.98-1.29c-1.89-1.21-3.14-2.83-3.81-4.65c-0.58-1.57-0.73-3.25-0.47-4.9c0.24-1.6,0.86-3.19,1.8-4.66 c1.52-2.37,3.91-4.41,6.99-5.55c1.48-0.55,2.99-0.81,4.53-0.75c1.54,0.05,3.08,0.4,4.62,1.07c0.55,0.24,1.07,0.49,1.55,0.75 c3.96,2.19,6.41,5.6,7.44,9.45c1.01,3.76,0.64,7.92-0.99,11.72c-0.26,0.61-0.55,1.2-0.86,1.77c-1.32,2.39-3.14,4.51-5.35,6.43 C65.36,33.04,62.87,34.72,60.11,36.27L60.11,36.27z M42.05,79.05c-0.83-0.87-0.79-2.24,0.08-3.07c0.87-0.83,2.24-0.79,3.07,0.08 c5.92,6.22,11.76,8.92,17.51,8.71c5.83-0.21,11.77-3.36,17.78-8.82c0.89-0.81,2.26-0.74,3.07,0.14c0.81,0.89,0.74,2.26-0.14,3.07 c-6.76,6.14-13.61,9.7-20.55,9.94C55.84,89.35,48.9,86.25,42.05,79.05L42.05,79.05z M45.25,48.75c3.56,0,6.45,2.89,6.45,6.45 c0,3.56-2.89,6.45-6.45,6.45c-3.56,0-6.45-2.89-6.45-6.45C38.8,51.64,41.69,48.75,45.25,48.75L45.25,48.75z M80.14,48.75 c3.56,0,6.45,2.89,6.45,6.45c0,3.56-2.89,6.45-6.45,6.45c-3.56,0-6.45-2.89-6.45-6.45C73.69,51.64,76.58,48.75,80.14,48.75 L80.14,48.75z M81.05,29.8c-1.21-0.54-1.76-1.98-1.24-3.22c0.52-1.24,1.92-1.82,3.13-1.28c5.99,2.68,11.28,6.43,15.55,10.97 c3.72,3.95,6.68,8.51,8.69,13.48l0.16-0.04c0.87-0.19,1.76-0.29,2.65-0.29c3.55,0,6.77,1.49,9.11,3.9 c2.33,2.41,3.77,5.73,3.77,9.39c0,3.66-1.44,6.98-3.77,9.39c-2.34,2.41-5.56,3.9-9.11,3.9c-0.46,0-0.92-0.03-1.38-0.08 c-2.62,9.29-8.48,17.4-16.42,23.27c-8.39,6.21-19.1,9.93-30.76,9.93c-11.65,0-22.37-3.73-30.76-9.93 c-7.94-5.88-13.8-13.98-16.42-23.27c-0.46,0.05-0.92,0.08-1.38,0.08c-3.55,0-6.77-1.49-9.11-3.9C1.44,69.71,0,66.39,0,62.72 c0-3.66,1.44-6.98,3.77-9.39c2.34-2.41,5.56-3.9,9.11-3.9c0.89,0,1.78,0.1,2.65,0.29l0.16,0.04c2.01-4.98,4.97-9.53,8.69-13.48 c4.28-4.55,9.57-8.3,15.55-10.97c1.21-0.54,2.61,0.04,3.13,1.28c0.52,1.24-0.04,2.69-1.24,3.22c-5.4,2.41-10.17,5.8-14.02,9.9 c-3.76,4-6.65,8.67-8.39,13.79c-0.03,0.11-0.07,0.21-0.11,0.31c-0.53,1.24-1.94,1.81-3.14,1.26c-0.52-0.23-1.05-0.41-1.59-0.53 c-0.52-0.11-1.09-0.17-1.68-0.17c-2.25,0-4.27,0.93-5.73,2.44c-1.47,1.51-2.37,3.61-2.37,5.93c0,2.32,0.91,4.41,2.37,5.93 c1.46,1.51,3.49,2.44,5.73,2.44c0.42,0,0.83-0.03,1.23-0.09c0.43-0.07,0.83-0.16,1.19-0.28l0,0c0.06-0.02,0.12-0.03,0.18-0.05 c1.28-0.3,2.56,0.53,2.85,1.86c1.98,9.07,7.46,17.03,15.14,22.7c7.59,5.62,17.34,8.99,27.98,8.99c10.64,0,20.38-3.37,27.98-8.99 c7.66-5.67,13.14-13.62,15.13-22.67c0.01-0.07,0.03-0.14,0.05-0.21c0.39-1.3,1.72-2.02,2.98-1.63c0.37,0.12,0.76,0.21,1.19,0.28 c0.39,0.06,0.8,0.09,1.23,0.09c2.25,0,4.27-0.93,5.73-2.44c1.47-1.51,2.37-3.61,2.37-5.93c0-2.32-0.91-4.41-2.37-5.93 c-1.46-1.51-3.49-2.44-5.73-2.44c-0.6,0-1.16,0.06-1.68,0.17c-0.54,0.12-1.07,0.3-1.59,0.53l0,0c-0.06,0.03-0.12,0.05-0.18,0.07 c-1.24,0.45-2.6-0.23-3.03-1.51c-1.74-5.17-4.65-9.89-8.44-13.92C91.21,35.6,86.45,32.21,81.05,29.8L81.05,29.8z"/></g></svg>
      `
    );

    this.iconService.addIconLiteral(
      'custom-alcohol:antd',
      `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 117 122.88" style="enable-background:new 0 0 117 122.88" xml:space="preserve"><g><path d="M94.8,15.36c-1.18-0.34-1.86-1.56-1.53-2.74c0.34-1.18,1.56-1.86,2.74-1.53c3.15,0.9,5.79,2.39,7.82,4.59 c2.03,2.22,3.39,5.1,3.94,8.79c0.18,1.21-0.66,2.34-1.88,2.52c-1.21,0.18-2.34-0.66-2.52-1.88c-0.41-2.76-1.38-4.87-2.81-6.43 C99.13,17.12,97.17,16.04,94.8,15.36L94.8,15.36z M37.87,67.17L0.61,28.09c-0.84-0.89-0.81-2.29,0.08-3.13 c0.43-0.41,0.98-0.61,1.53-0.61v-0.01h14.53L2.27,9.86c-0.87-0.87-0.87-2.27,0-3.14c0.87-0.87,2.27-0.87,3.14,0l17.62,17.62h42.2 c0.46-6.48,3.24-12.31,7.52-16.64C77.44,2.94,83.92,0,91.08,0c7.16,0,13.64,2.94,18.34,7.7C114.1,12.45,117,19,117,26.23 c0,7.23-2.9,13.78-7.58,18.53c-4.7,4.76-11.18,7.7-18.34,7.7c-3.19,0-6.25-0.59-9.09-1.66c-2.33-0.88-4.51-2.1-6.48-3.6L56,67.18 v38.38l14.94,13.45c0.91,0.82,0.98,2.22,0.16,3.13c-0.44,0.49-1.04,0.73-1.65,0.73v0H24.77c-1.23,0-2.22-0.99-2.22-2.22 c0-0.7,0.32-1.32,0.82-1.73l14.5-13.36V67.17L37.87,67.17z M69.68,24.34h22.88c1.23,0,2.22,0.99,2.22,2.22 c0,0.66-0.29,1.26-0.75,1.67L78.64,44c1.5,1.08,3.15,1.98,4.92,2.65c2.33,0.88,4.87,1.37,7.52,1.37c5.93,0,11.3-2.43,15.18-6.36 c3.89-3.94,6.3-9.39,6.3-15.42c0-6.03-2.41-11.48-6.3-15.42c-3.88-3.93-9.25-6.36-15.18-6.36c-5.93,0-11.3,2.43-15.18,6.36 C72.42,14.33,70.13,19.06,69.68,24.34L69.68,24.34z M7.4,28.78l6.82,7.15c0.14-0.03,0.29-0.05,0.45-0.05h64.77 c0.28,0,0.54,0.05,0.79,0.14l7.08-7.25H7.4L7.4,28.78z M18.41,40.33l23.18,24.31c0.45,0.41,0.73,0.99,0.73,1.65v40.26h0 c0,0.6-0.24,1.2-0.72,1.63l-11.14,10.26h33.22l-11.29-10.16c-0.5-0.41-0.83-1.03-0.83-1.73V66.28h0.01c0-0.56,0.21-1.11,0.63-1.55 l23.83-24.41H18.41L18.41,40.33z"/></g></svg>`
    );

    this.iconService.addIconLiteral(
      'custom-salads:antd',
      `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 100" style="enable-background:new 0 0 122.88 100" xml:space="preserve"><g><path d="M121.13,36.03c0,0.09-0.01,0.18-0.02,0.27c-0.56,13.42-3.68,25.14-10.11,34.66c-6.49,9.61-16.29,16.92-30.16,21.41 c-0.04,0.01-0.08,0.02-0.11,0.03v6.66c0,0.51-0.42,0.94-0.94,0.94l-41.21,0c-0.66,0-1.2-0.54-1.2-1.2v-6.44 c-0.13-0.05-0.25-0.11-0.37-0.18C24.29,86.16,15.32,78.25,9.38,68.78C3.41,59.28,0.53,48.27,0,36.12c-0.05-1.21,0.89-2.24,2.1-2.29 c0.03,0,0.06,0,0.09,0c0,0,1.23,0,3.44,0c-0.44-0.48-0.8-1.02-1.08-1.63l1.2-0.31c-1.32-1.52-2.58-3.08-3.09-5.09l1.22-0.33 c-1.07-1.83-1.85-3.56-2.03-5.09l1.35,0.19c-0.98-2.38-1.53-4.51-1.48-6.3l1.37,0.38l0,0c-0.86-2.08-1.13-4.44-1.04-6.64 c1.96,0.65,3.9,1.66,5.82,3.27l0.18-1.38c1.48,0.5,3.3,1.77,5.36,3.57l0.25-1.31c1.43,0.87,2.79,2.09,4.07,3.73l0.71-0.99 c1.28,1,2.5,2.56,3.68,4.7l0.75-1.04c1.01,1.18,1.75,2.78,2.08,4.97l0.96-0.66c0.36,0.75,0.6,1.74,0.66,3.08 c0.44-0.6,0.96-1.17,1.56-1.69c1.41-1.46,3.8-2.35,7.1-2.71l-2.41-0.98c-0.43-0.28-0.24-0.44,0.45-0.51 c3.1-0.12,5.82,0.03,7.86,0.64c-0.03-1.73-0.76-3.46-1.61-5.19l2.22-1.45l0.74,0.52l0,0c0.59,2.59,1.16,4.99,1.64,6.3 c1.45-0.07,2.39-0.46,3.37-0.82c1.21-0.44,2.22-1.02,3.1-1.68c0.67-0.44,1.05-0.24,1,0.9c-0.2,1.06-0.75,1.87-1.58,2.48 c1.4-0.06,2.69,0.08,3.87,0.43c1.81,0.54,3.32,1.59,4.48,3.19c0.36,0.5,0.68,1.05,0.97,1.65c0.08,0.16,0.15,0.33,0.22,0.5 c-0.93-8.24,2.91-17.26,12.2-23.24c2.46-1.58,5.03-3.13,7.3-5.31c0.23,2.52,0.02,4.54-0.86,5.83c2.09,0.88,3.13,0.41,4.93-0.39 c0.11,1.87,0.55,3.92-0.31,5.43c1.72-0.26,2.98-0.32,4.4-1.44c0.49,2.22-0.03,4.25-0.65,6.11c2.22,0.05,4.02,0.43,5.36,1.02 c-0.15-1.11-0.17-2.27-0.05-3.33c1.54,1.09,3.34,2.25,5.31,2.32c-0.51-1.83-0.9-3.82-0.31-5.94c1.32,1.16,2.54,1.29,4.18,1.63 c-0.75-1.51-0.22-3.46-0.02-5.26c1.7,0.87,2.68,1.38,4.75,0.64c-0.78-1.28-0.89-3.25-0.53-5.68c2.08,2.23,4.49,3.86,6.78,5.52 c5.82,4.21,10.05,9.59,10.77,17.01c0.38,3.93-0.44,7.76-2.2,11.17l0.04,0C120.63,34.63,121.13,35.46,121.13,36.03L121.13,36.03z M60.67,33.42l0.02,0.24l-1.32,0c-0.09-1.06-0.28-2.15-0.59-3.28h0c-0.19-0.64-0.41-1.22-0.67-1.76c-0.25-0.54-0.53-1.02-0.84-1.45 c-0.98-1.36-2.25-2.24-3.79-2.7c-1.32-0.39-2.84-0.48-4.52-0.3l0,0c1.89,0.56,3.26,1.7,3.75,3.88c0.04,1.1-0.12,1.53-0.58,0.9 c-2.42-1.92-4.7-2.87-6.76-2.35c0.7,1.66,2.07,2.96,3.57,4.19c-2.7,0.04-5.1-1.17-7.28-3.25c-2.44,1.2-5.99,0.87-7.33,2.74 c-0.78,0.96-0.93,0.47-0.72-0.84c0.57-2.09,1.54-3.44,2.96-3.96c-2.34,0.09-3.88-0.23-4.76-0.88c-1.19,0.4-2.12,0.93-2.76,1.61 c-0.02,0.01-0.03,0.03-0.05,0.04c-0.83,0.72-1.49,1.55-1.99,2.45l0.68-0.22c0,1.31-0.67,3.09-1.66,5.09l1.23,0.17l-0.05,0.09 l33.61,0C60.77,33.69,60.72,33.55,60.67,33.42L60.67,33.42z M64.59,33.85l6.29,0.09l-1.79-5.62c3.27-2.07,5.68-5.46,7.29-10.06 c-2.38,3.28-5.01,6-7.57,6.67c-3.43-25.25-1.9,5.77-1.02,8.77c-2.1-1.43-3.93-3.41-5.48-5.95C62.69,29.99,63.36,32.07,64.59,33.85 L64.59,33.85z M72.03,33.96l3.4,0.05c1.76-2.36,2.86-5.11,3.59-8.09C77.05,28.93,74.75,31.63,72.03,33.96L72.03,33.96z M100.35,34.35l2.13,0.03c-2.46-4.33-7.45-6.17-10.99-9.74c-0.39-0.4-0.77-0.8-1.13-1.23c-0.18,0.05-0.36,0.11-0.55,0.16 c-2.04,0.56,2.51,3.71,7.43,7.9C98.36,32.42,99.43,33.37,100.35,34.35L100.35,34.35z M107.26,34.44l3.37,0.05 c-2.68-2.48-4.9-5.34-6.73-8.52C104.48,29.08,105.48,31.97,107.26,34.44L107.26,34.44z M111.21,34.5l6.08,0.08 c1.37-1.69,2.16-3.73,2.66-5.96c-1.64,2.37-3.5,4.19-5.61,5.46c1.01-2.85,4.12-32.76-0.52-8.53c-2.45-0.78-4.84-3.55-6.97-6.84 c1.32,4.54,3.47,7.93,6.52,10.11L111.21,34.5L111.21,34.5z M81.05,2.42c3.1-1.41,6.54-2.2,10.17-2.2c4.31,0,8.36,1.11,11.88,3.07 c0,0.37,0.01,0.73,0.04,1.07c0.01,0.16,0.03,0.33,0.05,0.48c-0.39-0.13-0.79-0.33-1.28-0.58l0,0l0-0.01l-0.02-0.01 c-0.95-0.49-2.12-0.11-2.61,0.85c-0.12,0.24-0.19,0.5-0.21,0.75C99.05,6.12,99,6.45,98.95,6.79c-0.09,0.59-0.17,1.19-0.22,1.78 c-0.21-0.12-0.4-0.25-0.6-0.42c-0.8-0.71-2.03-0.63-2.74,0.17c-0.23,0.27-0.38,0.58-0.45,0.9c-0.32,1.22-0.38,2.4-0.29,3.53 c-0.59-0.33-1.16-0.72-1.7-1.1c-0.87-0.62-2.08-0.41-2.69,0.46c-0.19,0.28-0.31,0.58-0.34,0.9l-0.01,0 c-0.04,0.3-0.06,0.62-0.07,0.93c-0.26-0.05-0.54-0.1-0.81-0.14c0.06-0.3,0.12-0.6,0.16-0.91c0.18-1.23,0.19-2.52-0.11-3.88l-0.01,0 c-0.06-0.28-0.18-0.54-0.37-0.78C88.05,7.38,86.84,7.24,86,7.9c-0.24,0.19-0.49,0.34-0.75,0.46c-0.01-0.65-0.07-1.3-0.13-1.95 c-0.03-0.31-0.06-0.61-0.08-0.99c0-0.26-0.05-0.52-0.16-0.77c-0.43-0.98-1.58-1.42-2.56-0.99l-0.02,0.01l0,0l-0.01,0 c-0.56,0.25-1.01,0.45-1.46,0.56c0.04-0.2,0.07-0.39,0.1-0.6C81,3.25,81.03,2.84,81.05,2.42L81.05,2.42z M16.65,33.82h1.38 c-0.94-1.24-1.86-2.49-2.76-3.75c-3.17-4.44-6.03-8.94-8.63-13.73c-0.77-1.42-1.51-2.85-2.22-4.3c-0.1,0.82,1.87,5.12,3.33,7.85 C10.37,24.76,13.43,29.35,16.65,33.82L16.65,33.82L16.65,33.82z M98.31,51.61c0.26-0.87,1.17-1.37,2.04-1.12 c0.87,0.26,1.37,1.17,1.12,2.04c-0.68,2.31-1.5,4.62-2.46,6.89c-0.95,2.24-2.02,4.42-3.2,6.5c-0.45,0.79-1.45,1.07-2.24,0.62 c-0.79-0.45-1.07-1.45-0.62-2.24c1.13-1.98,2.15-4.04,3.03-6.15C96.88,56.02,97.66,53.83,98.31,51.61L98.31,51.61L98.31,51.61 L98.31,51.61z M90.88,67.63c0.51-0.76,1.53-0.96,2.28-0.45c0.76,0.51,0.96,1.53,0.45,2.28c-0.84,1.25-1.72,2.44-2.63,3.57 c-0.9,1.12-1.85,2.18-2.83,3.18c-0.64,0.65-1.68,0.66-2.33,0.02c-0.65-0.64-0.66-1.68-0.02-2.33c0.9-0.92,1.78-1.9,2.61-2.94 C89.28,69.9,90.1,68.78,90.88,67.63L90.88,67.63L90.88,67.63L90.88,67.63z M13.09,66.45c5.46,8.7,13.75,16.02,25.51,21.63h41.24 c12.68-4.17,21.62-10.85,27.51-19.58c5.61-8.32,8.51-18.54,9.26-30.27H4.52C5.25,48.72,7.93,58.23,13.09,66.45L13.09,66.45 L13.09,66.45z"/></g></svg>`
    );
  }

  ngOnInit(): void {
    this.fetchMenuItems();
  }

  fetchMenuItems() {
    this.http.get<MenuItem[]>('http://localhost:8080/api/Menu/all').subscribe(
      (data) => {
        data.forEach((item) => {
          switch (item.category) {
            case 0:
              this.menuItems['starters'].push(item);
              break;
            case 1:
              this.menuItems['drinks'].push(item);
              break;
            case 2:
              this.menuItems['soups'].push(item);
              break;
            case 3:
              this.menuItems['main'].push(item);
              break;
            case 4:
              this.menuItems['kids'].push(item);
              break;
            case 5:
              this.menuItems['salads'].push(item);
              break;
            case 6:
              this.menuItems['alcohol'].push(item);
              break;
            default:
              this.menuItems['starters'].push(item);
              break;
          }
        });

        this.onCategoryChange(this.categories[0]);
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


  onCategoryChange(category: { name: string; icon: string }): void {
    this.selectedCategory = category;
    switch (category.name) {
      case 'Starter':
        this.allItems = this.menuItems['starters'];
        break;
      case 'Drinks':
        this.allItems = this.menuItems['drinks'];
        break;
      case 'Soups':
        this.allItems = this.menuItems['soups'];
        break;
      case 'Main':
        this.allItems = this.menuItems['main'];
        break;
      case 'Kids':
        this.allItems = this.menuItems['kids'];
        break;
      case 'Salads':
        this.allItems = this.menuItems['salads'];
        break;
      case 'Alcohol':
        this.allItems = this.menuItems['alcohol'];
        break;
      default:
        this.allItems = this.menuItems['starters'];
    }
    this.splitItems();
  }

}

