import { Component, OnInit } from '@angular/core';
import { RoomsService,IRoom} from '../../Services/rooms.service';
import {  ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent implements OnInit{
 rooms:IRoom[]=[];
 loading:boolean=true;
 error:string='';
 @ViewChild('carousel', { static: false }) carousel!: ElementRef;
 constructor(private roomService: RoomsService) {}
 ngOnInit(): void {
  // Call the service to fetch rooms on component initialization
  this.roomService.getRoomsUnique().subscribe(
    (data) => {
      this.rooms = data; // Assign data to rooms array
      this.loading = false; // Stop loading
    },
    (error) => {
      this.error = 'Error fetching rooms'; // Handle error
      this.loading = false; // Stop loading
    }
  );
}
scrollLeft(): void {
  this.carousel.nativeElement.scrollBy({
    left: -200,
    behavior: 'smooth'
  });
}

scrollRight(): void {
  this.carousel.nativeElement.scrollBy({
    left: 200,
    behavior: 'smooth'
  });
}
}
