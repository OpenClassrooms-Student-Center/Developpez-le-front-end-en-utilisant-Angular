import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
    handleError(error:Error) {
      console.error(error);
    }
  }