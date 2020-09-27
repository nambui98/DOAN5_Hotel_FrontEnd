import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { TimekeepingService } from 'src/app/core';
import { CalendarOptions } from '@fullcalendar/angular';
@Component({
  selector: 'app-timekeeping',
  templateUrl: './timekeeping.component.html',
  styleUrls: ['./timekeeping.component.css'],
})
export class TimekeepingComponent implements OnInit {
  events: any[];

  options: any;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2020-09-27' },
      { title: 'event 2', date: '2019-04-02' },
    ],
  };

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }
  constructor(private eventService: TimekeepingService) {}

  ngOnInit() {
    this.eventService.getEvents().then((events) => {
      this.events = events;
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick.bind(this),
        events: events,
        eventColor: '#378006',
        // eventBackgroundColor: '#ff0000',
      };
    });
  }
}
