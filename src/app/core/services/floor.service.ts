import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Floor } from '../models';
@Injectable({
  providedIn: 'root'
})
export class FloorService {

  constructor(private http: HttpClient) {}
  addnew(floor:Floor) {
    debugger
    floor.status=1;
    return this.http
      .post<any>(`${environment.apiUrl}/floors`, 
       floor
      )
      
  }
  update(floor:Floor) {
    debugger
   
    return this.http
      .put<any>(`${environment.apiUrl}/floors/${floor.id}`, 
       floor
      )  
  }
  delete(floor:Floor) {
    debugger
    return this.http
      .delete<any>(`${environment.apiUrl}/floors/${floor.id}`)  
  }
  getAll(): Observable<Floor[]> {
    return this.http.get<Floor[]>(
      `${environment.apiUrl}/floors`
    );
  }
}
