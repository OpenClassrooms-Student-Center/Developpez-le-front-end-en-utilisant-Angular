import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

// Shared components
import {
  SpinLoaderComponent,
  TooltipComponent,
  InfoCardComponent,
  InfoIndicatorsComponent,
} from '@components/shared/index.shared-components';
// Page components
import {
  DetailsComponent,
  HomeComponent,
  NotFoundComponent,
} from '@pages/index.pages';
// Common components
// Layout components
import {
  HeaderComponent,
  FooterComponent,
} from '@components/common/layout/index.layout';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    DetailsComponent,
    HeaderComponent,
    FooterComponent,
    SpinLoaderComponent,
    InfoCardComponent,
    TooltipComponent,
    InfoIndicatorsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule, // Will throw an error if uncommented
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
