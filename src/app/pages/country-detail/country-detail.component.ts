import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MedalsPerYear } from 'src/app/core/models/MedalsPerYear';
import { Olympics } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})

export class CountryDetailComponent implements OnInit, OnDestroy {
	public countryName: string = ""
	public numberOfMedals: number = 0
	public numberOfAthletes: number = 0
	public numberOfEntries: number = 0
	public numberOfMedalsPerYear!: MedalsPerYear[]
	public message: string = "Données en cours de chargement"
	public messageVisible: boolean = true
	private ngUnsubscribe = new Subject<void>();
	
  	constructor(private route: ActivatedRoute,private router: Router,  private olympicService: OlympicService) { }

	ngOnInit(): void {
		this.route.params.pipe(
		  takeUntil(this.ngUnsubscribe) //takeuntil s'assure que l'abonnement est annulé quand le subject emet une valeur à la destruction du composant
		).subscribe({
		  next: (params) => {
			const countryId = +params['id'];
			  this.olympicService.getCountryById(countryId)
				.pipe(takeUntil(this.ngUnsubscribe))
				.subscribe({
				  next: (country) => {
					if (country) {
					  this.countryName = country.country ?? '';
					  this.numberOfEntries = country.participations?.length ?? 0;
					  this.numberOfMedals = this.calculateTotalMedals(country);
					  this.numberOfAthletes = this.calculateTotalAthletes(country);
					  this.numberOfMedalsPerYear = [
						{
						  "name": country.country ?? '',
						  "series": this.calculateMedalsByYear(country)
						}
					  ];
					  this.messageVisible = false
					} else {
					  	let errMsg = 'Le pays n\'a pas été trouvé.';
						this.errorFct(errMsg)
					}
				  },
				  error: (error) => this.errorFct(error)
				});
		  },
		  error: (error) => this.errorFct(error)
		});
	}
	ngOnDestroy(): void {
		this.ngUnsubscribe.next(); // Émettre pour désinscrire les observables
		this.ngUnsubscribe.complete(); // Terminer le sujet pour la désinscription complète
	}
	
	calculateTotalMedals(country: Olympics): number {
		return country.participations?.reduce((total, participation) => total + (participation.medalsCount ?? 0), 0) ?? 0;
	}
	calculateTotalAthletes(country: Olympics): number {
		return country.participations?.reduce((total, participation) => total + (participation.athleteCount ?? 0), 0) ?? 0;
	}
	calculateMedalsByYear(country: Olympics): { name: string; value: number }[] { 
		return country.participations?.map(participation => ({
		  name: participation.year?.toString() ?? '',
		  value: participation.medalsCount || 0,
		})) || [];
	  }
	goBack(): void {
		this.router.navigateByUrl('/');
	}
	errorFct(errMsg: any){
		this.message = errMsg;
		this.messageVisible = true
	}
}
