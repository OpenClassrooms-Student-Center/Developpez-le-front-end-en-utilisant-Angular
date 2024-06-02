import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailComponent } from './pages/detail/detail.component';
import { CountryGuard } from './core/services/countryGuard.service';
import { OlympicService } from './core/services/olympic.service';
import { catchError, of, switchMap } from 'rxjs';

const olympicResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const olympicService = inject(OlympicService);

  return olympicService.loadInitialData().pipe(
    catchError(error => {
      console.error(error);
      return of(null);
    })
  );
};

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'detail/:country',
    component: DetailComponent,
    canActivate: [CountryGuard],
    resolve: {
      olympicsData: olympicResolver,
    },
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
