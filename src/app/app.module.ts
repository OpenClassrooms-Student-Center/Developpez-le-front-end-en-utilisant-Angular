import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import { ResponsiveAppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeaderComponent } from './commons/header/header.component';
import { FooterComponent } from './commons/footer/footer.component';
import { DetailsComponent } from './pages/details/details.component';

@NgModule({
  declarations: [ResponsiveAppComponent, HomeComponent, NotFoundComponent, HeaderComponent, FooterComponent, DetailsComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule, NgChartsModule, MatProgressSpinnerModule, MatIconModule],
  providers: [],
  bootstrap: [ResponsiveAppComponent],
})
export class AppModule {}
