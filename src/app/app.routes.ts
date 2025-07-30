import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home';
import { CountryDetail } from './Pages/country-detail/country-detail';
import { NotFoundComponent } from './Pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'detail/:name', component: CountryDetail},
  {path: '**', component: NotFoundComponent}
];