import { Component } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';


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

  constructor(private authService: AuthService, private router: Router, private modalRef: NzModalRef) {}

  login() {
    const credentials = { 
      username: this.username, 
      password: this.password 
    };

    this.authService.login(credentials).subscribe(
      (response: LoginResponse) => {
        console.log('Login successful', response);

        sessionStorage.setItem('username', this.username);
        sessionStorage.setItem('userType', response.userType);
        sessionStorage.setItem('token', response.token);
        
        this.modalRef.close();
        this.router.navigate(['/reservation']).then(() => {
          window.location.reload();
        });
      },
      (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
}
