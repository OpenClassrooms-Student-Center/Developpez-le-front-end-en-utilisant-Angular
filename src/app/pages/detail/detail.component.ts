import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-olympic-details',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  public olympic$!: Observable<Olympic>;
  public subscription: Subscription = new Subscription();
  public errorMessage!: string;

  constructor(private olympicService: OlympicService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.subscription = this.olympicService.getOlympicById(id)
      .pipe(
        catchError(error => {
          this.errorMessage = error.message;
          return of(error);
        })
      )
      .subscribe(olympic => {
        if (olympic) {
          this.olympic$ = of(olympic);
          console.log('olympic:', this.olympic$)
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}




  // this.olympic$ =
    // this.olympicService.getOlympics();
    // .pipe(
    //     map((olympics: Olympic[]) => olympics.find(olympic => olympic.id == id)),
    //     tap((value: any) => console.log(value))
    //   )

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

  // ngOnDestroy(): void {
  //    this.subscription.unsubscribe();
  // }

  //public backToDashbo:ard():void {
    // this.router.navigate(['/'])
