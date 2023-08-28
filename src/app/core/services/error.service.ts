import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private $message! : string;
  constructor(private router: Router) { }


  setMessageError(message? : string){
    if (!message)
      message = "An error has occurred";
    this.$message = message;
    this.redirect();
    return this.$message;
  }

  getMessage(): string {
    let message = this.$message
    this.$message = "";
    return message
  }

  redirect() {
    this.router.navigateByUrl("/error");
  }
}
