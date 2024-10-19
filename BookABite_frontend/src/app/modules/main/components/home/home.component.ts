import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor() {}

    array = [
        { src: 'assets/images/restaurant2.jpg'},
        { src: 'assets/images/restaurant3.jpg'},
        { src: 'assets/images/restaurant5.jpg'},
      ]

    ngOnInit() {
        console.log('Witam');
    }
}
