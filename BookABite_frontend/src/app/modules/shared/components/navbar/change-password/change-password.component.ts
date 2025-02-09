import { Component, Input, OnChanges, SimpleChanges, OnInit, EventEmitter, Output } from '@angular/core';
import { MenuService, MenuItem } from '../../../../../../services/menu.service';
import { ReservationPayload, ReservationService } from '../../../../../../services/reservation.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { UserService } from '../../../../../../services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

    password: string = '';
    constructor(
        private modalRef: NzModalRef, 
        private userService: UserService,
        private msg: NzMessageService,
    ) {}
  
    changePassword(){
        const userId = sessionStorage.getItem('userId');
        if (userId === null) {
            return console.log('User not logged in');
        }
        const passwordPayload = {
            userId: userId,
            password: this.password,
        };

        this.userService.changePassword(passwordPayload).subscribe((data) => {
            console.log(data);
            this.msg.success('Password changed successfully');
            this.modalRef.close(true);
        },
        (error) => {
            console.log(error);
            this.msg.error('Failed to change password');
        });
    }
}

