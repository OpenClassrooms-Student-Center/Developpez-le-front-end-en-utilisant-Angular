import { Component, OnInit } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Olympic } from 'src/app/core/models/Olympic';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit{
  // pour lier mon observable au template. J'initialise ma séquence d'observable avec un objet vide
  public olympic$: Observable<Olympic> = of(<Olympic>{});
  public subscription: Subscription = new Subscription();

  constructor(private olympicService: OlympicService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id: number = +this.route.snapshot.params['id'];

    this.olympic$ = this.olympicService.getOlympics()
      .pipe(
        map((olympics: Olympic[]) => olympics.find(olympic => olympic.id == id)),
        tap((value: any) => console.log(value))
      )

    // this.subscription.add(this.olympicService.getOlympics()
    //   .pipe(
        // dans la liste des Olympics, on va rechercher l'Olympic qui correspond à l'id
      //   map((olympics: Olympic[]) => olympics.find(olympic => olympic.id == id)),
      //   tap((value: any) => console.log(value))
      // )
      // on recoit qu'un seul olympic
      // .subscribe(
      //   (olympic: Olympic) => {
      //   this.olympic = olympic;
      //   console.log('olympic:', this.olympic)
      // }
      // ));
  }

  // ngOnDestroy(): void {
  //    this.subscription.unsubscribe();
  // }

}
