import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService ,IRoom} from '../../../Services/rooms.service';
import { IReservation,ReservationService } from '../../../Services/reservation.service';
import { PaymentGatewayDialogComponent } from '../payment-gateway-dialog/payment-gateway-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  selectedRoom:any=null;
  totalPrice: number = 0;
  checkInDate: string = '';
  checkOutDate: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  specialRequests:string='';
  guestId:string='';
  constructor(private route: ActivatedRoute, private router: Router,private reservationService: ReservationService,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadSelectedRoomFromQueryParams();
    this.loadGuestDetails();
  }

  private loadSelectedRoomFromQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.selectedRoom = {
          id: params['id'],
          roomType: params['roomType'],
          price: Number(params['price']),
          amenities: JSON.parse(params['amenities'] || '[]'),
          imagePath: params['imageUrl'],
          specialRequests:params['specialRequests'],
        };
      } else {
        console.error('No query parameters found!');
      }
    });
  }

  private loadGuestDetails(): void {
    const userEmail = localStorage.getItem('email'); // Retrieve email from localStorage
    if (!userEmail) {
      alert('User email not found. Please log in again.');
      this.router.navigate(['/signin']);
      return;
    }

    this.email = userEmail;

    this.reservationService.getUserByMail(userEmail).subscribe({
      next: (user) => {
        if (user && user.id) {
          this.guestId = user.id;
        } else {
          alert('User details not found. Please try again.');
          this.router.navigate(['/rooms']);
        }
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
        alert('Failed to fetch user details. Please try again.');
      },
    });
  }


  calculateTotalPrice(): void {
    if (this.isValidDates(this.checkInDate, this.checkOutDate) && this.selectedRoom) {
      const checkIn = new Date(this.checkInDate);
      const checkOut = new Date(this.checkOutDate);

      const days = Math.max(
        1,
        Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
      );

      this.totalPrice = days * this.selectedRoom.price;
    } else {
      console.warn('Invalid dates or no room selected for price calculation.');
    }
  }

  private isValidDates(checkIn: string, checkOut: string): boolean {
    if (!checkIn || !checkOut) return false;

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    return checkInDate < checkOutDate;
  }

  submitReservation(): void {
    if (this.selectedRoom && this.isValidDates(this.checkInDate, this.checkOutDate)) {
      const reservation: IReservation = {
        guestId: this.guestId,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        roomId: this.selectedRoom.id,
        checkInDate: this.checkInDate,
        checkOutDate: this.checkOutDate,
        totalPrice: this.totalPrice,
        specialRequests: this.specialRequests,
        status:false
      };
      const dialogRef = this.dialog.open(PaymentGatewayDialogComponent, {
        width: '400px',
        disableClose: true 
      });
    
      dialogRef.afterClosed().subscribe(() => {
        this.reservationService.createReservation(reservation).subscribe({
          next: () => {
            alert('Reservation submitted successfully you will be notified once confirmed check your bookings section!');
            this.router.navigate(['/all-rooms']);
          },
          error: (err) => {
            console.error('Error creating reservation:', err);
            alert('Failed to submit reservation.');
          },
        });
        alert('Payment Completed Successfully!');
      });
    } else {
      alert('Please fill in all required details and ensure the dates are valid.');
    }
  }

}
