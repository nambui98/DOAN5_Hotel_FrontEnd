import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Furniture } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {

  constructor(private http: HttpClient) {}
  addnew(furniture:Furniture) {
    debugger
    return this.http
      .post<any>(`${environment.apiUrl}/furnitures`, 
      furniture
      )
      
  }
  update(furniture:Furniture) {
    debugger
   
    return this.http
      .put<any>(`${environment.apiUrl}/furnitures/${furniture.id}`, 
      furniture
      )  
  }
  delete(furniture:Furniture) {
    debugger
    return this.http
      .delete<any>(`${environment.apiUrl}/furnitures/${furniture.id}`)  
  }
  getAll(): Observable<Furniture[]> {
    return this.http.get<Furniture[]>(
      `${environment.apiUrl}/furnitures`
    );
  }
}
