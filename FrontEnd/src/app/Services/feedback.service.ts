import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'https://localhost:7171/api/Feedback'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  submitFeedback(feedback: any): Observable<any> {
    return this.http.post(this.apiUrl, feedback);
  }
}
