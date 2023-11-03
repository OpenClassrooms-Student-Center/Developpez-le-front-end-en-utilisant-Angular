import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material';

import { HighchartsChartModule } from 'highcharts-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailsComponent } from './pages/details/details.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, DetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
