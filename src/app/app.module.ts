import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Shared components
import { DialogComponent } from '@components/shared/index.shared-components';
// Page components
import {
  DetailsComponent,
  HomeComponent,
  NotFoundComponent,
} from '@pages/index.pages';
// Common components
// Layout components
import {
  HeaderComponent,
  FooterComponent,
} from '@components/common/layout/index.layout';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    DialogComponent,
    DetailsComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
