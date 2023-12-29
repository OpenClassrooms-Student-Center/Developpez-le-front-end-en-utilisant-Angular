import { Component } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private headerService: HeaderService) {}

  title = "No Title";
  infos : Map<string, number> = new Map<string, number>();

  ngOnInit(): void {
    this.headerService.title.subscribe(updatedTitle => {
      this.title = updatedTitle;
    });
    this.headerService.infos.subscribe(updateInfos => {
      this.infos = updateInfos;
    });
  }
}
