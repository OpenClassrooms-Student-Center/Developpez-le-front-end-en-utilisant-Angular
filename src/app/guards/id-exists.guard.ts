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
      map(isId =>{
          if (isId) return true;
          else return this.router.createUrlTree(['/not-found']);
        }
      )
    );
  }
  
}
