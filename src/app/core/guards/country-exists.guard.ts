import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { MedalData } from '../../core/models/MedalData'; // Import MedalData interface
import { OlympicService } from '../services/olympic.service';
import { Observable, of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CountryExistsGuard implements CanActivate {

  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private location: Location
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const countryId = parseInt(route.params['countryId'], 10);
    console.log('countryId before parsing:', route.params['countryId']);
  
    return this.olympicService.getOlympics().pipe(
      switchMap((olympicData) => {
        const medalData = this.olympicService.calculOlympicData(olympicData);
        const countryExists = medalData.some(
          (countryData) => countryData?.extra?.id === countryId
        );
  
        if (countryExists) {
          return of(true);
        } else {
          this.router.navigate(['/not-found']);
          console.error(
            'Country not found:',
            countryId,
            this.olympicService.calculOlympicData(olympicData)
          );
          console.error(countryExists);
          return of(false);
        }
      }),
      catchError((error) => {
        console.error('Unexpected error:', error);
        this.router.navigate(['/error']);
        return of(false);
      })
    );
  }
}
