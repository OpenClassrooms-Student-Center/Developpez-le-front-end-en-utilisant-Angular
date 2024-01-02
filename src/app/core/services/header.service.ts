import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  title = new BehaviorSubject('');
  infos = new BehaviorSubject<Map<string, number>>(new Map<string, number>);

  setTitle(title: string) {
    this.title.next(title);
  }

  setInfos(infos : Map<string, number>) {
    this.infos.next(infos);
  }
}
