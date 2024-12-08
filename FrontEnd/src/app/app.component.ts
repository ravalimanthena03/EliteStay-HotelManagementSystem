import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'hotel-management-system';
  role: string | null = '';

  constructor(private router: Router,private authService: AuthService) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.router.navigate(['/home']);
    if (!this.role) {
      this.router.navigate(['/home']);
    }
    this.authService.role$.subscribe((currentRole) => {
      this.role = currentRole;
    });
  }
}
