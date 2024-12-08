import { Component,OnInit } from '@angular/core';
import { RoomsService,IRoom } from '../../Services/rooms.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.component.html',
  styleUrl: './all-rooms.component.scss'
})
export class AllRoomsComponent implements OnInit {
rooms:IRoom[]=[];
filteredRooms: IRoom[] = [];
loading:boolean=true;
error:string='';
selectedRoom: IRoom | null = null; 
specialRequest:string='';

// Filter properties
sortOption: string = ''; // 'asc' or 'desc'
roomTypeFilter: string = '';
maxPersonsFilter: number | null = null;

constructor(private roomService: RoomsService,private router:Router) {}
ngOnInit(): void {
  // Call the service to fetch rooms on component initialization
  this.roomService.getAllRooms().subscribe(
    (data) => {
      this.rooms = data; 
      this.filteredRooms = data;
      this.loading = false;
    },
    (error) => {
      this.error = 'Error fetching rooms'; 
      this.loading = false; 
    }
  );
}
// Select a room
selectRoom(room: IRoom): void {
  this.selectedRoom = room;
}

// Book a room (logic can be expanded to navigate or perform a booking)
bookRoom(room: IRoom): void {
 // localStorage.setItem('selectedRoom', JSON.stringify(room));
 console.log(room);
 if(room.availability){
  this.router.navigate(['/reservation'], { queryParams: {
    id: room.id,
    roomType: room.roomType,
    price: room.price,
    amenities: JSON.stringify(room.amenities), 
    imageUrl: room.imagePath,
    specialRequest:this.specialRequest
  } });
 }else{
  alert("room is not available!!");
 }
}


 // Apply filters
 applyFilters(): void {
  let filtered = [...this.rooms];

  // Filter by room type
  if (this.roomTypeFilter) {
    filtered = filtered.filter(
      (room) => room.roomType === this.roomTypeFilter
    );
  }

  // Filter by max persons
  if (this.maxPersonsFilter !== null) {
    filtered = filtered.filter(
      (room) => room.maxPersons <= (this.maxPersonsFilter ?? 0)
    );
  }

  // Sort by price
  if (this.sortOption === 'asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (this.sortOption === 'desc') {
    filtered.sort((a, b) => b.price - a.price);
  }

  this.filteredRooms = filtered;
}

}
