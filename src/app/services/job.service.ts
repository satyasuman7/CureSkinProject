import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private baseUrl = 'https://hacker-news.firebaseio.com/v0';

  constructor(private http: HttpClient) { }

  fetchJobIds(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/jobstories.json`);
  }

  fetchJobDetails(jobId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/item/${jobId}.json`);
  }
}
