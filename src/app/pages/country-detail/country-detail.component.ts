import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Olympics } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {

	// colorScheme: Color = {
	// 	name: 'myScheme',
	// 	selectable: true,
	// 	group: ScaleType.Ordinal,
	// 	domain: ['#f00', '#0f0', '#0ff'],
	//   };

	public numberOfMedals: number = 0
	public numberOfAthletes: number = 0
	public numberOfEntries: number = 0
	public numberOfMedalsPerYear: {"name": string,"series": [{"name": string,"value": number}]} | undefined

  	constructor(private route: ActivatedRoute, private olympicService: OlympicService) { }

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			const countryId = +params['id'];
			if (countryId) {
				this.olympicService.getCountryById(countryId).subscribe(country => {
						if (country) {
							console.log(country);
							this.numberOfEntries = country.participations.length
							this.numberOfMedals = this.calculateTotalMedals(country)
							this.numberOfAthletes = this.calculateTotalAthletes(country)
							this.numberOfMedalsPerYear = this.getMedalsByYear(country);
						} else {
							//TODO Si pas trouvé
						}
				});
			}

		})
	}

	calculateTotalMedals(country: Olympics): number {
		return country.participations.reduce((total, participation) => total + participation.medalsCount, 0);
	}
	calculateTotalAthletes(country: Olympics): number {
		return country.participations.reduce((total, participation) => total + participation.athleteCount, 0);
	}
	getMedalsByYear(country: Olympics): any { 
		return country.participations.map(participation => ({
			name: participation.city,
			series: [
			  {
				name: participation.year,
				value: participation.medalsCount,
			  },
			],
		  }));
	  }

}
