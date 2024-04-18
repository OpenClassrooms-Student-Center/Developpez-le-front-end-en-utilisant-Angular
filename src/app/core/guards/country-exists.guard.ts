import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { OlympicService } from '../services/olympic.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
/**
 * Garde de routage pour vérifier l'existence d'un pays.
 *
 * Ce guard empêche l'accès à une route protégée (par exemple, country-detail.component.ts)
 * si l'identifiant (ID) de pays fourni dans l'URL n'existe pas. Il redirige l'utilisateur
 * vers la page "pas not found" dans ce cas.
 *
 * @export
 * @class CountryExistsGuard
 * @implements {CanActivate}
 */


@Injectable({
  providedIn: 'root',
})


export class CountryExistsGuard implements CanActivate {

  constructor(
    private olympicService: OlympicService,
    private router: Router,
    
  ) { }

  /**
   * Vérifie si l'ID de pays existe avant d'autoriser l'accès à la route.
   *
   * @param {ActivatedRouteSnapshot} route Informations sur la route activée,
   * y compris les paramètres d'itinéraire.
   * @param {RouterStateSnapshot} state État du routeur au moment de la vérification.
   * @returns {Observable<boolean>} Observable émettant `true` si l'ID de pays existe
   * et que l'accès est autorisé, `false` sinon.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    /** Constant pour stocker le countryId */
    const countryId = parseInt(route.params['countryId'], 10);
    console.log('countryId before parsing:', route.params['countryId']);
  
    /** Verifier si le countryID existe dans le local storage */
    const storedCountryId = localStorage.getItem(`countryDetails_${countryId}`);
    if (storedCountryId) {
      console.log('Country ID found in local storage');
      return of(true);
    }
  
    return this.olympicService.getOlympics().pipe(
      map((olympicData) => {
        const medalData = this.olympicService.calculOlympicData(olympicData);
        const countryExists = medalData.some(
          (countryData) => countryData?.extra?.id === countryId
        );
  
        if (countryExists) {
          /**  Recherche les informations de countryID dans le local storage */
          localStorage.setItem(`countryDetails_${countryId}`, JSON.stringify(medalData));
          return true;
        } else {
          this.router.navigate(['/not-found']);
          console.error(
            'Country not found:',
            countryId,
            this.olympicService.calculOlympicData(olympicData)
          );
          console.error(countryExists);
          return false;
        }
      }),
      /** fonction de redirection d'erreur  */
      catchError((error) => {
        console.error('Unexpected error:', error);
        this.router.navigate(['/error']);
        return of(false);
      })
    );
  }
}