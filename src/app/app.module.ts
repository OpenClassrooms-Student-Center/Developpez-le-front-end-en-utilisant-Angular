import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogComponent } from '@components/shared/index.shared-components';
import {
  DetailsComponent,
  HomeComponent,
  NotFoundComponent,
} from '@pages/index.pages';
import { HeaderComponent } from './components/common/layout/header/header.component';
import { FooterComponent } from './components/common/layout/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    DialogComponent,
    DetailsComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
