import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  private apiUrl = 'https://localhost:7009/api/User';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // POST Request to create a new user
  createUser(user: any){
    return this.http.post<any>(this.apiUrl, user);
  }

  // PUT Request to update user data
  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, userData);
  }
  

}
