import { Component, OnInit } from '@angular/core';
import { wording } from 'src/app/utils/wording';

/**
 * Provided not found component.
 * Updated with custom design and wording.
 */
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  public wording = wording;

  constructor() { }

  ngOnInit(): void {
  }

}
