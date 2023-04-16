import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { wording } from 'src/app/utils/wording';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  public environment = environment;
  public wording = wording;

}
