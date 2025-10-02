import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Buy } from './buy';

@Injectable({
  providedIn: 'root'
})
export class BuyService {
  private apiUrl = 'http://localhost:8080/buys';

  constructor(private http: HttpClient) {}

  getAllBuys(): Observable<Buy[]> {
    return this.http.get<Buy[]>(`${this.apiUrl}/allBuys`);
  }
}
