import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isScrolled = false;
  userRole: string = '';
  username = sessionStorage.getItem('username');

  ngOnInit() {
    const userType = sessionStorage.getItem('userType');
    if(userType){
      this.userRole = userType
    }else{
      this.userRole = 'Guest';
    }
  }

  logout() {
    sessionStorage.clear();
    window.location
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    /*console.log('Scroll Offset:', offset);*/

    if (offset > 50) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }
}

