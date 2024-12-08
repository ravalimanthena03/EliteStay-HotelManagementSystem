import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RoomsService,IRoom  } from '../Services/rooms.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  reviewsUsers: any[] = []; // Array to store reviews fetched from DB
  reviewForm: FormGroup;
  currentSlide = 0; // For carousel functionality
  defaultImage = 'path/to/default/image.jpg'; // Replace with your default image pat

  rooms:IRoom[]=[];
  loading:boolean=true;
  error:string='';
  reviews = [
    {
      name: 'John Doe',
      image: './assets/images/Hotels/happyman1.jpg',
      comment: 'An absolutely delightful stay! Everything was perfect, from the service to the ambiance.',
      rating:4
    },
    {
      name: 'Jane Smith',
      image: './assets/images/Hotels/happyman2.avif',
      comment: 'A true haven of luxury. The staff was so accommodating, and the rooms were impeccable.',
      rating:5
    },
    {
      name: 'Emily Brown',
      image: './assets/images/Hotels/happywomen1.jpg',
      comment: 'Loved the amenities and the peaceful atmosphere. Can\'t wait to return!',
      rating:5
    }
  ];

  // Model for new review
  newReview = {
    name: '',
    comment: ''
  };

  @ViewChild('carousel', { static: false }) carousel!: ElementRef;
  constructor(private roomService: RoomsService,private router:Router,private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      rating: [null, Validators.required],
      comment: ['', Validators.required],
    });
  }

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
   this.reviewsUsers=this.reviews;
 }

 redirectToAllRooms(): void {
  this.router.navigate(['/all-rooms']);
}


fetchReviews(): void {
  // this.reviewsService.getReviews().subscribe(
  //   (data: any[]) => {
  //     this.reviews = data;
  //   },
  //   (error) => {
  //     console.error('Error fetching reviews:', error);
  //   }
  // );
}

submitReview(): void {
  // if (this.reviewForm.valid) {
  //   const newReview = {
  //     ...this.reviewForm.value,
  //     reviewDate: new Date(),
  //   };
  //   this.reviewsService.addReview(newReview).subscribe(
  //     (response) => {
  //       alert('Review submitted successfully!');
  //       this.fetchReviews(); // Refresh reviews list
  //     },
  //     (error) => {
  //       console.error('Error submitting review:', error);
  //     }
  //   );
  // }
}

// Carousel Navigation
prevSlide(): void {
  this.currentSlide = (this.currentSlide - 1 + this.reviews.length) % this.reviews.length;
}

nextSlide(): void {
  this.currentSlide = (this.currentSlide + 1) % this.reviews.length;
}
 // Add Review Method
//  addReview(event: Event): void {
//   event.preventDefault();
//   if (this.newReview.name && this.newReview.comment) {
//     this.reviews.push({
//       name: this.newReview.name,
//       image: 'https://via.placeholder.com/100', // Placeholder image for now
//       comment: this.newReview.comment
//     });
//     this.newReview = { name: '', comment: '' };
//   }
// }
}
