import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 public isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  public roleSubject = new BehaviorSubject<string | null>(null);
  role$ = this.roleSubject.asObservable();

  private apiUrl = 'https://localhost:7171/api/Auth'; // Base API URL

  constructor(private http: HttpClient ,private router:Router) {}

  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  login(email: string, passwordHash: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, passwordHash });
  }

  // Check login status from local storage
  private checkLoginStatus(): boolean {
    return !!localStorage.getItem('email');
  }
   logout():void{
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.setItem('role','Guest');
    this.roleSubject.next('Guest');
    this.router.navigate(['/home']);
   }
}
