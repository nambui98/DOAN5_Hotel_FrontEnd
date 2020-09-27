import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimekeepingService } from '../../../core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
]);
@NgModule({
  declarations: [],
  providers: [TimekeepingService],
  imports: [CommonModule],
})
export class TimekeepingModule {}
