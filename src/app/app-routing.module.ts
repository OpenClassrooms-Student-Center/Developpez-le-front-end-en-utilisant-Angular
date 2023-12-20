import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {OlympicsDetailsComponent} from "./components/olympics-details/olympics-details.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const routes: Routes = [

  {
    path: '',
    component : HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'details/:id',
    component: OlympicsDetailsComponent,
  },

  {
    path: '**', // wildcard
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
