import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartsService } from '../../../Services/charts.service';
Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  //reservations:any[]=[];
  totalRevenue: number = 0;
  totalRoomsBooked: number = 0;
  dailyRevenue: { date: string; revenue: number }[] = [];
  reservations: any[] = [];
  feedbacks:any[]=[];
  lowestServiceRating: any = null;
  highestServiceRating: any = null;
  lowestDiningRating: any = null;
  highestDiningRating: any = null;
  lowestStaffRating: any = null;
  highestStaffRating: any = null;
  chart:any;
  constructor(private chartsServices:ChartsService) {}
  
  ngOnInit(): void {
    this.fetchReservations();
    this.fetchFeedbacks();
  }
  
  fetchReservations(){
    this.chartsServices.getAllReservations().subscribe((data) => {
      this.reservations = data;
      console.log(this.reservations);
      this.calculateMetrics();
      this.generateCharts();
    });
  }
  
  fetchFeedbacks(){
    this.chartsServices.getFeedbacks().subscribe((data)=>{
      this.feedbacks=data;
      console.log(this.feedbacks);
      this.processReviewData(this.feedbacks);
    })
  }
  calculateMetrics() {
    const revenueMap: { [key: string]: number } = {};
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);
    this.reservations.forEach((reservation) => {
      const createdDate = new Date(reservation.createdAt);
      const checkInDate = new Date(reservation.checkInDate);
      const checkOutDate = new Date(reservation.checkOutDate);

      if (reservation.status) {
        this.totalRevenue += reservation.totalPrice;
        this.totalRoomsBooked++;

        if (createdDate >= lastWeek && createdDate <= today) {
          const formattedDate = createdDate.toISOString().split('T')[0];
          revenueMap[formattedDate] = (revenueMap[formattedDate] || 0) + reservation.totalPrice;
        }
      }
    });

    this.dailyRevenue = Object.entries(revenueMap).map(([date, revenue]) => ({
      date,
      revenue,
    }));
  }

  generateCharts() {
    // Pie Chart for Revenue vs Rooms Booked
    new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ['Total Revenue', 'Total Rooms Booked'],
        datasets: [
          {
            data: [this.totalRevenue, this.totalRoomsBooked],
            backgroundColor: ['#42A5F5', '#FFA726'],
          },
        ],
      },
    });

    // Bar Chart for Daily Revenue
    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: this.dailyRevenue.map((entry) => entry.date),
        datasets: [
          {
            label: 'Daily Revenue',
            data: this.dailyRevenue.map((entry) => entry.revenue),
            backgroundColor: '#66BB6A',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: 'Date' } },
          y: { title: { display: true, text: 'Revenue (₹)' } },
        },
      },
    });
  }
  

  processReviewData(data: any[]): void {
    const totalReviews = data.length;

    // Calculate averages for each category
    const avgServiceRating = data.reduce((sum, review) => sum + review.serviceRating, 0) / totalReviews;
    const avgDiningRating = data.reduce((sum, review) => sum + review.diningRating, 0) / totalReviews;
    const avgStaffRating = data.reduce((sum, review) => sum + review.staffRating, 0) / totalReviews;

    // Find the lowest and highest ratings for each category
    this.lowestServiceRating = data.reduce((lowest, current) =>
      current.serviceRating < lowest.serviceRating ? current : lowest
    );

    this.highestServiceRating = data.reduce((highest, current) =>
      current.serviceRating > highest.serviceRating ? current : highest
    );

    this.lowestDiningRating = data.reduce((lowest, current) =>
      current.diningRating < lowest.diningRating ? current : lowest
    );

    this.highestDiningRating = data.reduce((highest, current) =>
      current.diningRating > highest.diningRating ? current : highest
    );

    this.lowestStaffRating = data.reduce((lowest, current) =>
      current.staffRating < lowest.staffRating ? current : lowest
    );

    this.highestStaffRating = data.reduce((highest, current) =>
      current.staffRating > highest.staffRating ? current : highest
    );

    // Create the chart
    this.createAverageChart(avgServiceRating, avgDiningRating, avgStaffRating);
  }


  createAverageChart(avgServiceRating: number, avgDiningRating: number, avgStaffRating: number): void {
    this.chart = new Chart('reviewsChart', {
      type: 'bar',
      data: {
        labels: ['Service', 'Dining', 'Staff'],
        datasets: [
          {
            label: 'Average Rating',
            data: [avgServiceRating, avgDiningRating, avgStaffRating],
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Average Ratings for Service, Dining, and Staff'
          }
        },
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true,
            max: 5
          }
        }
      }
    });
  }
}

