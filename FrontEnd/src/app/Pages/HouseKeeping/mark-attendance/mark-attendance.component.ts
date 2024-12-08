
import { Component, OnInit } from '@angular/core';
import { ServiceRequestsService } from '../../../Services/service-requests.service';
import { ReservationService ,IUser} from '../../../Services/reservation.service';
@Component({
  selector: 'app-mark-attendance',
  templateUrl: './mark-attendance.component.html',
  styleUrl: './mark-attendance.component.scss'
})
export class MarkAttendanceComponent implements OnInit {
  selectedDate: Date = new Date(); // Default to today's date
  mail: string | null = '';
  staff!: IUser; // Declare `staff` as a property of type `IUser`

  constructor(
    private reservationService: ReservationService,
    private serviceRequestsService: ServiceRequestsService
  ) {}

  ngOnInit(): void {
    this.fetchStaff();
  }

  // Fetch staff data by email (without async/await)
  fetchStaff(): void {
    this.mail = localStorage.getItem('email') || '';

    // Call the service to fetch staff by email
    this.reservationService.getUserByMail(this.mail).subscribe(
      (staff) => {
        this.staff = staff;
        if (!this.staff) {
          console.error('Staff not found');
          // Handle this case (e.g., show an error message)
        }
      },
      (error) => {
        console.error('Error fetching staff:', error);
      }
    );
  }

  // Handle date change when a date is selected in the calendar
  onDateChange(date: Date): void {
    this.selectedDate = date;
    console.log('Selected date:', this.selectedDate);
  }

  // Mark attendance by calling the update schedule API
  markAttendance(): void {
    // If staff is not found, do not proceed
    if (!this.staff) {
      alert('Staff not found, cannot mark attendance');
      return;
    }

    // Get the existing schedule for the staff
    this.serviceRequestsService.getScheduleByStaffId(this.staff.id).subscribe(
      (schedule) => {
        // Merge the selected date with the existing time
        const existingTimestamp = schedule.shiftStartTime;
        const existingDateTime = new Date(existingTimestamp);

        const updatedDateTime = new Date(
          this.selectedDate.getFullYear(),
          this.selectedDate.getMonth(),
          this.selectedDate.getDate(),
          existingDateTime.getHours(),
          existingDateTime.getMinutes(),
          existingDateTime.getSeconds(),
          existingDateTime.getMilliseconds()
        );
        console.log(schedule);
        // Convert to ISO string for the API payload
        const formattedDateTime = updatedDateTime.toISOString();

        // Create payload for updating attendance
        const payload = {
          attendanceDate: formattedDateTime, // Use the merged date and time
          status: 'Present', // This could be dynamic depending on your use case
        };

        // Call the service to update the attendance
        this.serviceRequestsService.updateStaffSchedule(schedule).subscribe(
          (response: string) => {
            console.log('Attendance marked successfully:', response);
            alert('Attendance marked successfully!');
          },
          (error) => {
            console.error('Error marking attendance:', error,schedule);
            alert('Failed to mark attendance.');
          }
        );
      },
      (error) => {
        console.error('Error fetching schedule:', error);
        alert('Failed to fetch staff schedule.');
      }
    );
  }
}
