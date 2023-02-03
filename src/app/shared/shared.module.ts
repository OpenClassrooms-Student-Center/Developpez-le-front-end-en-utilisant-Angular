import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {ChartModule} from 'primeng/chart';     //accordion and accordion tab
import { ChartService } from './chart.service';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [
    HeaderComponent,
    ChartModule,
  ],
  providers: [ChartService]
})
export class SharedModule { }
