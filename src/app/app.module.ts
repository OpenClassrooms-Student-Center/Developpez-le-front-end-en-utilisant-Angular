import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailComponent } from './pages/detail/detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TitleComponent } from './components/title/title.component';
import { CounterComponent } from './components/counter/counter.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfobarComponent } from './components/infobar/infobar.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, DetailComponent, TitleComponent, CounterComponent, NavbarComponent, InfobarComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgxChartsModule, BrowserAnimationsModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
