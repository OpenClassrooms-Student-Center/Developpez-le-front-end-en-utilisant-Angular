import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';
import { BrowserModule } from '@angular/platform-browser';
import { SwimlaneComponent } from './pages/swimlane/swimlane.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    CountryDetailsComponent,
    SwimlaneComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
