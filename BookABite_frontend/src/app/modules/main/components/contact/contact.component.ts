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
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d439.0074963510681!2d4.839063628822341!3d45.76012313108903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1spl!2spl!4v1732045520840!5m2!1spl!2spl',
    },
    {
      name: 'BookABite - Second Office',
      address: 'Random Street2, Town2',
      hours: ['Monday - Friday: 08:00 - 17:00', 'Saturday - Sunday: Closed'],
      phone: '+22 222 222 222',
      photoUrl: 'assets/images/office2.jpg',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d239.54877453870083!2d-3.7035765904941287!3d40.41448953070946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1spl!2spl!4v1732045584235!5m2!1spl!2spl',
      },
    {
      name: 'BookABite - Third Office',
      address: 'Random Street3, Town3',
      hours: ['Monday - Friday: 07:30 - 15:30', 'Saturday - Sunday: Closed'],
      phone: '+33 333 333 333',
      photoUrl: 'assets/images/office3.jpg',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495.0498125939626!2d13.351750353523457!3d38.11945409908209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1319ef5de959414d%3A0x60c8a1ae8c6e757e!2sBar%20Sanremo%20-%20Palermo!5e1!3m2!1spl!2spl!4v1732045798942!5m2!1spl!2spl',
    }
  ];

  selectedRestaurant: Restaurant = this.restaurantOptions[0];

  selectRestaurant(index: number) {
    this.selectedRestaurant = this.restaurantOptions[index];
  }
}
