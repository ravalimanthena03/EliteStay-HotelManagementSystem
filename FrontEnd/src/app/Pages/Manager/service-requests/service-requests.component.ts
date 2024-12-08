import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ServiceRequestsService } from '../../../Services/service-requests.service';
import { AssignTaskDialogComponent } from '../../../assign-task-dialog/assign-task-dialog.component';
@Component({
  selector: 'app-service-requests',
  templateUrl: './service-requests.component.html',
  styleUrl: './service-requests.component.scss'
})
export class ServiceRequestsComponent {
  serviceRequests: any[] = [];
  displayedColumns: string[] = ['id', 'serviceType', 'status','actions'];
  statusOptions: string[] = ['Pending', 'In Progress', 'Completed'];


  constructor(
    private serviceRequestsService: ServiceRequestsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadServiceRequests();
  }

  /**
   * Load service requests using the service
   */
  loadServiceRequests(): void {
    this.serviceRequestsService.fetchServiceRequests().subscribe(
      (data) => {
        this.serviceRequests = data;
        console.log(this.serviceRequests);
      },
      (error) => {
        this.snackBar.open('Error loading service requests', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  openAssignTaskDialog(schedule: any): void {
    const dialogRef = this.dialog.open(AssignTaskDialogComponent, {
      width: '400px',
      data: schedule,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.serviceRequestsService.getStaffSchedules(); // Refresh after assigning tasks
      }
    });
  }

 removeAssignedRequest(serviceRequestId: string): void {
  // Confirm the deletion with the user
  const confirmDelete = confirm('Are you sure you want to remove this completed request?');
  if (!confirmDelete) return;

  // Filter the request from the list (locally removing)
  this.serviceRequests = this.serviceRequests.filter(request => request.serviceRequestId !== serviceRequestId);

  // Show a confirmation message
  this.snackBar.open('Completed request removed successfully.', 'Close', { duration: 3000 });
}

}
