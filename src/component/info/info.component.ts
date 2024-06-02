import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent implements OnInit {
  @Input() info!: string;
  @Input() value!: number;

  constructor() {}

  ngOnInit(): void {}
}
