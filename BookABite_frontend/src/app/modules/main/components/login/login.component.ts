import { Component } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';


interface LoginResponse {
  token: string;
  userType: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private modalRef: NzModalRef,
    private msg: NzMessageService
  ) {}

  login() {
    const credentials = { 
      username: this.username, 
      password: this.password 
    };

    this.authService.login(credentials).subscribe(
      (response: LoginResponse) => {
        console.log('Login successful', response);
        this.modalRef.close();
        this.router.navigate(['/reservation']).then(() => {
          window.location.reload();
        });
      },
      (error) => {
        console.error('Login failed', error);
        this.msg.error('Invalid username or password');
      }
    );
  }
}
