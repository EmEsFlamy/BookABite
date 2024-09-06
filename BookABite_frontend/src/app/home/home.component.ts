import { Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImportModule } from '../import.module';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, ImportModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {
  /*slides = [
    { src: 'assets/images/restaurant1.jpg'},
    { src: 'assets/images/restaurant2.jpg'},
    { src: 'assets/images/restaurant3.jpg'},
  ]*/
  array = [1, 2, 3, 4];
  effect = 'scrollx';
}


