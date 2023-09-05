import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found.component';
import { NotFoundRoutingModule } from './not-found-routing,module';

const route : Routes =[
  { path : '', component : NotFoundComponent}
]

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    NotFoundRoutingModule
  ]
})
export class NotFoundModule { }
