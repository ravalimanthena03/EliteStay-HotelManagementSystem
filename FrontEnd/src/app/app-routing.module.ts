import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './Pages/signin/signin.component';
import { RoomComponent } from './Pages/room-carousel/room.component';
import { CarouselComponent } from './carousel/carousel.component';
import { AllRoomsComponent } from './Pages/all-rooms/all-rooms.component';
import { ReservationComponent } from './Pages/Guest/reservation/reservation.component';
import { MyBookingsComponent } from './Pages/Guest/my-bookings/my-bookings.component';
import { ReceptionistDashboardComponent } from './Pages/receptionist/receptionist-dashboard/receptionist-dashboard.component';
import { AllReservationsComponent } from './Pages/receptionist/all-reservations/all-reservations.component';
import { HomeComponent } from './home/home.component';
import { DemoComponent } from './demo/demo.component';
import { ManagerDashboardComponent } from './Pages/Manager/manager-dashboard/manager-dashboard.component';
import { ServiceRequestsComponent } from './Pages/Manager/service-requests/service-requests.component';
import { StaffSchedulesComponent } from './Pages/Manager/staff-schedules/staff-schedules.component';
import { HousekeepingDashboardComponent } from './Pages/HouseKeeping/housekeeping-dashboard/housekeeping-dashboard.component';
import { TasksAssignedComponent } from './Pages/HouseKeeping/tasks-assigned/tasks-assigned.component';
import { ScheduleFormComponent } from './Pages/Manager/schedule-form/schedule-form.component';
import { MarkAttendanceComponent } from './Pages/HouseKeeping/mark-attendance/mark-attendance.component';
import { ChartsComponent } from './Pages/Manager/charts/charts.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'rooms', component: RoomComponent },
  { path: 'guests', component:CarouselComponent },
  { path: 'all-rooms', component:AllRoomsComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'user-bookings', component: MyBookingsComponent },
  { path: 'manager', component: ManagerDashboardComponent },
  { path: 'receptionist', component: ReceptionistDashboardComponent },
  { path: 'service-requests', component: ServiceRequestsComponent },
  { path: 'staff-schedules', component: StaffSchedulesComponent },
  { path: 'housekeeping', component: HousekeepingDashboardComponent },
  { path: 'tasks-assigned', component: TasksAssignedComponent },
  { path: 'schedules', component: ScheduleFormComponent },
  { path: 'schedules/create', component: ScheduleFormComponent },
  { path: 'schedules/edit/:id', component: ScheduleFormComponent },
  { path: 'mark-attendance', component: MarkAttendanceComponent },
  { path: 'charts', component: ChartsComponent },
  {path:'receptionist',
    children: [
      { path: '', component: AllReservationsComponent },
      { path: 'all-reservations', component: AllReservationsComponent },
    ],
  },
  {
    path:'demo',component:DemoComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
