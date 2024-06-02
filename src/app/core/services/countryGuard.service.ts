import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { OlympicService } from './olympic.service';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CountryGuard {
  constructor(private olympicService: OlympicService, private router: Router) {}

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const country = route.paramMap.get('country');
    
    if (!country) {
      console.log('No country provided in the route. Redirecting to home page.');
      return of(false);
    }

    return this.olympicService.loadInitialData().pipe(
        switchMap(() => this.olympicService.isCountryInDatabase(country)),
        map(isInDb => {
          if (!isInDb) {
            console.log('Country not found in the database. Redirecting to home page.');
            return this.router.createUrlTree(['']);
          }
          return true;
        }),
        catchError(() => {
          console.log('An error occured. Redirecting to home page.');
          return of(this.router.createUrlTree(['']));
          
        })
      );
    }
  }

