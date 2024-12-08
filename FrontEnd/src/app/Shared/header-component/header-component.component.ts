import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.scss'
})
export class HeaderComponentComponent implements OnInit {
  isMenuOpen: boolean = false;
  isLoggedIn: boolean =true;
  showLogoutMenu: boolean = false;
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    // Subscribe to the login state
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }
  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(){
    this.isMenuOpen = false;
  }
  toggleLogoutMenu() {
    this.showLogoutMenu = !this.showLogoutMenu;
  }
  logout() {
    // Remove user data from local storage
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.showLogoutMenu = false;
    this.authService.logout();
  }
}
