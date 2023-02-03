import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ChartModule } from 'primeng/chart';     //accordion and accordion tab
import { ChartService } from './chart.service';
import { RouterModule } from '@angular/router';
import { DataBlockComponent } from './data-block/data-block.component';
import { H2ContainerComponent } from './h2-container/h2-container.component';

@NgModule({
  declarations: [
    HeaderComponent,
    DataBlockComponent,
    H2ContainerComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    ChartModule,
    DataBlockComponent,
    H2ContainerComponent
  ],
  providers: [ChartService]
})
export class SharedModule { }
