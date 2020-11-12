import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  Room, RoomPrice } from '../models';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RoomService {


  constructor(private http: HttpClient) {}

  getAll(): Observable<Room[]> {
    return this.http.get<Room[]>(
      `${environment.apiUrl}/rooms`
    );
  }
  getByFloor(id_floor:number): Observable<Room[]> {
    return this.http.get<Room[]>(
      `${environment.apiUrl}/rooms/getByFloor/${id_floor}`
    );
  }
  changeStatus(id_room:number, status:number): Observable<Room[]> {
    return this.http.put<Room[]>(
      `${environment.apiUrl}/rooms/ChangeStatus/${id_room}`,{"status":status}
    );
  }
  
}
