import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  onViewFaceSnap() {
    this.router.navigateByUrl(`dashboard`);
  }
}
