import { Component} from '@angular/core';
import {CarouselModule} from '@coreui/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule, CarouselModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  slides = [
    { src: 'assets/images/restaurant1.jpg', title: 'Delicious Dish 1', subtitle: 'Our Speciality' },
    { src: 'assets/images/restaurant2.jpg', title: 'Delicious Dish 2', subtitle: 'Cooked to Perfection' },
    { src: 'assets/images/restaurant3.jpg', title: 'Delicious Dish 3', subtitle: 'A Taste of Heaven' },
    { src: 'assets/images/restaurant4.jpg', title: 'Delicious Dish 4', subtitle: 'Gourmet Delight' },
    { src: 'assets/images/restaurant5.jpg', title: 'Delicious Dish 5', subtitle: 'Ultimate Flavor' }
  ];
}
