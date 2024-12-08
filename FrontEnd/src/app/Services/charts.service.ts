import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private http:HttpClient) { }

  getAllReservations():Observable<any>{
   return this.http.get<any>('https://localhost:7171/api/Reservation');
  }
  getFeedbacks():Observable<any>{
    return this.http.get<any>('https://localhost:7171/api/Feedback');
  }
}
