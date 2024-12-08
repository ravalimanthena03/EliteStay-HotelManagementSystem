import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ServiceRequestsService } from '../../../Services/service-requests.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AssignTaskDialogComponent } from '../../../assign-task-dialog/assign-task-dialog.component';
@Component({
  selector: 'app-staff-schedules',
  templateUrl: './staff-schedules.component.html',
  styleUrl: './staff-schedules.component.scss'
})
export class StaffSchedulesComponent {
  displayedColumns: string[] = ['staffId', 'shiftType', 'shiftStartTime', 'shiftEndTime', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>();

  constructor(private serviceRequestsService: ServiceRequestsService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadSchedules();
  }

  loadSchedules(): void {
    this.serviceRequestsService.getStaffSchedules().subscribe(
      (schedules) => {
        this.dataSource.data = schedules;
      },
      (error) => {
        this.snackBar.open('Failed to load schedules.', 'Close', { duration: 3000 });
      }
    );
  }

  editSchedule(schedule: any): void {
    // Navigate to the schedule form to edit (could use a dialog or separate route)
  }

  deleteSchedule(scheduleId: string): void {
    
  }
}
