import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from '../../../Services/auth.service';
@UntilDestroy()
@Component({
  selector: 'app-housekeeping-dashboard',
  templateUrl: './housekeeping-dashboard.component.html',
  styleUrl: './housekeeping-dashboard.component.scss'
})
export class HousekeepingDashboardComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private router: Router,private authService: AuthService) {}
  ngOnInit(): void {
    // Ensure default route for receptionist
    this.router.navigate(['/tasks-assigned']);
  }
  ngAfterViewInit() {
    this.observer
    .observe(['(max-width: 800px)'])
    .pipe(delay(1), untilDestroyed(this))
    .subscribe((res: BreakpointState) => { // Add the BreakpointState type
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }
  logout() {
    this.authService.logout();
  }
}
