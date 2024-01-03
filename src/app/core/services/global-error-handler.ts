import {ErrorHandler, Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {ErrorNotificationService} from "./error-notification.service";

@Injectable()
/**
 * Global Application Error Handler *
 */
export class GlobalErrorHandler implements ErrorHandler{

  constructor(private router: Router, private errorNotificationService : ErrorNotificationService ) {
  }
  handleError(error: any): void {
    const err = error.rejection || error;
    console.error('HTTP error:', err);
    // Push error to Notification Service
    this.errorNotificationService.notification.next(error);
    // redirect to Error URL
    this.router.navigateByUrl('/error');
  }
}
