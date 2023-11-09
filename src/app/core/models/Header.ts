import { Observable } from 'rxjs';
import { HeaderDetails } from './HeaderDetail';

export interface Header {
  title: string;
  headerDetails$: Observable<HeaderDetails[]>;
}
