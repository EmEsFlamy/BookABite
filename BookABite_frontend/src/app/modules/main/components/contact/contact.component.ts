import { Component } from '@angular/core';

interface Restaurant {
  name: string;
  address: string;
  hours: string[];
  phone: string;
  photoUrl: string;
  mapUrl: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  restaurantOptions: Restaurant[] = [
    {
      name: 'BookABite - Main Office',
      address: 'Random Street, Town',
      hours: ['Monday - Friday: 09:00 - 16:00', 'Saturday - Sunday: Closed'],
      phone: '+11 111 111 111',
      photoUrl: 'assets/images/office1.jpg',
      mapUrl: 'https://www.google.com/maps/embed?...',
    },
    {
      name: 'BookABite - Second Office',
      address: 'Random Street2, Town2',
      hours: ['Monday - Friday: 08:00 - 17:00', 'Saturday - Sunday: Closed'],
      phone: '+22 222 222 222',
      photoUrl: 'assets/images/office2.jpg',
      mapUrl: 'https://www.google.com/maps/embed?...',
    },
    {
      name: 'BookABite - Third Office',
      address: 'Random Street3, Town3',
      hours: ['Monday - Friday: 07:30 - 15:30', 'Saturday - Sunday: Closed'],
      phone: '+33 333 333 333',
      photoUrl: 'assets/images/office3.jpg',
      mapUrl: 'https://www.google.com/maps/embed?...',
    }
  ];

  selectedRestaurant: Restaurant = this.restaurantOptions[0];

  selectRestaurant(index: number) {
    this.selectedRestaurant = this.restaurantOptions[index];
  }
}
