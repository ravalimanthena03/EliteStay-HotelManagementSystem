import { Component,OnInit } from '@angular/core';
import { IReservation,ReservationService } from '../../../Services/reservation.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ReviewDialogboxComponent } from '../review-dialogbox/review-dialogbox.component';
import { Observable } from 'rxjs';
import { FeedbackService } from '../../../Services/feedback.service';
@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent implements OnInit{
  email: string = '';
  user: any = null;
  reservations: IReservation[] = [];
  errorMessage: string = '';
  showServices:boolean=false;
  availableServices :string[] |null= [];
  // Initialize service status object
  serviceStatus: { [key: string]: string } = {};
  constructor(private reservationService: ReservationService, private router: Router,private feedbackService:FeedbackService,private dialog: MatDialog) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (!email) {
      alert('User email not found. Please log in again.');
      this.router.navigate(['/login']);
      return;
    }

    // Fetch reservations by email
    this.reservationService.getReservationsByMail(email).subscribe({
      next: (reservations) => {
        if (reservations && reservations.length > 0) {
          this.reservations = reservations;
          this.fetchRoomDetailsForReservations();
        } else {
          this.errorMessage = 'No reservations found.';
        }
      },
      error: (err) => {
        this.errorMessage = 'Error fetching reservations: ' + err.message;
        console.error('Error fetching reservations:', err);
      },
    });
  }

  // Fetch room details for each reservation
  private fetchRoomDetailsForReservations(): void {
    this.reservations.forEach((reservation) => {
      this.reservationService.getRoomById(reservation.roomId).subscribe({
        next: (room) => {
          reservation.roomDetails = room; // Attach room details to the reservation
        },
        error: (err) => {
          console.error(`Error fetching room for reservation ${reservation.id}:`, err);
        },
      });
    });
  }
  
  isCheckedIn(checkInDate:string): boolean {
    const today = new Date();
    return new Date(checkInDate).setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0);
  }

  toggleServices(reservation: any): void {
    reservation.showServices = !reservation.showServices;
  
    // Fetch available services if the section is being opened
    if (reservation.showServices) {
      this.getServices(reservation);
    }
  }

  bookService(guestId: string, serviceType: string): void {
    if (!guestId || !serviceType) {
      alert('Guest ID or Service Type is missing!');
      return;
    }
  
    const serviceRequest = {
      GuestId: guestId,
      ServiceType: serviceType,
      RequestTime: new Date().toISOString(),
      AssignedTo: "",  // Empty as no staff assigned initially
      Status: "Requested",  // Status is "Requested" initially
      DeliveryTime: new Date().toISOString()// Delivery time will be assigned later when the service is completed
    };
    console.log(serviceRequest);
    // Set the service as "Booking..." (temporary state)
    this.serviceStatus[serviceType] = 'Booking...';

    this.reservationService.bookService(serviceRequest).subscribe({
      next: (response) => {
        console.log('Service booked successfully:', response);
        this.serviceStatus[serviceType] = 'Booked';
      },
      error: (error) => {
        console.error('Error booking service:', error);
        alert('Error booking service.');
      }
    });
  }

  getServices(reservation: IReservation): void {
    if (!reservation.roomDetails?.id) {
      console.error('Room details are missing for this reservation.');
      return;
    }

    this.reservationService.getAllServices(reservation.roomDetails.id).subscribe({
      next: (services) => {
        console.log(reservation.roomDetails?.id);
        this.availableServices = services;
      },
      error: (err) => {
        console.error(`Error fetching services for room`, err);
        this.availableServices = null;
      },
    });
  }


  openReviewDialog(roomId:any): void {
    const dialogRef = this.dialog.open(ReviewDialogboxComponent, {
      width: '400px',
      data: {roomId},
    });
  
    dialogRef.afterClosed().subscribe((feedback:any) => {
      if (feedback) {
        console.log('Feedback submitted:', feedback);
        // Call your service to send feedback to the database
        this.feedbackService.submitFeedback(feedback).subscribe(
          (response) => console.log('Feedback saved:', response),
          (error) => console.error('Error saving feedback:', error)
        );
      }
    });
  }
}
