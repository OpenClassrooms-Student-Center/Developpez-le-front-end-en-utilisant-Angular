import { Component } from '@angular/core';
import { OlympicService } from '../../core/Services/olympic.service';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss'
})
export class NotFoundComponent {
  
constructor(private olympicService: OlympicService) {}

  backToHome() {
    this.olympicService.backToHome();
  } 
}
