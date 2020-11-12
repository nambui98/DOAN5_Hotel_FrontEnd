import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Admin } from '../models';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}
  addnew(admin:Admin) {
    debugger
    admin.status=1;
    return this.http
      .post<any>(`${environment.apiUrl}/admins`, 
       admin
      )
      
  }
  update(admin:Admin) {
    debugger
   
    return this.http
      .put<any>(`${environment.apiUrl}/admins/${admin.id}`, 
      admin
      )  
  }
  delete(admin:Admin) {
    return this.http
      .delete<any>(`${environment.apiUrl}/admins/${admin.id}`)  
  }
  getAll(): Observable<Admin[]> {
    return this.http.get<Admin[]>(
      `${environment.apiUrl}/admins`
    );
  }
}
