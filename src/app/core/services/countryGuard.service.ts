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
      console.log('Country not found');
      return of(false);
    }

    return this.olympicService.loadInitialData().pipe(
        switchMap(() => this.olympicService.isCountryInDatabase(country)),
        map(isInDb => {
          if (!isInDb) {
            return this.router.createUrlTree(['']);
          }
          return true;
        }),
        catchError(() => {
          return of(this.router.createUrlTree(['']));
          
        })
      );
    }
  }

