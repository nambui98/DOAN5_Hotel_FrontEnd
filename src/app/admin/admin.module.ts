import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';

import {
  UserComponent,
  RightsComponent,
  DashboardComponent,
  AdminComponent,
} from './pages';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SigninComponent } from './pages/signin/signin.component';
// import { ClientComponent } from './pages/client/client.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
//add
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  JwtInterceptor,
  ErrorInterceptor,
  fakeBackendProvider,
} from './helpers';
import { RoomsComponent } from './pages/rooms/rooms.component';
//end
@NgModule({
  declarations: [
    //add

    //end
    UserComponent,
    RightsComponent,
    DashboardComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    NotFoundComponent,
    SigninComponent,
    RoomsComponent,
    // ClientComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminRoutingModule,
  ],
  providers: [
    authInterceptorProviders,
    //add
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,
    //end
  ],
  bootstrap: [AdminComponent],
})
export class AdminModule {}
