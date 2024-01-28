import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { OlympicService } from '../core/services/olympic.service';

@Injectable({
  providedIn: 'root'
})

export class IdExistsGuard implements CanActivate {
  constructor(private olympicService: OlympicService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = next.params['id']; 
    return this.olympicService.isIdExist(id).pipe(
      map(isId =>
        // isId ?  true : false
        {if (isId) {
          return true; // L'ID existe, autorisez la navigation
        } else {
          // L'ID n'existe pas, redirigez vers une page d'erreur ou une autre page appropriée
          return this.router.createUrlTree(['/not-found']);
        }}
      )
    );
  }
  
}
