import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { HomeModule } from './home/home.module';
import { GithubModule } from './github/github.module';
import { SharedModule } from './shared';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
// import { NotFoundComponent } from './not-found.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HomeModule,
    AdminModule,
    GithubModule,
    SharedModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
