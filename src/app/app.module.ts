import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MedalCountryChartComponent } from './components/medal-country-chart/medal-country-chart.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { CountryDetailsComponent } from './pages/country-details/country-details.component';


@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, MedalCountryChartComponent, CountryDetailsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgxChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
