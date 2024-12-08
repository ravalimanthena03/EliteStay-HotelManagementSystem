import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceRequestsService } from '../../../Services/service-requests.service';
@Component({
  selector: 'app-tasks-assigned',
  templateUrl: './tasks-assigned.component.html',
  styleUrl: './tasks-assigned.component.scss'
})
export class TasksAssignedComponent implements OnInit{
  assignedTasks: any[] = [];
  isLoading = false;
  userEmail:string='';
  constructor(private serviceRequestsService: ServiceRequestsService, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
     this.userEmail = localStorage.getItem('email')|| ' '; 
    this.fetchAssignedTasks();
  }

  fetchAssignedTasks(): void {
    this.serviceRequestsService.getAssignedTasks(this.userEmail).subscribe(
      (response) => {
        console.log(response);
        this.assignedTasks = response.filter((task) => task.status === 'Assigned');
        this.isLoading = false;
      },
      (error) => {
        this.snackBar.open('Failed to fetch tasks. Please try again.', 'Close', {
          duration: 3000,
        });
        this.isLoading = false;
      }
    );
  }

  completeTask(taskId: string): void {
    this.serviceRequestsService.completeTask(taskId).subscribe(
      () => {
        this.snackBar.open('Task marked as completed.', 'Close', {
          duration: 3000,
        });
        this.fetchAssignedTasks(); // Refresh task list
      },
      (error) => {
        this.snackBar.open('Failed to complete the task. Please try again.', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
