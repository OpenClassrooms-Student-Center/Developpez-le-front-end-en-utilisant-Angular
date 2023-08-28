import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/core/services/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  
  errorMessage!: string;

  constructor(private errorService : ErrorService){}

  ngOnInit(): void {
   this.errorMessage = this.errorService.getMessage();
   console.log(this.errorMessage);
   
  }
}
