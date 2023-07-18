import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  constructor(private olympicService: OlympicService) {}

  /* La méthode ngOnInit est une méthode de cycle de vie du composant AppComponent.
  Lorsque l'application est lancée, les données de OlympicService avec la méthode loadInitialData sont appelées 
  via l'abonnement de subscription permettant de chargée les données, qui sont ensuite ajoutées au tableau subrcription.
  */
  ngOnInit(): void {
    const subscription = this.olympicService.loadInitialData().pipe(take(1)).subscribe();
    this.subscriptions.push(subscription);
  }

/* La méthode ngOnDestroy est utilisée pour effectuer des tâches de nettoyage avant que le composant soit détruit 
comme annuler des abonnements à des observables.
On utilise le unsubscribe afin de libérer de la mémoire et éviter la consommation inutle du processeur.
*/
  ngOnDestroy(): void {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
  
}
