import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface IRoom {
  id: string;
  roomType: string;
  price: number;
  maxPersons:number;
  bedType: string;
  view: string;
  status: string;
  availability: boolean;
  amenities: string[];
  imagePath: string;
}
@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private apiUrl = 'https://localhost:7171/api/Room'; 
  constructor(private http: HttpClient) {}

  // Method to fetch room data from the backend
  getRoomsUnique(): Observable<IRoom[]> {
    return this.http.get<IRoom[]>(`${this.apiUrl}/uniqueByType`);
  }
  getAllRooms():Observable<IRoom[]> {
    return this.http.get<IRoom[]>(`${this.apiUrl}`)
  }
}
