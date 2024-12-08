import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestsService {

  constructor(private http: HttpClient) {}

  fetchServiceRequests(): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7171/api/ServiceRequest/GetAllServiceRequests`);
  }
  updateServiceRequest(request: any): Observable<any> {
    return this.http.put(`https://localhost:7171/api/ServiceRequest/GetAllServiceRequests/assign`,request);
  }

  getStaffSchedules():Observable<any>{
    return this.http.get('https://localhost:7171/api/StaffSchedule/GetAllStaffSchedules');
  }
  getScheduleById(scheduleId: string): Observable<any> {
    return this.http.get<any>(`https://localhost:7171/api/StaffSchedule/${scheduleId}`);
  }
  getScheduleByStaffId(staffId:string):Observable<any>{
     return this.http.get<any>(`https://localhost:7171/api/StaffSchedule/by-staff/${staffId}`);
  }
  assignTask(schedule: any) {
    return this.http.put(`https://localhost:7171/api/TaskAssignment/Create`, schedule);
  }
  getAvailableStaff(shiftStartTime: string, shiftEndTime: string) {
    const apiUrl = `https://localhost:7171/api/StaffSchedule/GetAvailableStaff?shiftStartTime=${new Date(shiftStartTime)}&shiftEndTime=${new Date(shiftEndTime)}`;
    return this.http.get<any[]>(apiUrl);
  }
  //
  createStaffSchedule(schedule: any): Observable<string> {
    return this.http.post(`https://localhost:7171/api/StaffSchedule/create`, schedule, { responseType: 'text' });
  }
  //
  updateStaffSchedule(schedule: any): Observable<string> {
    return this.http.put(`https://localhost:7171/api/StaffSchedule/update`, schedule, { responseType: 'text' });
  }
  //
  getStaffOfHousekeeping(){
    return this.http.get('https://localhost:7171/api/Auth/getUsersByRole?role=Housekeeping');
  }
   getAssignedTasks(email: string): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7171/api/ServiceRequest/getTasksForLoggedInUser?email=${email}`);
  }

  completeTask(taskId: string): Observable<any> {
    return this.http.put(`https://localhost:7171/api/ServiceRequest/complete/${taskId}`, {});
  }
}
