import { Observable } from 'rxjs';

export interface Header {
  title: string;
  indicator: { description: string; value$: Observable<number | undefined> }[];
}
