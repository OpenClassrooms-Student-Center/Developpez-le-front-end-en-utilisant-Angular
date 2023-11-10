import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

/**
 * Component representing the 404 page.
 */
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  constructor(
    private titleMetaTagService: Title,
    private otherMetaTagsService: Meta
  ) {}

  ngOnInit(): void {
    this.titleMetaTagService.setTitle('404 page');
  }
}
