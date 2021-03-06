import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  UserComponent,
  RightsComponent,
  DashboardComponent,
  AdminComponent,
  NotFoundComponent,
  SigninComponent,
} from './pages';
//add
import { AuthGuard } from './helpers/auth.guard';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { RoomManageComponent } from './pages/room-manage/room-manage.component';
import { TimekeepingComponent } from './pages/timekeeping/timekeeping.component';
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
      { path: 'rights', component: RightsComponent, canActivate: [AuthGuard] },
      {
        path: 'folow-rooms',
        component: RoomsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'rooms',
        component: RoomManageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'time-keeping',
        component: TimekeepingComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'admin',
    children: [{ path: 'login', component: SigninComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
