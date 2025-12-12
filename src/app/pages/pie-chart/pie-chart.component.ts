import { AfterViewInit, Component, ElementRef, 
  HostListener, NgZone, 
  OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { PieChartModule, Color, ScaleType, ChartCommonModule } from '@swimlane/ngx-charts'; //Ajout de NgxCharts pour les charts
import { Subject, takeUntil } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

//interface pour les données qu'on garde pour le graphique
export interface PieData {
  name: string;
  value: number;
}

//Typage d'un pays individuel
type OlympicCountry = {
  id: number;
  country: string;
  participations: Array<{
    id: number;
    year: number;
    city: string;
    medalsCount: number;
    athleteCount: number;
  }>;
};

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [PieChartModule, ChartCommonModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})

export class PieChartComponent implements OnInit, AfterViewInit, OnDestroy {
  
  //On initialise les doonées du graphique taille + data
  dataPie: PieData[] = [];
  view: [number, number] = [300, 300];

  //On configure les options qu'on souhaite utiliser pour le graphique
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme: Color = {
    domain: ['#956065', '#793d52', '#89a1db', '#9780a1', '#bfe0f1'],
    name: 'olympic',
    selectable: false,
    group: ScaleType.Ordinal
  };

  //Subject qui va gérer la destruction des observables
  private destroy$ = new Subject<void>();

  //On initialise sous forme de constante les données de configuration de la taille du graphique
  private readonly Max_Chart_Size = 600;
  private readonly Chart_Size_Ratio = 0.85;

  constructor(private olympicService: OlympicService, 
              private router: Router,
              private el: ElementRef,
              private zone: NgZone,
              private cdr: ChangeDetectorRef) {}

  //Ajout de pipe(takeUntil(destroy$)) pour limiter l'écoute de l'observable jusqu'à sa destruction 
  ngOnInit(): void {
    this.loadOlympicData();
  }

  ngAfterViewInit(): void {
    //délai pour attendre que le DOM soit complétement rendu
    setTimeout(() => {
      this.resizeChart();
    }, 0);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  //Méthode qui va charger les données de olympiques pour le graphique
  private loadOlympicData(): void {
    this.olympicService.getOlympics().pipe(takeUntil(this.destroy$))
    .subscribe(olympics => {
      if(olympics) {
        this.dataPie = this.transformToPieData(olympics as any[]);
        this.cdr.markForCheck();
      }
    });
  }

  //On transforme ici les données reçu en format PieData
  private transformToPieData(coutnries: OlympicCountry[]): PieData[] {
    return coutnries.map(country => ({
      name: country.country,
      value: country.participations.reduce(
        (total, participation) => total + participation.medalsCount, 0)
    }));
  }

  //Appel de la méthode resizeChart pour que le graphique s'adapte automatiquement à l'appareil de l'utilisateur
  @HostListener('window:resize')
  onResize(): void {
    this.resizeChart();
  }

  private resizeChart(): void {
    const containerWidth = this.el.nativeElement.parentElement?.offsetWidth || 300;
    const size = Math.min(containerWidth * this.Chart_Size_Ratio, this.Max_Chart_Size);
    this.view = [size, size];
    this.cdr.detectChanges();
  }  

  // Me permet de gérer ce qu'il se passe quand je clique (naviguer sur la page du pays correspondant au clic)
  onSelect(dataPie: PieData): void {
    this.router.navigate(['/Details',dataPie.name]);
  }
}


