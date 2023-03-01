import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CountryDataComponent } from './pages/country-data/country-data.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatisticCardComponent } from './core/components/statistic-card/statistic-card.component';
import { StatisticCardListComponent } from './core/components/statistic-card-list/statistic-card-list.component';


@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, CountryDataComponent, StatisticCardComponent, StatisticCardListComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgxChartsModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {}
