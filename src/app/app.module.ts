import { HttpClientModule } from '@angular/common/http';
import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { OlympicsDetailsComponent } from './components/olympics-details/olympics-details.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {GlobalErrorHandler} from "./core/services/global-error-handler";
import { ErrorComponent } from './pages/error/error.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, DashboardComponent, OlympicsDetailsComponent, ErrorComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgxChartsModule, BrowserAnimationsModule],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
