import { Component, OnInit } from '@angular/core';
import { OlympicService } from '../../services/olympic.service';
import { Observable } from 'rxjs';
import { Olympic } from '../../models/Olympic';

@Component({
  selector: 'app-olympic',
  templateUrl: './olympic.component.html',
  styleUrls: ['./olympic.component.scss']
})
export class OlympicComponent implements OnInit {
  olympic$!: Observable<Olympic>;

  constructor(private olympicService: OlympicService ) { }

  ngOnInit(): void {
  }

}
