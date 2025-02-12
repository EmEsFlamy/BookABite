import { Component, HostListener } from '@angular/core';
import { UserService } from '../../../../../services/user.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isScrolled = false;
  userRole: string = '';
  name: string = ''
  surname: string = ''

  constructor(
    private userService: UserService,
    private modal: NzModalService
  ) { }
  ngOnInit() {
    const userType = sessionStorage.getItem('userType');
    this.fetchUsername();
    if(userType){
      this.userRole = userType
    }else{
      this.userRole = 'Guest';
    }
  }

  fetchUsername() {
    const userId = sessionStorage.getItem('userId');
    if (!userId) return;

    this.userService.getUserById(+userId).subscribe(
      (user) => {
        this.name = user?.name;
        this.surname = user?.surname;
      },
      (error) => {
        console.error('Failed to fetch user:', error);
      }
    );
  }

  logout() {
    sessionStorage.clear();
    window.location
  }

  openPasswordModal(){
    const modalRef = this.modal.create({
          nzTitle: 'Change Password',
          nzContent: ChangePasswordComponent,
          nzOnOk: (instance) => instance.changePassword(),
          nzFooter: null,
        });

        modalRef.afterClose.subscribe(result => {
          console.log('Modal closed', result);
          if (result) {
            this.modal.closeAll();
          }
        });
  }


  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    //console.log('Scroll Offset:', offset);

    if (offset > 50) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
    //console.log('isScrolled:', this.isScrolled);
  }
}

