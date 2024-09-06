import { Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImportModule } from '../import.module';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, ImportModule, NgFor],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {
  array = [
    { src: 'assets/images/restaurant2.jpg'},
    { src: 'assets/images/restaurant3.jpg'},
    { src: 'assets/images/restaurant5.jpg'},
  ]
}


