import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Booking } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) {}
  addnew(booking:Booking) {
    debugger
    // booking.BookingTimeNow=new Date.now();
    return this.http
      .post<any>(`${environment.apiUrl}/bookings`, 
      booking
      )
      
  }
  update(booking:Booking) {
    debugger
   
    return this.http
      .put<any>(`${environment.apiUrl}/bookings/${booking.id}`, 
      booking
      )  
  }
  delete(booking:Booking) {
    debugger
    return this.http
      .delete<any>(`${environment.apiUrl}/bookings/${booking.id}`)  
  }
  getAll(): Observable<Booking[]> {
    return this.http.get<Booking[]>(
      `${environment.apiUrl}/bookings`
    );
  }
  getByIdRoom(idRoom): Observable<Booking[]> {
    return this.http.get<Booking[]>(
      `${environment.apiUrl}/bookings/getByIdRoom/${idRoom}`
    );
  }
}
