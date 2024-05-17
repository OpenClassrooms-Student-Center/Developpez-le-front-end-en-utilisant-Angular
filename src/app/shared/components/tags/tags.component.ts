import {Component, Input, numberAttribute} from '@angular/core';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss'
})
export class TagsComponent {
  @Input({required: true}) title!: string;
  @Input({transform: numberAttribute, required: true}) counter!: number;

}
