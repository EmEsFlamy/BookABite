import {Component, OnInit} from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    
    constructor(private modal: NzModalService) {}

    array = [
        { src: 'assets/images/restaurant2.jpg'},
        { src: 'assets/images/restaurant3.jpg'},
        { src: 'assets/images/restaurant5.jpg'},
      ]

    ngOnInit() {
        console.log('Witam');
    }

    openLoginModal(): void {
        this.modal.create({
          nzTitle: 'BookABite',
          nzContent: LoginComponent,
          nzFooter: null,
          nzWidth: '400px',
        });
      }
}
