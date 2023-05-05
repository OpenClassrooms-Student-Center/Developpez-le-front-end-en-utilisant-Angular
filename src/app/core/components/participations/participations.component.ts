import { Component, OnInit } from '@angular/core';
import { OlympicService } from '../../services/olympic.service';
import { Participations } from '../../models/Participation';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-participations',
  templateUrl: './participations.component.html',
  styleUrls: ['./participations.component.scss']
})
export class ParticipationsComponent implements OnInit {
  participations$!: Observable<Participations>;

  constructor(private olympicService: OlympicService ) { }

  ngOnInit(): void {
  }

}
