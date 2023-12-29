import {ErrorHandler, Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {ErrorNotificationService} from "./error-notification.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler{

  constructor(private router: Router, private errorNotificationService : ErrorNotificationService ) {
  }
  handleError(error: any): void {
    const err = error.rejection || error;
    console.error('HTTP error:', err);
    this.errorNotificationService.notification.next(error);
    this.router.navigateByUrl('/error');
  }
}
