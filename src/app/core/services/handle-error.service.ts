import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class MyErrorHandlerService implements ErrorHandler {

  constructor() {
  }
  
  handleError(error: any): void {
      console.error(error);
    }
  }