import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReservationService } from '../../../Services/reservation.service';
import { RoomsService } from '../../../Services/rooms.service';
import { UpdateStatusDialogBoxComponent } from '../update-status-dialog-box/update-status-dialog-box.component';
@Component({
  selector: 'app-all-reservations',
  templateUrl: './all-reservations.component.html',
  styleUrl: './all-reservations.component.scss'
})
export class AllReservationsComponent implements OnInit{
  reservations: any[] = [];
  rooms: any[] = [];
  displayedColumns: string[] = [
    'GuestName',
    'Room',
    'CheckInDate',
    'CheckOutDate',
    'Status',
    'Actions'
  ];
  constructor(
    private reservationService: ReservationService,
    private roomService: RoomsService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadReservations();
    this.loadRooms();
  }
  loadReservations() {
    this.reservationService.getAllReservations().subscribe((data) => {
      console.log(data);
      this.reservations = data;
    });
  }

  loadRooms() {
    this.roomService.getAllRooms().subscribe((data) => {
      this.rooms = data;
    });
  }

  getRoomDetails(roomId: string) {
    return this.rooms.find((room) => room.id === roomId);
  }

  openUpdateDialog(reservation: any) {
    const dialogRef = this.dialog.open(UpdateStatusDialogBoxComponent, {
      width: '400px',
      data: reservation
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.reservationService.updateReservationStatus(reservation.id, true).subscribe(() => {
          this.loadReservations();
        });
      }
    });
  }
}
