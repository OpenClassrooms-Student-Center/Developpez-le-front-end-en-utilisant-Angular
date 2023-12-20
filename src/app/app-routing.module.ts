import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailLineComponent } from './pages/detail-line/detail-line.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },


  {
     path: 'detail/:countryName',
    component: DetailLineComponent 
  },
    {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
