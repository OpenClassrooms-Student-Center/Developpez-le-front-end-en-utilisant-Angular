import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showBackArrow: boolean = false;

  constructor(public router: Router, public route: ActivatedRoute){
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        this.showBackArrow=event.url.includes('/details/');        
      }
    })
    
  }

  ngOnInit() {   
    
  }

  navigateBack(){
    this.router.navigateByUrl('/home')
  }

}
