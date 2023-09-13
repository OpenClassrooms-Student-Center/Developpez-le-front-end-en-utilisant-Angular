import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NavigationComponent } from './pages/navigation/navigation.component';
import { CountryComponent } from './pages/country/country.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, NavigationComponent, CountryComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, NgxChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
