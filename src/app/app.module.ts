import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgChartsModule } from 'ng2-charts';
import { CountryComponent } from './pages/country/country.component';
import { HeaderComponent } from './pages/header/header.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, CountryComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgChartsModule], //lib
  providers: [],
  bootstrap: [AppComponent],
  exports: [HeaderComponent],
})
export class AppModule {}
