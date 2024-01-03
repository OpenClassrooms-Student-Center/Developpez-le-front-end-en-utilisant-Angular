import {Component, OnDestroy, OnInit} from '@angular/core';
import {ErrorNotificationService} from "../../core/services/error-notification.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy{

  private subscription !: Subscription;
  public error!: Error;

  constructor(private errorNotificationService : ErrorNotificationService) {
  }

  public ngOnInit() {
    // Subscribe to ErrorNotificationService Observable
    this.subscription = this.errorNotificationService.notification.subscribe({
      next: (error) => {
        this.error = error;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
