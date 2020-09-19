import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { ClientComponent } from './client.component';

import { AboutUsComponent, ContactUsComponent, HomeComponent } from './pages';

import { SharedModule } from '../shared';

@NgModule({
  imports: [HomeRoutingModule, SharedModule],
  providers: [],
  declarations: [
    ClientComponent,
    AboutUsComponent,
    ContactUsComponent,
    HomeComponent,
  ],
})
export class HomeModule {}
