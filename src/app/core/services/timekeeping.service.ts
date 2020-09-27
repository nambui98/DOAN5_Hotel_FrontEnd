import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimekeepingService {
  constructor(private http: HttpClient) {}

  getEvents() {
    return this.http
      .get<any>('assets/test/scheduleevents.json')
      .toPromise()
      .then((res) => <any[]>res.data)
      .then((data) => {
        return data;
      });
  }
}
