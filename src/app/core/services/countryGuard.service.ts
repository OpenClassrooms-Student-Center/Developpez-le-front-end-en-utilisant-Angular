import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { OlympicService } from './olympic.service';
import { catchError, first, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CountryGuard implements CanActivate {
  constructor(private olympicService: OlympicService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const country = route.paramMap.get('country');
    if (!country) {
      console.log('Country not found');
      return of(false);
    }

    return this.olympicService.loadInitialData().pipe(
        switchMap(() => this.olympicService.isCountryInDatabase(country)),
        map(isInDb => {
          if (!isInDb) {
            this.router.navigate(['']);
            return false;
          }
          return true;
        }),
        catchError(() => {
          this.router.navigate(['']);
          return of(false);
        })
      );
    }
  }
