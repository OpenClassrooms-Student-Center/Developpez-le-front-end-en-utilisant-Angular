import {ErrorHandler, Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler{

  constructor(private router: Router) {
  }
  handleError(error: any): void {
    const err = error.rejection || error;
    console.error('Application error:', err);
    this.router.navigateByUrl('/error');
  }

}
