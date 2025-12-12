import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailsComponent } from './pages/details/details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path : 'Details/:id', component: DetailsComponent}, // le :id sert à récupérer l'id de la partie du graphe sur laquelle l'utilisateur a cliqué
  { path: '**' /* ?Wildcard? */, component: NotFoundComponent }
];
  
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
