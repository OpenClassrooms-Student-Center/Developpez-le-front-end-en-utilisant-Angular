import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomErrorHandler implements ErrorHandler {
  handleError(error: HttpErrorResponse): Observable<any> {
    const err = 'Une erreur s\'est produite pendant l\'accès aux données. Veuillez réessayer plus tard.';
    return throwError(() => err);
  }
}
