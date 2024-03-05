import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryComponent } from './pages/country/country.component';

const routes: Routes = [
  {
    path: 'error',
    component: NotFoundComponent,
  },
  {
    path: ':id',
    component: CountryComponent,
    /*I dont use any lazy-loading as the child path has only one component
    It could be good to use that if design gets weirder (with modules at same time)*/
  },
  {
    path: '',
    component: HomeComponent,
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
