import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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
  public olympicData!: {name: string, series: {name: number, value: number}[]};

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

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) { }


  ngOnInit() {
    let olympicId: any = this.route.snapshot.paramMap.get('id');
    if (olympicId == !undefined) {
      this.subscription = this.olympicService.getOlympicById(+olympicId).pipe(
      catchError((error) => {
        console.error(error);
        return of(); // retourne un observable qui émet un tableau vide en cas d'erreur
      }),
      tap((value) => console.log(value)),
    ).subscribe((value) => {this.olympicData = value})
    }

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

// ngOnInit() {
  // if (dataLineChart$) {
  //    this.subscription = dataLineChart$.subscribe((olympic) => {
  //     if (olympic) {
  //       this.olympicData = [];
  //       this.dataParticipation = [];

  //       olympic.participations.forEach((participation) => {
  //         this.dataParticipation.push({
  //           name: participation.year,
  //           value: participation.medalsCount,
  //         });
  //       });

  //       this.olympicData.push({
  //         name: olympic.country,
  //         series: this.dataParticipation,
  //       });
  //       return this.olympicData;
  //     }



  // -----------------------------------------------------------------------------------------------
//   const id = +this.route.snapshot.params['id'];
//   const dataLineChart$ = this.olympicService.getOlympicById(id).pipe(
//       catchError((error) => {
//       this.errorMessage = error.message;
//       return of(null);
//     })
//   );
//   if (dataLineChart$) {
//      this.subscription = dataLineChart$.subscribe((olympic) => {
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
//         return this.olympicData;
//       }
//       },
//       (value) => {this.olympicData = value}
//     );
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

// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Subscription, Observable, of, Observer } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { Olympic } from 'src/app/core/models/Olympic';
// import { Participations } from 'src/app/core/models/Participation';
// import { OlympicService } from 'src/app/core/services/olympic.service';

// @Component({
//   selector: 'app-olympic-details',
//   templateUrl: './detail.component.html',
//   styleUrls: ['./detail.component.scss']
// })
// export class DetailComponent implements OnInit, OnDestroy {

//   public olympic$ = new Observable<{name: string, series: {name: number, value: number}[] }[]>;
//   // public olympic$!: Observable<Olympic | null>;
//   public subscription: Subscription = new Subscription();
//   public errorMessage!: string;
//   public olympicData!: {name: string, series: Participations[] }[];
//   public dataParticipation!:{name: number, value: number }[];
//   public participations!: Participations[];

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


//   constructor(private olympicService: OlympicService, private route: ActivatedRoute) {
//     Object.assign(this, this.olympicData)
//   }

//   ngOnInit() {
//     const id = +this.route.snapshot.params['id'];

//     this.subscription = this.olympicService.getOlympicById(id).pipe(
//       catchError((error) => {
//         console.error(error);
//         return of([]); // retourne un observable qui émet un tableau vide en cas d'erreur
//       }),
//     ).subscribe(
//       (olympic) => {
//         if (olympic) {
//           this.olympicData = [];
//           this.dataParticipation = [];

//           this.participations.forEach((participation) => {
//             this.dataParticipation.push({
//               name: participation.year,
//               value: participation.medalsCount,
//             });
//           });

//           this.olympicData.push({
//             name: olympic.country,
//             series: this.dataParticipation,
//           });
//         }
//         return of(this.olympicData);
//       })
//       //  error: (error) => {
//       //   this.olympicData = [];
//       //   this.errorMessage = error.message;
//       // (value) => {this.olympicData = value})
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
