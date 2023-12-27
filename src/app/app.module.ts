/**
 * @fileoverview This file defines the `AppModule` for the Angular application.
 * The `AppModule` serves as the root module of the application, organizing and bringing together various components and modules.
 */

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { TitleComponent } from './components/title/title.component';
import { StatisticCardComponent } from './statistic-card/statistic-card.component';
import { DetailsComponent } from './pages/details/details.component';

/**
 * The `AppModule` class.
 * This class decorates the module with `@NgModule`, indicating its nature as an Angular module.
 * It bundles components, other modules, and services used throughout the application.
 */
@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent, 
    NotFoundComponent, 
    PieChartComponent, 
    LineChartComponent,
    TitleComponent,
    StatisticCardComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    HttpClientModule, 
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

