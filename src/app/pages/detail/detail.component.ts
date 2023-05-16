// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Subscription, Observable, of } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';
// import { Olympic } from 'src/app/core/models/Olympic';
// import { OlympicService } from 'src/app/core/services/olympic.service';

// @Component({
//   selector: 'app-olympic-details',
//   templateUrl: './detail.component.html',
//   styleUrls: ['./detail.component.scss']
// })
// export class DetailComponent implements OnInit, OnDestroy {

//   public olympic$!: Observable<Olympic | null>;
//   public subscription: Subscription = new Subscription();
//   public errorMessage!: string;
//   public olympicData!: {name: string, series: {name: number, value: number}[] }[];
//   public dataParticipation!:{value: number, name: number}[];
//   // public olympicUpdated$ = new Observable<{name: string, series: { name: number, value: number }[] }[]>;




//   view: any = [700, 300];

//   // options
//   legend: boolean = true;
//   showLabels: boolean = true;
//   animations: boolean = true;
//   xAxis: boolean = true;
//   yAxis: boolean = true;
//   showYAxisLabel: boolean = true;
//   showXAxisLabel: boolean = true;
//   xAxisLabel: string = 'Year';
//   yAxisLabel: string = 'Medals';
//   timeline: boolean = true;

//   colorScheme: any = {
//     domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
//   };


//   constructor(private olympicService: OlympicService,
//               private route: ActivatedRoute) { Object.assign(this, this.olympicData)
//       }


//   ngOnInit() {
//     const id = +this.route.snapshot.params['id'];

//     this.olympic$ = this.olympicService.getOlympicById(id).pipe(
//       catchError((error) => {
//         this.errorMessage = error.message;
//         return of(null);
//       })
//     );

//     this.subscription = this.olympic$.subscribe((olympic) => {
//       if (olympic) {
//         this.olympicData = [];
//         this.dataParticipation = [];

//         olympic.participations.forEach((participation) => {
//           this.dataParticipation.push({
//             name: participation.year,
//             value: participation.medalsCount,
//           });
//         });

//         this.olympicData.push({
//           name: olympic.country,
//           series: this.dataParticipation,
//         });
//         // of(this.olympicData)
//       }
//     },
//     (value) => {this.olympicData = value});
//   }


//   ngOnDestroy(): void {
//     this.subscription.unsubscribe();
//   }

//   onSelect(data: any): void {
//     console.log('Item clicked', JSON.parse(JSON.stringify(data)));
//   }

//   onActivate(data: any): void {
//     console.log('Activate', JSON.parse(JSON.stringify(data)));
//   }

//   onDeactivate(data:any): void {
//     console.log('Deactivate', JSON.parse(JSON.stringify(data)));
//   }

// }







//   // this.olympic$ =
//     // this.olympicService.getOlympics();
//     // .pipe(
//     //     map((olympics: Olympic[]) => olympics.find(olympic => olympic.id == id)),
//     //     tap((value: any) => console.log(value))
//     //   )

//     // this.subscription.add(this.olympicService.getOlympics()
//     //   .pipe(
//         // dans la liste des Olympics, on va rechercher l'Olympic qui correspond à l'id
//       //   map((olympics: Olympic[]) => olympics.find(olympic => olympic.id == id)),
//       //   tap((value: any) => console.log(value))
//       // )
//       // on recoit qu'un seul olympic
//       // .subscribe(
//       //   (olympic: Olympic) => {
//       //   this.olympic = olympic;
//       //   console.log('olympic:', this.olympic)
//       // }
//       // ));

//   // ngOnDestroy(): void {
//   //    this.subscription.unsubscribe();
//   // }

//   //public backToDashbo:ard():void {
//     // this.router.navigate(['/'])

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable, of, Observer } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-olympic-details',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  public olympic$!: Observable<Olympic | null>;
  public subscription: Subscription = new Subscription();
  public errorMessage!: string;
  public olympicData!: {name: string, series: {name: number, value: number}[] }[];
  public dataParticipation!:{value: number, name: number}[];

  view: any = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Medals';
  timeline: boolean = true;

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };


  constructor(private olympicService: OlympicService, private route: ActivatedRoute) {
    Object.assign(this, this.olympicData)
  }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];

    this.olympic$ = this.olympicService.getOlympicById(id).pipe(
      catchError((error) => {
        this.errorMessage = error.message;
        return of(null);
      })
    );

    this.subscription = this.olympic$.subscribe({
      next: (olympic) => {
        if (olympic) {
          this.olympicData = [];
          this.dataParticipation = [];

          olympic.participations.forEach((participation) => {
            this.dataParticipation.push({
              name: participation.year,
              value: participation.medalsCount,
            });
          });

          this.olympicData.push({
            name: olympic.country,
            series: this.dataParticipation,
          });
        }
      },
      error: (error) => {
        this.olympicData = [];
        this.errorMessage = error.message;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
